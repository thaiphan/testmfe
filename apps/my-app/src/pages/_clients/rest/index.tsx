import { GetStaticProps } from 'next';
import { ReactElement } from 'react';
import { CustomLayout } from '../../..//components/CustomLayout';

export function Index() {
  return <>rest hello</>;
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <CustomLayout>{page}</CustomLayout>;
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
