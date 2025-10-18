const db = require("../models");
const Todo = db.todo;

// create todo

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed || false
  });

  todo
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred"
      });
    });
};


// get all todos

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Todo.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || " Some err occured" });
    });

};

// ge 

exports.findOne = (req, res) => {
  const id = req.params.id;
  Todo.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found todo with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving todo with id=" + id });
    });
};

exports.deleteAll = (req, res) => {
  Todo.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Todos were deleted successfully`
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some err occurred"
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Todo.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete todo with id=${id}. Maybe Todo was not found`
        });
      } else {
        res.send({
          message: "Todo was deleted successfully"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Todo With id=" + id
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Todo with id=${id}. Maybe Todo was not found!`
        });
      } else res.send({ message: "Todo was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Todo with id=" + id
      });
    });
};