const db = require("../models");
const Todo = db.todo;

exports.create = (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({ message: "Content can not be empty" });
  }

  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed || false,
    userId: req.userId   // 🔥 IMPORTANT
  });

  todo.save()
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred"
      });
    });
};


exports.findAll = (req, res) => {
  const title = req.query.title;

  let condition = {
    userId: req.userId   
  };

  if (title) {
    condition.title = { $regex: new RegExp(title), $options: "i" };
  }

  Todo.find(condition)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error fetching todos"
      });
    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;

  Todo.findOne({ _id: id, userId: req.userId }) 
    .then(data => {
      if (!data)
        return res.status(404).send({ message: "Todo not found" });
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving todo" });
    });
};


exports.update = (req, res) => {
  const id = req.params.id;

  Todo.findOneAndUpdate(
    { _id: id, userId: req.userId }, 
    req.body,
    { new: true }
  )
    .then(data => {
      if (!data)
        return res.status(404).send({ message: "Todo not found" });

      res.send({ message: "Todo updated successfully" });
    })
    .catch(err => {
      res.status(500).send({ message: "Error updating todo" });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  Todo.findOneAndDelete({ _id: id, userId: req.userId }) 
    .then(data => {
      if (!data)
        return res.status(404).send({ message: "Todo not found" });

      res.send({ message: "Todo deleted successfully" });
    })
    .catch(err => {
      res.status(500).send({ message: "Error deleting todo" });
    });
};