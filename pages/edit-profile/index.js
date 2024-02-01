import UserProfile from "@/components/profile/user-profile";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useState, useEffect } from "react";

function EditProfilePage() {
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
        <title>Edit Profile</title>
        <meta
          name="description"
          content="see and update your personal info if needed!"
        />
      </Head>
      <UserProfile />
    </Fragment>
  );
}

// creates problem in production
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

export default EditProfilePage;
