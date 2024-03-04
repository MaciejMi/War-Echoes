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
		return db.execute(
			'INSERT INTO posts (title, introduction, text, photoUrl, author, date) VALUES (?, ?, ?, ?, ?, ?)',
			[this.title, this.introduction, this.text, this.imageUrl, this.author, new Date(`${this.date}`)]
		)
	}

	static fetchAll() {
		return db.execute('SELECT * FROM posts;')
	}

	static fetchWithLimits(limit) {
		return db.execute(`SELECT * FROM posts LIMIT ${limit}`)
	}

	static fetchById(id) {
		return db.execute('SELECT * FROM posts WHERE id = ?', [id])
	}

	static update(id, title, introduction, text, imageUrl, author, currentDate) {
		return db.execute(
			'UPDATE posts SET title = ?, introduction = ?, text = ?, photoUrl = ?, author = ?, date = ? WHERE id = ?;',
			[title, introduction, text, imageUrl, author, new Date(currentDate), id]
		)
	}

	static delete(id) {
		return db.execute('DELETE FROM posts WHERE posts.id = ?;', [id])
	}
}
