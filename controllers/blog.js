const Article = require('../models/article')

exports.getIndex = (req, res, next) => {
	Article.fetchWithLimits(6)
		.then(([rows, col]) => {
			res.render('index', {
				title: 'War Echoes',
				metaDescription:
					'Explore the fascinating world of World War II on our blog. Discover inspiring articles, tips, and engaging discussions on everything related to the Second World War. Dive into our collection to delve into the history, events, and consequences of this crucial period in human history.',
				posts: rows,
			})
		})
		.catch(err => console.log(err))
}

exports.getBlog = (req, res, next) => {
	Article.fetchAll()
		.then(([rows, col]) => {
			res.render('blog', {
				title: 'War Echoes | Blog',
				metaDescription:
					'Explore the fascinating world of World War II on our blog. Discover inspiring articles, tips, and engaging discussions on everything related to the Second World War. Dive into our collection to delve into the history, events, and consequences of this crucial period in human history.',
				posts: rows,
			})
		})
		.catch(err => console.log(err))
}

exports.getArticle = (req, res, next) => {
	const articleId = req.params.id
	Article.fetchById(articleId)
		.then(([rows, col]) => {
			console.log(rows)
			if (rows.length === 0) {
				res.redirect('/')
			}

			res.render('article', {
				post: rows,
				title: `War Echoes | ${rows.title}`,
				metaDescription: rows.introduction,
			})
		})
		.catch(err => {
			console.log(err)
			res.redirect('/')
		})
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
	article
		.save()
		.then(() => res.redirect('/'))
		.catch(err => console.log(err))
}
