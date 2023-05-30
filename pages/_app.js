import Layout from "@/components/layout/layout";
import { SessionProvider } from "next-auth/react" 
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    //since we are using the useSession hook(from the next-auth package) in the
    //Layout Componet to access the authentication state, we wrapped it with
    // SessionProvider to give acess to the authentication details
    //session is the session passed from the server to the componet from
    //getServerSideProps

    //this session is only available on pages to uses getSeverSideProps tp return this session
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}><Layout>
      <Component {...pageProps} />
    </Layout> </SessionProvider>
  );
}
