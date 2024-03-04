const express = require('express')
const blogControllers = require('../controllers/blog')

const router = express.Router()

router.get('/', blogControllers.getIndex)
router.get('/blog', blogControllers.getBlog)
router.get('/add-post', blogControllers.getAddPost)
router.get('/article/:id', blogControllers.getArticle)

router.post('/add-post', blogControllers.postAddPost)
router.post('/edit-post', blogControllers.postEditPost)
router.post('/edit', blogControllers.postEdit)
router.post('/delete-post', blogControllers.postDeletePost)
router.post('/delete', blogControllers.postDelete)

module.exports = router
