const express=require('express');
const logincontrollers = require('../controllers/logincontrollers');
const router=express.Router();

router.post('/login',logincontrollers);
module.exports=router;


