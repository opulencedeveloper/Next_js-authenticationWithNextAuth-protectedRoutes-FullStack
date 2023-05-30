import UserProfile from "@/components/profile/user-profile";
//import { authOptions } from "./api/auth/[...nextauth]";

//package used to get the session in the server
import { getSession } from "next-auth/react";
//import { getServerSession } from "next-auth/next"

function ProfilePage() {
  return <UserProfile />;
}

//we are using this for auth status, since this status is checked
//for every incoming request
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      //notFound: true, //to show the 404 page
      redirect: {
        destination: "/auth",
        permanent: false, //indicates if this a permenant redirect,
        //This means that the redirect will only be in effect for the
        //current request, and subsequent requests to this page wont't will not be affected.
        //The original URL will still be accessible, and search engines will
        //continue to index it.
      },
    };
  }

  console.log("session-NotAvaialble");
  return {
    props: {
      session,
    },
  };
}

export default ProfilePage;
