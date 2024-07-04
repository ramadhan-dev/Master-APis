const express =require('express');
const ContactController = require("../controllers/ContactController");
const contactSchema = require('../rules/ContactRule')
const validate = require('../../../validations/common/validate')

const router = express.Router();
router.post('/create-contact', validate(contactSchema.create), ContactController.CreateContact);
router.get("/get-all-contact", ContactController.GetAllContact);
router.delete('/delete-contact/:id', ContactController.DeleteContact);
router.put('/update-contact-status/:id', validate(contactSchema.update), ContactController.UpdateContact);
router.get('/get-contact/:id', ContactController.GetContact);

module.exports=router;

