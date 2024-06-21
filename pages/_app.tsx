import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import type { Page } from '@/types/page';
import '@/styles/globals.css';
import 'react-quill/dist/quill.snow.css';
import { SWRConfig } from 'swr';
import { axiosClient } from '@/services/axios';
import AppLayout from '@/components/layout/app-layout';
import { Toaster } from '@/components/ui/toaster';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import TopLoadingBar, { LoadingBarRef } from 'react-top-loading-bar';

type Props = AppProps & {
  Component: Page;
};

export default function App({ Component, pageProps }: Props) {
  const ref = useRef<LoadingBarRef>(null);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      if (ref.current) {
        ref.current.continuousStart();
      }
    };

    const handleRouteChangeComplete = () => {
      if (ref.current) {
        ref.current.complete();
      }
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeComplete);
    };
  }, [router.events]);

  const renderWithLayout =
    Component.getLayout || ((page: React.ReactNode, pageProps: any) => <AppLayout {...pageProps}>{page}</AppLayout>);

  return (
    <PayPalScriptProvider options={{ 'clientId': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string }}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID as string}>
        <SWRConfig
          value={{
            fetcher: (url: string) => axiosClient.get(url),
            revalidateOnFocus: false,
            shouldRetryOnError: false,
          }}
        >
          <div className="w-full h-screen min-h-screen flex flex-col">
            <TopLoadingBar color="#00cbb8" ref={ref} height={2} transitionTime={200} loaderSpeed={300} />
            {renderWithLayout(<Component {...pageProps} />, pageProps)}
            <Toaster />
          </div>
        </SWRConfig>
      </GoogleOAuthProvider>
    </PayPalScriptProvider>
  );
}
