const pyqController = require('../controllers/pyqController');
const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { isLoggedIn, isOwner, validatePyq } = require('../middleware.js');

router
    .route('/')
    .get(wrapAsync(pyqController.index))
    .post(isLoggedIn, validatePyq, wrapAsync(pyqController.create));

// Show form to add new PYQ
router.get('/new', wrapAsync(pyqController.new));

router
    .route('/:id')
    .get(wrapAsync(pyqController.show))
    .put(isLoggedIn, validatePyq, wrapAsync(pyqController.editPyq))
    .delete(isLoggedIn, wrapAsync(pyqController.delete));

// Edit - Show form to edit a PYQ
router.get('/:id/edit', isLoggedIn, wrapAsync(pyqController.edit));

module.exports = router;