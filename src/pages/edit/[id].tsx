import EditCustomerForm from 'components/Forms/EditCustomerForm';
import Head from 'next/head';
import { useRouter } from 'next/router';

import type { CustomNextPage } from 'types/page';

const Edit: CustomNextPage = () => {
  const router = useRouter();
  const id = Number(router.query.id);

  return (
    <>
      <Head>
        <title>Dashboard | Edit</title>
      </Head>

      {router.isReady && !!id && (
        <EditCustomerForm id={id} onEditSuccess={() => router.replace('/')} />
      )}
    </>
  );
};

Edit.layout = 'Main';

export default Edit;
