import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "@/utils/dbutils";

async function handler(req, res) {
  const id = req.query.eventId;
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed." });
    return;
  }

  if (req.method === "POST") {

    const image = req.body.image;
    const price = req.body.price;
    const category = req.body.category;
    const date = req.body.date;
    const name = req.body.name;
    const description = req.body.description;
    const location = req.body.location;
    const user = req.body.user;
    const url = req.body.url;
    const addId = req.body.addId;

    const ticketsCollection = client.db("myTicketCollection").collection("tickets");

    const duplicateUser = await ticketsCollection.findOne({ user: user, name: name });

    if(duplicateUser){
      res.status(422).json({ message: "Ticket already exists!" });
      client.close();
      return;
    }

    if (
      !image ||
      !price ||
      price.trim() === "" ||
      !category ||
      category.trim() === "" ||
      !user ||
      user.trim() === "" ||
      !description ||
      description.trim() === "" ||
      !name ||
      name.trim() === "" ||
      !location ||
      location.trim() === "" ||
      !date ||
      !url
    ) {
      res.status(422).json({ message: "Invalid input!" });
      client.close();
      return;
    }

    const newFeedback = {
      image: image,
      price: price,
      category: category,
      date: date,
      name: name,
      description: description,
      location: location,
      url: url,
      user: user,
      id: id,
      addId: addId,
    };

    try {
      await insertDocument(
        client,
        "myTicketCollection",
        "tickets",
        newFeedback
      );
      res.status(201).json({ message: "Ticket Added!", ticket: newFeedback });
    } catch (error) {
      res.status(500).json({ message: "Inserting tickets failed." });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(
        client,
        "myTicketCollection",
        "tickets",
        { _id: -1 }
      );
      res.status(200).json({ tickets: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting tickets failed." });
    }
  }
  client.close();
}

export default handler;
