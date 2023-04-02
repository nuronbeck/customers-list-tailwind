import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

export type CustomNextPage = NextPage & {
  layout?: 'Main' | 'Empty';
};

export interface CustomAppProps extends AppProps {
  Component: CustomNextPage;
}
