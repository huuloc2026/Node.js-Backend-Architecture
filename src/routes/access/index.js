'use strict'
const express = require('express');
const accessController = require('../../controllers/access.controller');
const { apiKey,checkPermission } = require('../../auth/checkAuth');
const router = express.Router();

// Check api key
router.use(apiKey)
router.use(checkPermission('0000'))
// Check permission

router.post('/shop/signup',accessController.signUp)


module.exports = router
