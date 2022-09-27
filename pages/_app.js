// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import { I18NPPROVIDER, useI18N } from "context/i18n";
import Head from "next/head";
import "../styles/globals.css";

const DefaultHeadApp = () => {
  const { t } = useI18N();
  return (
    <Head>
      <title>{t('SEO_DEFAULT_TITLE')}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    // 2. Use at the root of your app
    <I18NPPROVIDER>
      <NextUIProvider>
        <DefaultHeadApp />
        <Component {...pageProps} />
      </NextUIProvider>
    </I18NPPROVIDER>
  );
}

export default MyApp;
