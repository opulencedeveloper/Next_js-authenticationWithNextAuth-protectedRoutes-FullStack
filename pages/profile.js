import UserProfile from "@/components/profile/user-profile";

import { getSession } from "next-auth/react";
//import { getServerSession } from "next-auth/next"

function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      //notFound: true, 
      redirect: {
        destination: "/auth",
        permanent: false, 
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
