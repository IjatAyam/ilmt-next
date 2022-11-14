import { NextPage } from 'next';
import { useState } from 'react';
import { serverConfig } from '../../config';
import axios from 'axios';
import { Button, Container, Grid, TextField } from '@mui/material';
import { toast } from 'react-hot-toast';

const SentenceCreatePage: NextPage = () => {
  const [sentence, setSentence] = useState('');

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
    <Container maxWidth="lg">
      <Grid container justifyContent="center">
        <Grid item container mt={20} mb={4} spacing={6}>
          <Grid item xs={12}>
            <TextField
              label="Enter sentence here (Arabic)"
              value={sentence}
              onChange={(event) => setSentence(event.target.value)}
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
      </Grid>
    </Container>
  );
};

export default SentenceCreatePage;
