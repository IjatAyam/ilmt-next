import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { serverConfig } from '../../config';
import { toast } from 'react-hot-toast';
import { AppBar, Button, Container, Grid, TextField, Typography } from '@mui/material';
import Head from 'next/head';

interface Sentence {
  id: number;
  sentence: string;
}

const TranslationRandomCreatePage: NextPage = () => {
  const [sentence, setSentence] = useState<Sentence>();
  const [translated, setTranslated] = useState('');

  useEffect(() => {
    const fetchRadonSentence = async () => {
      try {
        const { data } = await axios.get(`${serverConfig.endpoint}translate/sentence/random/`);
        setSentence(data);
      } catch (err) {
        toast.error('Something went wrong! Please ask admin.');
      }
    };

    fetchRadonSentence();
  }, []);

  const reloadSentence = async () => {
    try {
      const { data } = await axios.get(`${serverConfig.endpoint}translate/sentence/random/`);
      setSentence(data);
    } catch (err) {
      toast.error('Something went wrong! Please ask admin.');
    }
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(`${serverConfig.endpoint}translate/translation/create/`, {
        sentence: sentence?.id,
        translated,
      });

      if (data.id) {
        toast.success('Translation submitted!');
        setTranslated('');
        reloadSentence();
      } else {
        toast.error('Something went wrong! Please try again.');
      }
    } catch (err: any) {
      const isExist = err.response.data[0].includes('already exists');
      if (isExist) {
        toast.error('Translated already exists! Enter another or refresh page.');
      } else {
        toast.error('Something went wrong! Please ask admin.');
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ height: '100vh', paddingX: '0 !important', border: 'black 1px solid' }}>
      <Head>
        <title>IIUM Tarjamah (Translate Feed)</title>
      </Head>
      <AppBar position="static">
        <Typography variant="h2" component="h1" align="center">
          IIUM Tarjamah (Translate Feed)
        </Typography>
      </AppBar>
      <Grid container justifyContent="center" px={6}>
        <Grid item container mt={20} mb={4} spacing={6}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Sentence to translate (Arabic)"
              value={sentence?.sentence || 'waiting...'}
              rows={4}
              disabled
              fullWidth
              multiline
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Translated sentence (Malay)"
              value={translated}
              onChange={event => setTranslated(event.target.value)}
              rows={4}
              fullWidth
              multiline
            />
          </Grid>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleSubmit}>
            Submit translation
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TranslationRandomCreatePage;
