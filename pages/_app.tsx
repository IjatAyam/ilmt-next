import type { FC } from 'react';
import { useEffect } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { Toaster } from 'react-hot-toast';
import nProgress from 'nprogress';
import { CacheProvider } from '@emotion/react';
import type { EmotionCache } from '@emotion/cache';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { gtmConfig } from '../config';
import { gtm } from '../lib/gtm';
import { createTheme } from '../theme';
import { createEmotionCache } from '../utils/create-emotion-cache';
import '../i18n';

type EnhancedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

const clientSideEmotionCache = createEmotionCache();

const App: FC<EnhancedAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useEffect(() => {
    gtm.initialize(gtmConfig);
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Material Kit Pro</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider
          theme={createTheme({
            direction: 'ltr',
            responsiveFontSizes: true,
            mode: 'light',
          })}
        >
          <CssBaseline />
          <Toaster position="top-center" />
          <Component {...pageProps} />
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
