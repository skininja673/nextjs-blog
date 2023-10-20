// /api/contact
import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, name, message } = req.body;

        // validate at backend
        if (
            !email ||
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !message ||
            message.trim() === ''
        ) {
            res.status(422).json({ message: 'invalid input' });
            return;
        } else {
            // store it in a database
            const newMessage = {
                email,
                name,
                message,
            };
            console.log(newMessage);

            let client;
            const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.0jjgw5n.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

            try {
                client = await MongoClient.connect(connectionString);
            } catch (error) {
                res.status(500).json({
                    message: 'Could not connect database.',
                });

                return;
            }

            const db = client.db();

            try {
                const result = await db
                    .collection('messages')
                    .insertOne(newMessage);

                newMessage.id = result.insertedId;
            } catch (error) {
                client.close();
                res.status(500).json({ message: 'storing message failed' });
                return;
            }

            client.close();

            res.status(201).json({
                message: 'successfully stored message',
                message: newMessage,
            });
        }
    }
}
export default handler;
