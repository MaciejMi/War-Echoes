const Article = require('../models/article')

exports.getIndex = (req, res, next) => {
	res.render('index')
}

exports.getBlog = (req, res, next) => {
	res.render('blog')
}

exports.getAddPost = (req, res, next) => {
	res.render('add-post', {
		title: 'War Echoes | Add Post',
		metaDescription:
			'Craft your story on our post-adding page! Dive into a user-friendly platform where your creativity can flourish. Publish your ideas and tales with ease. Join us today and share your thoughts with our community!',
	})
}

exports.postAddPost = (req, res, next) => {
	const title = req.body.title
	const introduction = req.body.introduction
	const text = req.body.text
	const imageUrl = req.body.imageUrl
	const author = req.body.author

	const date = new Date()

	const day = date.getDate()
	const month = date.getMonth() + 1
	const year = date.getFullYear()

	const currentDate = `${day}-${month}-${year}`

	const article = new Article(null, title, introduction, text, imageUrl, author, currentDate)
	article.save()
}
