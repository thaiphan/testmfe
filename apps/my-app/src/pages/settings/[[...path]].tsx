import { GetStaticPaths, GetStaticProps } from 'next';
import { ComponentType, lazy, useEffect, useState } from 'react';

export function SettingsPages() {
  const [Component, setComponent] = useState<null | undefined | ComponentType>(
    null
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // @ts-expect-error importing remote module
      setComponent(lazy(() => import('settings/App')));
    }
  }, []);

  return <>{Component ? <Component /> : null}</>;
}

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
        messages: (await import(`../../locales/${locale}.json`)).default,
      },
    },
  };
};

export default SettingsPages;
