import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import classes from "./main-navigation.module.css";

function MainNavigation() {
  //Anytime we login or signup
  //next-auth gets and stores the token(cookies) it generated to the browser by itself
  //and uses that token on every request we make or when we navigate

  //useSession()is hook for next-auth used to identify the authentication status of the user
  //this session will be pro-longed automatically if the session expires and the user is active
  //useSession rebuild this component of "status" or 'session' changes
  const { data: session, status } = useSession();

  console.log("session");
  console.log(session);
  console.log("status");
  console.log(status);

  function logoutHandler() {
    //calling signOut will clear the cookie, which is in useSession
    //useSession will now cause the component to rebuild
    signOut();
  }

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session && status === 'unauthenticated' &&   (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
