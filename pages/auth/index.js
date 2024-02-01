import AuthForm from "@/components/auth/auth-form";
import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

function AuthenticationPage() {

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/edit-profile");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <Head>
        <title>Login or Signup</title>
        <meta
          name="description"
          content="Login or Signup!"
        />
      </Head>
      <AuthForm />
    </Fragment>
  );
}

export default AuthenticationPage;
