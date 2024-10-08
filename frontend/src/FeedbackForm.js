import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from "@mui/material/Grid2";
import TextField from '@mui/material/TextField';
import * as React from 'react';

export default function FeedbackForm() {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom>
          Tell us what you think
        </Typography>
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              required
              id="outlined-required"
              label="Name"
              fullWidth
            />
          </Grid>
          <Grid size={6}>
            <TextField
              required
              id="outlined-required"
              label="Email"
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <TextField
              id="outlined-multiline-flexible"
              label="Feedback"
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
        <Button variant="contained">Submit</Button>
      </CardActions>
    </Card>
  );
}
