// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const contactsRouter = require('./routes/contacts'); 

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000;
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String
});

const Contact = mongoose.model('Contact', contactSchema);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/v1/contact', async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

app.post('/v1/contact', async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.status(201).json(contact);
});

app.delete('/v1/contact', async (req, res) => {
  await Contact.deleteMany();
  res.status(204).end();
});

app.get('/v1/contact/:uid', async (req, res) => {
  const contact = await Contact.findById(req.params.uid);
  res.json(contact);
});

app.delete('/v1/contact/:uid', async (req, res) => {
  await Contact.findByIdAndDelete(req.params.uid);
  res.status(204).end();
});

app.put('/v1/contact/:uid', async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(req.params.uid, req.body, { new: true });
  res.json(contact);
});


