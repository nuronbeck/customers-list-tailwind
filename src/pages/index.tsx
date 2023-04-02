import AddCustomerForm from 'components/Forms/AddCustomerForm';
import Head from 'next/head';

import type { CustomNextPage } from 'types/page';

const Home: CustomNextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <AddCustomerForm />
    </>
  );
};

Home.layout = 'Main';

export default Home;
