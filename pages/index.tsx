import type { NextPage } from 'next';
import { Button, Container, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { serverConfig } from '../config';

const HomePage: NextPage = () => {
  const [original, setOriginal] = useState('');
  const [translated, setTranslated] = useState('');

  const handleTranslate = async () => {
    try {
      const { data } = await axios.post(`${serverConfig.endpoint}translate/`, {
        text: original,
      });

      setTranslated(data.translated);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container justifyContent="center">
        <Grid item container mt={20} mb={4} spacing={6}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Original"
              value={original}
              onChange={(event) => setOriginal(event.target.value)}
              rows={4}
              fullWidth
              multiline
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              value={translated}
              label="Translated"
              rows={4}
              fullWidth
              multiline
              inputProps={{
                style: {
                  textAlign: 'right',
                },
              }}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleTranslate}>
            Translate
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
