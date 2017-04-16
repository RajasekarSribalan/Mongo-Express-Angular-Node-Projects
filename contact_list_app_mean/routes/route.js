const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

//Retrieve contacts
router.get('/contacts', (req, res, next) => {
    Contact.find(function (err, contact) {
        res.json(contact);
    })
});

//add contact
router.post('/contact', (req, res, next) => {
    //Add new contact
    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone
    });

    newContact.save((err, contact) => {
        if (err) {
            res.json({
                msg: 'Failed to add contact'
            });
        } else {
            res.json({
                msg: 'Contact added successfully'
            });
        }
    });
});

//delete contact
router.delete('/contact/:id', (req, res, next) => {
    Contact.remove({ _id: req.params.id }, function (err, result){
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;