import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';

const Login = () => {
  const t = useTranslations();

  const handleContinue = () => {};

  return (
    <div className="bg-gray-300 min-h-full flex justify-center items-center">
      <div className="flex flex-col items-center">
        <h1 className="my-8 text-3xl">{t('login')}</h1>
        <div className="bg-white min-w-[506px] p-12 flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <label>Email</label>
            <input
              type="email"
              className="rounded border border-gray-300 h-12 px-2"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label>Password</label>
            <input
              type="password"
              className="rounded border border-gray-300 h-12 px-2"
            />
          </div>
          <button className="bg-black h-12 text-white" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
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

export default Login;
