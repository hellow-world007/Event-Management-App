import CreateEventForm from "@/components/create-event/create-event-form";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import Head from "next/head";

function AuthenticationPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace("/auth");
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
        <title>Create Event</title>
        <meta
          name="description"
          content="Create your event!"
        />
      </Head>
      <CreateEventForm />
    </Fragment>
  );
}

export default AuthenticationPage;