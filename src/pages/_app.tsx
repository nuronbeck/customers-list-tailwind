import App from 'next/app';
import MainLayout from 'layouts/MainLayout';
import EmptyLayout from 'layouts/EmptyLayout';

import type { AppContext } from 'next/app';
import type { CustomAppProps } from 'types/page';

import 'styles/globals.scss';
import { CustomersProvider } from 'context/CustomersContext';

const TestTaskApp = ({ Component, pageProps: { ...pageProps } }: CustomAppProps) => {
  let Layout = null;

  switch (Component.layout) {
    case 'Main':
      Layout = MainLayout;
      break;

    default:
      Layout = EmptyLayout;
      break;
  }

  return (
    <CustomersProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CustomersProvider>
  );
};

TestTaskApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default TestTaskApp;
