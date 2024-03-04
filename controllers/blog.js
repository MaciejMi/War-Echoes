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
			if (rows.length === 0) {
				return res.redirect('/')
			}

			const date = new Date(rows[0].date)

			const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
			const month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()

			const currentDate = `${day}.${month}.${date.getFullYear()}`

			rows[0].date = currentDate

			res.render('article', {
				postData: rows[0],
				title: `War Echoes | ${rows[0].title}`,
				metaDescription: rows[0].introduction,
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

exports.postEditPost = (req, res, next) => {
	Article.fetchById(req.body.id)
		.then(([article]) => {
			res.render('edit-post', {
				title: 'War Echoes | Edit Post',
				metaDescription:
					'Edit your story on our post-editing page! Dive into a user-friendly platform where your creativity can flourish. Publish your ideas and tales with ease. Join us today and share your thoughts with our community!',
				article: article[0],
			})
		})
		.catch(err => console.log(err))
}

exports.postEdit = (req, res, next) => {
	const id = req.body.id
	const title = req.body.title
	const introduction = req.body.introduction
	const text = req.body.text
	const photoUrl = req.body.photoUrl
	const author = req.body.author

	const date = new Date()

	const day = date.getDate()
	const month = date.getMonth() + 1
	const year = date.getFullYear()

	const currentDate = `${day}-${month}-${year}`

	Article.update(id, title, introduction, text, photoUrl, author, currentDate)
		.then(result => {
			res.redirect('/')
		})
		.catch(err => console.log(err))
}
