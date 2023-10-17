import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useMatches,
  useRouteError,
} from '@remix-run/react';

import sharedStyles from '~/styles/shared.css';
import Error from './components/util/Error';
import i18next from '~/i18next.server';
import { useTranslation } from 'react-i18next';
import { useChangeLanguage } from 'remix-i18next';
import { json } from "@remix-run/node";
import { t } from 'i18next';

export let loader = async ({ request }) => {
  let locale = await i18next.getLocale(request);
  return json({ locale });
};

export let handle = {
  i18n: "common",
};

function Document({ title, children }) {
  const matches = useMatches();
  const disabledJS = matches.some(match => match.handle?.disabledJS);
  return (
    <>
      <head>
        {title && <title>{title}</title>}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        {!disabledJS && <Scripts />}
        <LiveReload />
      </body>
    </>
  );
}


export default function App() {
  let { locale } = useLoaderData();
  let { i18n } = useTranslation();
  useChangeLanguage(locale);
  return (
    <html lang={locale} dir={i18n.dir()}>
      <Document>
        <Outlet />
      </Document>

    </html>

  );
}

export function CatchBoundary() {
  let { t } = useTranslation();
  const caughtResponse = useRouteError();
  return <Document title={caughtResponse.statusText}>
    <main>
      <Error title={caughtResponse.statusText}>
        <p>{caughtResponse.data?.message || 'Something went wrong. Please try again later'} </p>
        <p>Back to <Link to="/"> Safety</Link></p>
      </Error>
    </main>
  </Document>

}

export function ErrorBoundary({ error }) {

  return <Document title="An error occured">
    <main>
      <Error title="An error occured">
        <p>{error.message || 'Something went wrong. Please try again later'}</p>
        <p>Back to <Link to="/"> Safety</Link></p>
      </Error>
    </main>
  </Document>
}
export function links() {
  return [{ rel: 'stylesheet', href: sharedStyles }];
}
