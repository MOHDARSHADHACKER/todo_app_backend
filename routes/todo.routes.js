module.exports = app => {
  const todos = require("../controllers/todo.controller");
  var router = require("express").Router();

  const auth = require("../middleware/auth");

  router.post("/", auth, todos.create);

  router.get("/", auth, todos.findAll);

  router.get("/:id", auth, todos.findOne);

  router.put("/:id", auth, todos.update);

  router.delete("/:id", auth, todos.delete);

  app.use('/api/todos', router);
};