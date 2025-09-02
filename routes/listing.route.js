const express = require('express');

const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js');
const listingController = require('../controllers/lisitng.controller.js');

const multer = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({storage});



//INDEX ROUTE
router.route('/')
.get(wrapAsync(listingController.index))
.post(isLoggedIn, upload.single("listing[image]"),  validateListing, wrapAsync(listingController.createListing))

// NEW ROUTE 
router.get('/new', isLoggedIn, (listingController.renderNewForm));

// SHOW ROUTE
router.route('/:id')
.get(wrapAsync(listingController.showListings))
.put( isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing))


// CREATE ROUTE

//Edit ROUTE
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingController.editListing))

module.exports = router;
