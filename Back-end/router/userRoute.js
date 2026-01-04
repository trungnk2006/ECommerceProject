const express = require('express')
const router = express.Router()
const {login, register, addToCart, removeFromCart, getUserById, updateUserInfor, updateOrderInCart} = require('../controller/userCtrl')
// const userRoute = router()

router.post('/login', login)
router.post('/register', register)
router.post('/add-to-cart', addToCart)
router.patch('/remove-from-cart', removeFromCart)
router.get('/get-info/:userId', getUserById)
router.patch('/update-info', updateUserInfor)
router.patch('/update-order-in-cart', updateOrderInCart)

module.exports = router