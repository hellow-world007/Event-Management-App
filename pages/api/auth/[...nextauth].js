import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { verifyInfo, verifyPassword } from "@/utils/auth";
import { connectToDatabaseTwo } from "@/utils/dbutils";
import { connectDatabase } from "@/utils/dbutils";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 5,
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabaseTwo();

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        console.log(user);

        if (!user) {
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Password doesnot matched!");
        }

        return { email: user.email, name: user.name, password: user.password };

        client.close();
      },
    }),
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectDatabase();

        const eventsCollection = client.db().collection("events");

        const user = await eventsCollection.findOne({ id: credentials.id });
        console.log(user);

        if (!user) {
          throw new Error("No user found!");
        }

        const isValid = await verifyInfo(credentials.id, user.id);

        if (!isValid) {
          throw new Error("Id doesnot matched!");
        }

        return {
          name: user.name,
          category: user.category,
          description: user.description,
          image: user.image,
          location: user.location,
          date: user.date,
          price: user.price,
          url: user.url,
          id: user.id,
        };

        client.close();
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
