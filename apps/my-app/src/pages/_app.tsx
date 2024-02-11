import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { DefaultLayout } from '../components/DefaultLayout';
import { NextIntlClientProvider } from 'next-intl';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <NextIntlClientProvider
      locale={pageProps.i18n.locale}
      messages={pageProps.i18n.messages}
    >
      <Head>
        <title>Welcome to my-app!</title>
      </Head>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </NextIntlClientProvider>
  );
}

export default CustomApp;
