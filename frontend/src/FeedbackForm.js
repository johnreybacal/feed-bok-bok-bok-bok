import { Typography } from '@mui/material';
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

export default function FeedbackForm() {
  const [form, setForm] = React.useState({
    ...EMPTY_FORM
  })
  const [errors, setErrors] = React.useState({
    ...EMPTY_FORM
  })
  const { enqueueSnackbar } = useSnackbar();

  function submitForm() {
    let validationErrors = {
      ...EMPTY_FORM
    }
    setErrors(validationErrors)
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
      });
  }

  return (
    <Grid container spacing={2} paddingTop={5}>
      <Grid>
        <Typography variant="h1" color='white' paddingBottom={5}>
          Tell us what you think
        </Typography>
      </Grid>
      <Grid>
        <Card>
          <CardContent style={{ paddingTop: 30 }}>
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
