import Head from 'next/head';
import Link from 'next/link';
import type { CustomNextPage } from 'types/page';

const NotFound: CustomNextPage = () => {
  return (
    <>
      <Head>
        <title>404 | Resource not found</title>
      </Head>

      <section className="min-h-screen flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
              <span className="sr-only">Error</span>404
            </h2>

            <p className="text-2xl font-semibold md:text-3xl">
              Sorry, we could not find this page.
            </p>

            <p className="mt-4 mb-8 dark:text-gray-400">
              But dont worry, you can find plenty of other things on our homepage.
            </p>

            <div className="flex justify-center">
              <Link href="/" replace>
                <a className="btn btn-primary">Back to homepage</a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
