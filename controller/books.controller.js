const Book = require('../models/Book');
const { Op } = require('sequelize');
const redis = require('../database/cache')


exports.getAllBooks = (req, res) => {
  try {
    redis.get('listBooks', async (err, result) => {
      if (result)
        res.status(200).send(result);
      else {
        const result = await Book.findAll()
        redis.set('listBooks', JSON.stringify(result));
        res.status(200).send(result)
      }
    });
  } catch (error) {
    res.status(500).send("Error on controller: \n" + error)
  }
}

exports.getBook = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Book.findByPk(id)
    if (result)
      res.status(200).send(result)
    else
      throw 'Not found book!'
  } catch (error) {
    res.status(500).send("Error on controller: \n" + error)
  }
}

exports.getBooksByAuthor = async (req, res) => {
  const { author } = req.params;
  try {
    if (!author)
      throw 'Need author name to find';
    else {
      const result = await Book.findAll({ where: { author: { [Op.like]: `%${author}%` } } })
      if (result.length)
        res.status(200).send(result)
      else
        throw 'Not found book!'
    }
  } catch (error) {
    res.status(500).send("Error on controller: \n" + error)
  }
}

exports.insertBook = async (req, res) => {
  const { title, author } = req.body;
  try {
    if (!title && !author)
      throw 'Need payload to insert';
    else {
      if (!title)
        throw 'Need title to insert new book';
      if (!author)
        throw 'Need author to insert new book';

      const result = await Book.create({ title, author });
      redis.del('listBooks');
      res.status(200).send({ created: true, data: result });
    }
  } catch (err) {
    res.status(500).send({ created: false, message: err })
  }
}

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.body)
      throw 'Need payload to update!'
    else {
      const result = await Book.update(req.body, { where: { id } })
      if (result){
        redis.del('listBooks');
        res.status(200).send({ update: true, data: req.body });
      } else
        throw 'Not found book to update!'
    }
  } catch (err) {
    res.status(500).send({ update: false, message: err });
  }
}

exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Book.destroy({ where: { id } })
    if (result)
      res.status(200).send({ deleted: true, deletedAt: new Date() });
    else
      throw 'Not found book to delete!';

  } catch (err) {
    res.status(500).send({ deleted: false, message: err });
  }
}