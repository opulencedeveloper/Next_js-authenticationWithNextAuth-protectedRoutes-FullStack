import Layout from "@/components/layout/layout";
import { SessionProvider } from "next-auth/react" 
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}><Layout>
      <Component {...pageProps} />
    </Layout> </SessionProvider>
  );
}
