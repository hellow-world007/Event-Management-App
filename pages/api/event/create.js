import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "@/utils/dbutils";

async function handler(req, res) {
  // const feedbackId = req.query.eventId;
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed." });
    return;
  }

  if (req.method === "POST") {

    const name = req.body.name;
    const category = req.body.category;
    const description = req.body.description;
    const image = req.body.image;
    const location = req.body.location;
    const date = req.body.date;
    const price = req.body.price;
    const url = req.body.url;
    const id = req.body.id;
    const user = req.body.user;

    if (
      !image ||
      !price ||
      price.trim() === "" ||
      !user ||
      user.trim() === "" ||
      !category ||
      !description ||
      description.trim() === "" ||
      !url ||
      url.trim() === "" ||
      !name ||
      name.trim() === "" ||
      !location ||
      location.trim() === "" ||
      !date || !id
    ) {
      res.status(422).json({ message: "Invalid input!" });
      client.close();
      return;
    }

    const newFeedback = {
      name: name,
      category: category,
      description: description,
      image: image,
      location: location,
      date: date,
      price: price,
      url: url,
      user: user,
      id: id,
    };

    try {
      await insertDocument(
        client,
        "createEventsCollection",
        "events",
        newFeedback
      );
      res.status(201).json({ message: "Event Created!", event: newFeedback });
    } catch (error) {
      res.status(500).json({ message: "Creating events failed." });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(
        client,
        "createEventsCollection",
        "events",
        { _id: -1 }
      );
      res.status(200).json({ events: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting events failed." });
    }
  }
  client.close();
}

export default handler;
