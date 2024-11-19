const express = require('express');
const router = express.Router();

router.get('/v1/contact', async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
});

router.post('/v1/contact', async (req, res) => {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
});

router.delete('/v1/contact', async (req, res) => {
    await Contact.deleteMany();
    res.status(204).end();
});

router.get('/v1/contact/:uid', async (req, res) => {
    const contact = await Contact.findById(req.params.uid);
    res.json(contact);
});

router.delete('/v1/contact/:uid', async (req, res) => {
    await Contact.findByIdAndDelete(req.params.uid);
    res.status(204).end();
});

router.put('/v1/contact/:uid', async (req, res) => {
    const contact = await Contact.findByIdAndUpdate(req.params.uid, req.body, { new: true });
    res.json(contact);
});