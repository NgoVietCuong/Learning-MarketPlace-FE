import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { SWRConfig } from 'swr';
import axiosClient from '@/services/axios';
import AppLayout from '@/components/layout/app-layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => axiosClient.get(url),
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      <div className="w-full h-screen min-h-screen flex flex-col">
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </div>
    </SWRConfig>
  );
}
