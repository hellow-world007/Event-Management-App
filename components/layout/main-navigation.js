import Link from "next/link";
import classes from "./main-navigation.module.css";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

function MainNavigation() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const user = session && session.user.name.slice(0, 1).toUpperCase();
  const router = useRouter();

  function logoutHandler() {
    signOut();
  }

  const imagePath = "/images/logo.svg";

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>
          <Image src={imagePath} alt="Logo image" width={100} height={100} priority />
        </div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link
              className={`${router.pathname == "/" ? classes.active : ""}`}
              href="/"
              scroll={false}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              className={`${
                router.pathname == "/create-event" ? classes.active : ""
              }`}
              href="/create-event"
              scroll={false}
            >
              Create Event
            </Link>
          </li>
        
          <li>
            <Link
              className={`${
                router.pathname == "/profile" ? classes.active : ""
              }`}
              href="/profile"
              scroll={false}
            >
              My Profile
            </Link>
          </li>
          
          {!session && !loading && (
            <li>
              <Link
                className={`${
                  router.pathname == "/auth" ? classes.active : ""
                }`}
                href="/auth"
                scroll={false}
              >
                Login
              </Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
          {session && (
            <li>
              <Link href="/edit-profile" scroll={false}>
                <p>{user && user}</p>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
