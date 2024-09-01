const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Client = require('../models/Client');
const PYQ = require('../models/PYQ');
const College = require('../models/Colleges');
const Group = require('../models/WhatsappGroup');
const Note = require('../models/Notes');

router.get('/', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalClients = await Client.countDocuments();
        const totalPYQs = await PYQ.countDocuments();
        const totalColleges = await College.countDocuments();
        const totalGroups = await Group.countDocuments();
        const totalNotes = await Note.countDocuments();

        res.render('index', {
            totalUsers,
            totalClients,
            totalPYQs,
            totalColleges,
            totalGroups,
            totalNotes,
        });
    } catch (error) {
        console.error('Error fetching totals:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/user', async (req, res) => {
    let allUsers = await User.find({});
    res.render('home/user.ejs', { allUsers });
});

router.get('/client', async (req, res) => {
    let allClient = await Client.find({});
    res.render('home/client.ejs', { allClient });
});

module.exports = router;
