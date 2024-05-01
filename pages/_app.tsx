import type { AppProps } from 'next/app';
import type { Page } from '@/types/page';
import '@/styles/globals.css';
import { SWRConfig } from 'swr';
import axiosClient from '@/services/axios';
import AppLayout from '@/components/layout/app-layout';
import { GoogleOAuthProvider } from '@react-oauth/google';

type Props = AppProps & {
  Component: Page;
};

export default function App({ Component, pageProps }: Props) {
  const renderWithLayout = Component.getLayout || ((page: React.ReactNode) => <AppLayout>{page}</AppLayout>);

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID as string}>
      <SWRConfig
        value={{
          fetcher: (url) => axiosClient.get(url),
          revalidateOnFocus: false,
          shouldRetryOnError: false,
        }}
      >
        <div className="w-full h-screen min-h-screen flex flex-col">
          {renderWithLayout(<Component {...pageProps} />)}
        </div>
      </SWRConfig>
    </GoogleOAuthProvider>
  );
}
