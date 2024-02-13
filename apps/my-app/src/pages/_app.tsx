import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { NextIntlClientProvider } from 'next-intl';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <NextIntlClientProvider
      locale={pageProps.i18n.locale || 'en'}
      timeZone="Australia/Melbourne"
      messages={pageProps.i18n.messages}
    >
      <Head>
        <title>Welcome to my-app!</title>
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </NextIntlClientProvider>
  );
}

export default CustomApp;
