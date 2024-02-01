import { hashPassword } from '@/utils/auth';
import { connectToDatabaseTwo } from '@/utils/dbutils';

async function handler(req, res) {

  if(req.method !== 'POST'){
    return;
  }

  const data = req.body;
  const { email, password,name } = data;

  if (
    !name || 
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        'Invalid input - password should also be at least 7 characters long.',
    });
    return;
  }

  const client = await connectToDatabaseTwo();
  console.log(client)
  const db = client.db();

  const existingUser = await db.collection('users').findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: 'User exists already!' });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const newInfo = {
    name: name,
    email: email,
    password: hashedPassword,
  }
  
  const result = await db.collection('users').insertOne(newInfo);

  res.status(201).json({ message: 'Created user!' });
  client.close();
}

export default handler;