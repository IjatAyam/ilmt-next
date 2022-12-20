import type { NextPage } from 'next';
import { AppBar, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { serverConfig } from '../config';
import Head from 'next/head';

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
    <Container maxWidth="md" sx={{ height: '100vh', paddingX: '0 !important', border: 'black 1px solid' }}>
      <Head>
        <title>IIUM Tarjamah</title>
      </Head>
      <AppBar position="static">
        <Typography variant="h2" component="h1" align="center">
          IIUM Tarjamah
        </Typography>
      </AppBar>
      <Grid container justifyContent="center" px={6}>
        <Grid item container mt={20} mb={4} spacing={6}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Original"
              value={original}
              onChange={event => setOriginal(event.target.value)}
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
