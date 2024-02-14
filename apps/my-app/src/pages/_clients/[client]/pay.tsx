import { GetStaticPaths, GetStaticProps } from 'next';
import { ReactElement } from 'react';
import { DefaultLayout } from '../../../components/DefaultLayout';

export function Index() {
  return <>pay</>;
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale || 'en';

  return {
    props: {
      i18n: {
        locale,
        messages: (await import(`../../../locales/${locale}.json`)).default,
      },
    },
  };
};

export default Index;
