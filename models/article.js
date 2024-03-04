const db = require('../utils/database')

module.exports = class Article {
	constructor(id, title, introduction, text, imageUrl, author, date) {
		this.id = id
		this.title = title
		this.introduction = introduction
		this.text = text
		this.imageUrl = imageUrl
		this.author = author
		this.date = date
	}

	save() {
		return db.execute('INSERT INTO posts (title, price, imageUrl, description) VALUES (?, ?, ?, ?)', [
			this.title,
			this.price,
			this.imageUrl,
			this.description,
		])
	}
}
