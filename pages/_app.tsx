import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { SWRConfig } from 'swr';
import axiosClient from '@/services/axios';
import AppLayout from '@/components/layout/app-layout';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App({ Component, pageProps }: AppProps) {
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
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </div>
      </SWRConfig>
    </GoogleOAuthProvider>
  );
}
