import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET

import { hashPassword,verifyPassword,verifyInfo } from "@/utils/auth";
import { connectToDatabaseTwo } from "@/utils/dbutils";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const token = await getToken({ req, secret })
  console.log("JSON Web Token", token)


  if (!token) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  const userEmail = token.email;

  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const oldName = req.body.oldName;
  const newName = req.body.newName;
  const oldEmail = req.body.oldEmail;
  const newEmail = req.body.newEmail;

  const client = await connectToDatabaseTwo();

  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found." });
    client.close();
    return;
  }

  console.log(user);
  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: "Invalid password or mail or name" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword, name: newName, email: newEmail } }
  );

  client.close();
  res.status(200).json({ message: "Info updated successfully!" });
}

export default handler;
