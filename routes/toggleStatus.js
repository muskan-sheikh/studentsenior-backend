const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Client = require('../models/Client');
const Senior = require('../models/Senior.js');
const Store = require('../models/Store.js');
const PYQ = require('../models/PYQ');
const Colleges = require('../models/Colleges');
const Groups = require('../models/WhatsappGroup');
const Notes = require('../models/Notes');
const { isLoggedIn } = require('../middleware.js');

router.put('/:type/:id', async (req, res) => {
    const { type, id } = req.params;
    const { status } = req.body;

    try {
        let model;
        if (type === 'pyq') model = PYQ;
        else if (type === 'senior') model = Senior;
        else if (type === 'college') model = Colleges;
        else if (type === 'product') model = Store;
        else if (type === 'note') model = Notes;
        else if (type === 'group') model = Groups;

        await model.findByIdAndUpdate(id, { status });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;