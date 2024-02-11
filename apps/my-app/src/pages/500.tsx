import { GetStaticProps } from 'next';

export function Index() {
  return <>500</>;
}

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
