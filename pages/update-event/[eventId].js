import UpdateEventForm from "@/components/update-event/update-event-form";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useState, useEffect } from "react";

function UpdateProfilePage() {
  const router = useRouter();
  const id = router.query.eventId;

  const [isLoading, setIsLoading] = useState(true);

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
        <title>Update Event</title>
        <meta name="description" content="update any event if needed!" />
      </Head>
      <UpdateEventForm oldId={id} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const session = await getSession({ req: context.req });
//   console.log(session);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// }

export default UpdateProfilePage;
