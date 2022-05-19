const express = require('express');
const router = express.Router();

 const adminController=require("../controllers/adminController")
 const websiteController = require('../controllers/websiteController')
 const articlesController = require('../controllers/articlesController')
const subscriptionController = require('../controllers/subscriptionController')
 const Middleware = require('../middleware/auth')

  router.post('/registerAdmin',adminController.registerAdmin)
  router.post('/loginAdmin',adminController.loginAdmin)

  router.post('/Website',websiteController.resisterWebsite)
  router.post('/article',Middleware.Auth,articlesController.registerTitle)

  router.post('/subscribeEmail',subscriptionController.subscribeEmail)
  //router.get('/getUpdatedList',subscriptionController.getUpdatedList)



module.exports = router;