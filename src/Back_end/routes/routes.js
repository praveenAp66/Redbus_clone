const express = require("express");
const router = express.Router()
const connection = require("../mysql/mysql.js") /*./---> means in current directort,../-->one step back and in thatdirectory*/
const multer = require('multer'); // Import multer

// Initialize multer
const upload = multer(); // Initialize multer for memory storage





const Signup=require("../controller/Signup.js")
const login=require("../controller/login.js")
const checkroute=require("../controller/checkroute.js")
const getbusesforroute=require("../controller/getbusesforroute.js")
const reserverseats=require("../controller/reserverseats.js")
const createorder=require("../controller/create-order.js")
const verifypayment=require("../controller/verify-payment.js")
const bookedseats=require("../controller/bookedseats.js")
const auth=require("../controller/jwt_token_verify.js")
const accesstoken=require("../controller/accesstoken.js")

const cleanupExpiredReservations=require("../controller/cleanupExpiredReservations .js")
const getreservedseats=require("../controller/getreservedseats.js")
const config=require("../controller/config.js")
const cities=require("../controller/citiescontroller.js")
const showticket=require("../controller/showticket.js")
const sendpdfemail=require("../controller/sendpdfemail.js")
const passengerdetails=require("../controller/passengerdetails.js")
const bookingdetails=require("../controller/booking-details.js")
const cancelticket=require("../controller/cancel-seat.js")

router.get("/cities"  ,cities)
router.post("/signup", Signup)
router.post("/login",auth,login)
router.post("/checkroute",checkroute)
router.get("/getbusesforroute", getbusesforroute)

router.post("/reserverseats",accesstoken, reserverseats,cleanupExpiredReservations);
router.get("/getreservedseats",getreservedseats)


router.post("/create-order",accesstoken,createorder)
router.post("/verify-payment",accesstoken,verifypayment)

router.get("/bookedseats",bookedseats)
router.post("/showticket",accesstoken,showticket)
router.post("/sendpdfemail",accesstoken,upload.single('pdf'),sendpdfemail)
router.post("/passengerdetails",accesstoken,passengerdetails)
router.get("/booking-details",accesstoken,bookingdetails)
router.post("/cancel-seat",accesstoken,cancelticket)

//for sharing the .env varianles
router.get("/config",config)




















module.exports = router;