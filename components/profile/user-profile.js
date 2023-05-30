//import { useSession } from "next-auth/react";

import { headers } from "@/next.config";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  //useSession() rebuild this component anytime, session or loadind changes

  //const { data: session, status: loading } = useSession();
  // if (loading === "loading") {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  // if (loading === "unauthenticated") {
  //   window.location.href = "/auth";
  //   return <p className={classes.profile}>Loading...</p>;

  // }

  async function changePasswordHandler(passwordData) {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
