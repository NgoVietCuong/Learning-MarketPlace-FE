import "@/styles/globals.css";
import AppLayout from "@/components/layout/app-layout";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="w-full h-screen min-h-screen flex flex-col">
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </div>
  );
}
