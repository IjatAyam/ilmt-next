import { NextPage } from 'next';
import { useState } from 'react';
import { serverConfig } from '../../config';
import axios from 'axios';
import { AppBar, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { toast } from 'react-hot-toast';
import Head from 'next/head';

const SentenceCreatePage: NextPage = () => {
  const [sentence, setSentence] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(`${serverConfig.endpoint}translate/sentence/create/`, {
        sentence,
      });

      if (data.id) {
        toast.success('Sentence created!');
        setSentence('');
      } else {
        toast.error('Something went wrong! Please try again.');
      }
    } catch (err: any) {
      const isExist = err.response.data.sentence[0].includes('already exists');
      if (isExist) {
        toast.error('Sentence already exists! Enter another.');
      } else {
        toast.error('Something went wrong! Please ask admin.');
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ height: '100vh', paddingX: '0 !important', border: 'black 1px solid' }}>
      <Head>
        <title>IIUM Tarjamah (Admin)</title>
      </Head>
      <AppBar position="static">
        <Typography variant="h2" component="h1" align="center">
          IIUM Tarjamah (Admin)
        </Typography>
      </AppBar>
      <Grid container justifyContent="center" px={6}>
        {password !== 'tarjamah4321' && (
          <Grid item container mt={20} mb={4} spacing={6}>
            <Grid item xs={12}>
              <TextField
                label="Admin Password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                fullWidth
                type="password"
              />
            </Grid>
          </Grid>
        )}
        {password === 'tarjamah4321' && (
          <>
            <Grid item container mt={20} mb={4} spacing={6}>
              <Grid item xs={12}>
                <TextField
                  label="Enter sentence here (Arabic)"
                  value={sentence}
                  onChange={event => setSentence(event.target.value)}
                  rows={4}
                  fullWidth
                  multiline
                />
              </Grid>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleSubmit}>
                Create sentence
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default SentenceCreatePage;
