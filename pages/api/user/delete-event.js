import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;

import { connectDatabase } from "@/utils/dbutils";

async function handler(req, res) {
  if (req.method !== "DELETE") {
    return;
  }

  const token = await getToken({ req, secret });
  // console.log("JSON Web Token", token);

  if (!token) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const ID = req.body;

  const client = await connectDatabase();

  const eventsCollection = client
    .db("createEventsCollection")
    .collection("events");

  const user = await eventsCollection.findOne({ id: ID });

  if (!user) {
    res
      .status(404)
      .json({ message: "User not found to perform delete event." });
    client.close();
    return;
  }

  const userName = user.user;
  const tokenName = token.name;
  console.log(userName,tokenName)

  if (tokenName !== userName) {
    res.status(403).json({ message: "You are not eligible to delete the event." });
    client.close();
    return;
  }

  const result = await eventsCollection.deleteOne({ id: ID });

  client.close();
  res.status(200).json({ message: "Event deleted successfully!" });
}

export default handler;
