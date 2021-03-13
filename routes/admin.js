const express = require('express')
const router = express.Router()
const adminController = require('../controller/admincontroller')
const passport = require('passport')


router.get('/', adminController.getHome);

router.get('/compose',adminController.getCompose)

router.post('/compose',adminController.postCompose)

router.get('/exists',adminController.getExists)

router.get('/signup',adminController.getSignup)

router.post('/signup',adminController.postSignup)

router.get('/login',adminController.getLogin)

router.post('/login',adminController.postLogin)

router.delete('/delete/:postId',adminController.deletePost)

router.get('/google',adminController.getGoogle)

router.get('/redirect',adminController.getRedirect)

module.exports = router