const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const blogRoutes = require('./routers/blog')

const PORT_NUMBER = 3000

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(blogRoutes)

app.use('/', (req, res, next) => {
	res.render('404', {
		title: '404',
		metaDescription: 'Error 404',
	})
})
app.listen(PORT_NUMBER)
