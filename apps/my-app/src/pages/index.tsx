import { GetStaticProps } from 'next';
import { ReactElement } from 'react';
import { DefaultLayout } from '../components/DefaultLayout';

export function Index() {
  return <>hello</>;
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale || 'en';

  return {
    props: {
      i18n: {
        locale,
        messages: (await import(`../locales/${locale}.json`)).default,
      },
    },
  };
};

export default Index;
