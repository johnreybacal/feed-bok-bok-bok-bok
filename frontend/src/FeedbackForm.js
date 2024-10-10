import { Backdrop, CircularProgress, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from "@mui/material/Grid2";
import TextField from '@mui/material/TextField';
import axios from "axios";
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { API } from "./config";

const EMPTY_FORM = {
  name: "",
  email: "",
  feedback: ""
}
const CLIENT_VALIDATION = true;

// https://stackoverflow.com/a/46181
function isValidEmail(value) {
  return String(value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export default function FeedbackForm() {
  const [form, setForm] = React.useState({
    ...EMPTY_FORM
  })
  const [errors, setErrors] = React.useState({
    ...EMPTY_FORM
  })
  const [isLoading, setIsLoading] = React.useState(false)
  const { enqueueSnackbar } = useSnackbar();

  function submitForm() {
    let validationErrors = {
      ...EMPTY_FORM
    }
    setErrors(validationErrors)

    if (CLIENT_VALIDATION) {
      if (!validate(form)) {
        return
      }
    }
    setIsLoading(true)
    axios.post(`${API}/feedbacks/submit`, {
      name: form.name,
      email: form.email,
      feedback: form.feedback
    })
      .then(function (response) {
        if (response.status === 200) {
          setForm({
            ...EMPTY_FORM
          })
          enqueueSnackbar('Feedback submitted!', { variant: "success" });
        }
      })
      .catch(function (error) {
        const { response } = error
        if (response && response.status === 400) {
          response.data.forEach((message) => {
            const field = message.split(" ")[0]
            console.log(field, message)
            validationErrors = {
              ...validationErrors,
              [field]: message
            }
          })
          enqueueSnackbar('Please correct validation errors.', { variant: "warning" });
          setErrors(validationErrors)
        } else {
          enqueueSnackbar('Oops. Something went wrong.', { variant: "error" });
        }
      }).finally(() => {
        setIsLoading(false);
      });
  }

  function validate() {
    const validationErrors = {};
    let isValid = true
    if (String(form.name).trim().length === 0) {
      validationErrors.name = "name is a required field"
      isValid = false;
    }
    if (String(form.email).trim().length === 0) {
      validationErrors.email = "email is a required field"
      isValid = false;
    } else if (!isValidEmail(form.email)) {
      validationErrors.email = "email is not valid"
      isValid = false;
    }
    if (String(form.feedback).trim().length === 0) {
      validationErrors.feedback = "feedback is a required field"
      isValid = false;
    }
    if (!isValid) {
      setErrors(validationErrors)
      enqueueSnackbar('Please correct validation errors.', { variant: "warning" });
    }

    return isValid
  }

  return (
    <Grid container spacing={2} paddingTop={5} paddingBottom={5}>
      <Grid>
        <Typography variant="h1" color='white' paddingBottom={5}>
          Tell us what you think.
        </Typography>
      </Grid>
      <Grid>
        <Card>
          <CardContent style={{ paddingTop: 30 }}>
            <Backdrop
              sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
              open={isLoading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  required
                  label="Name"
                  value={form.name}
                  onChange={e => {
                    setForm({
                      ...form,
                      name: e.target.value
                    });
                  }}
                  placeholder='Your name'
                  error={errors.name}
                  helperText={errors.name}
                  disabled={isLoading}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  required
                  label="Email"
                  value={form.email}
                  onChange={e => {
                    setForm({
                      ...form,
                      email: e.target.value
                    });
                  }}
                  placeholder='Your email'
                  error={errors.email}
                  helperText={errors.email}
                  disabled={isLoading}
                  fullWidth
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  required
                  label="Feedback"
                  value={form.feedback}
                  onChange={e => {
                    setForm({
                      ...form,
                      feedback: e.target.value
                    });
                  }}
                  placeholder='What do you think?'
                  error={errors.feedback}
                  helperText={errors.feedback}
                  disabled={isLoading}
                  fullWidth
                  multiline
                  minRows={3}
                  maxRows={5}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions disableSpacing
            sx={{
              justifyContent: "end",
              alignItems: "start",
              padding: 2
            }}
          >
            <Button variant="contained" onClick={submitForm}>Submit</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
