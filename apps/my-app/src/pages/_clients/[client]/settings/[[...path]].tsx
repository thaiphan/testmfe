import { GetStaticPaths, GetStaticProps } from 'next';
import {
  ComponentType,
  ReactElement,
  lazy,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { DefaultLayout } from '../../../../components/DefaultLayout';

export function SettingsPages(props: { i18n: { locale?: string } }) {
  const [Component, setComponent] = useState<
    null | undefined | ComponentType<{ basename?: string }>
  >(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // @ts-expect-error importing remote module
      setComponent(lazy(() => import('settings/App')));
    }
  }, []);

  const basename = useMemo(() => {
    if (typeof window !== 'undefined') {
      if (
        window.location.pathname.split('/').at(1)?.toLocaleLowerCase() ===
        props.i18n.locale?.toLocaleLowerCase()
      ) {
        return props.i18n.locale;
      }
    }
    return undefined;
  }, [props.i18n.locale]);

  return <>{Component ? <Component basename={basename} /> : null}</>;
}

SettingsPages.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  console.log(context);
  const locale = context.locale;

  return {
    props: {
      i18n: {
        locale,
        messages: (await import(`../../../../locales/${locale}.json`)).default,
      },
    },
  };
};

export default SettingsPages;
