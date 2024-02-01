import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;
import { connectDatabase } from "@/utils/dbutils";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const token = await getToken({ req, secret });
  // console.log("JSON Web Token", token);

  if (!token) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const oldId = req.body.oldId;

  const newName = req.body.name;
  const newCategory = req.body.category;
  const newDescription = req.body.description;
  const newImage = req.body.image;
  const newLocation = req.body.location;
  const newDate = req.body.date;
  const newPrice = req.body.price;
  const newUser = req.body.user;
  const newUrl = req.body.url;

  const newId = req.body.id;

  const client = await connectDatabase();

  const eventsCollection = client.db("createEventsCollection").collection("events");

  const user = await eventsCollection.findOne({ id: oldId });

  if (!user) {
    res.status(404).json({ message: "User not found to update event." });
    client.close();
    return;
  }

  const tokenName = user.user;
  console.log(newUser,tokenName)

  if (newUser !== tokenName) {
    res.status(403).json({ message: "You are not eligible to update the event." });
    client.close();
    return;
  }

  const result = await eventsCollection.updateOne(
    { id: oldId },
    {
      $set: {
        name: newName,
        category: newCategory,
        description: newDescription,
        image: newImage,
        location: newLocation,
        date: newDate,
        price: newPrice,
        url: newUrl,
        user: newUser,
        id: newId,
      },
    }
  );

  client.close();
  res.status(200).json({ message: "Event updated successfully!" });
}

export default handler;
