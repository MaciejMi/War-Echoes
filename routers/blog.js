const express = require('express')
const blogControllers = require('../controllers/blog')

const router = express.Router()

router.get('/', blogControllers.getIndex)
router.get('/blog', blogControllers.getBlog)
router.get('/add-post', blogControllers.getAddPost)

router.post('/add-post', blogControllers.postAddPost)

module.exports = router