import { getSession } from "next-auth/react";
import TicketProfile from "@/components/tickets/ticket-profile";
import Head from "next/head";
import OrganizedGrid from "@/components/events/event-organized/grid-organized";
import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";

function ProfilePage() {
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
        <title>My Profile</title>
        <meta
          name="description"
          content="see tickets and update or delete event if needed!"
        />
      </Head>
      <TicketProfile />
      <OrganizedGrid />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context);
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

export default ProfilePage;
