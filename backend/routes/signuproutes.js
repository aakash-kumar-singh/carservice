const signupcontrollers=require("../controllers/signupcontroller");
const express=require('express');
const router=express.Router();
router.post("/signup",signupcontrollers);
module.exports=router;