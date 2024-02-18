import Link, { LinkProps } from 'next/link';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const CustomLayout = (props: React.PropsWithChildren) => {
  const t = useTranslations();

  return (
    <div
      className={`${inter.variable} font-sans grid grid-rows-[80px_1fr] min-h-full`}
    >
      <header className="bg-gray-800 py-2">
        <MenuItems>
          <MenuItem href="/">{t('dashboard')}</MenuItem>
          <MenuItem href="/pay">{t('pay')}</MenuItem>
          <MenuItem href="/workers">{t('workers')}</MenuItem>
          <MenuItem href="/reports">{t('reports')}</MenuItem>
          <MenuItem href="/settings">{t('settings')}</MenuItem>
        </MenuItems>
      </header>
      <main>{props.children}</main>
    </div>
  );
};

const MenuItems = (props: React.PropsWithChildren) => {
  return <ul className="flex flex-row gap-x-2">{props.children}</ul>;
};

export type MenuItemProps = Pick<LinkProps, 'href'>;

const MenuItem = (props: React.PropsWithChildren<MenuItemProps>) => {
  const { asPath, isReady } = useRouter();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isReady) {
      setIsActive(asPath === props.href);
    }
  }, [asPath, isReady, props.href]);

  return (
    <li>
      <Link
        href={props.href}
        className={`${
          isActive ? 'bg-gray-900' : ''
        } text-gray-300 text-xs h-[60px] w-[68px] flex rounded items-center justify-center font-semibold hover:bg-gray-900`}
      >
        {props.children}
      </Link>
    </li>
  );
};
