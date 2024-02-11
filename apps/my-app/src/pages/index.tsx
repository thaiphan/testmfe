import { GetStaticProps } from 'next';

export function Index() {
  return <>hello</>;
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
