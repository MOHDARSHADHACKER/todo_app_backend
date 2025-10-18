module.exports = app => {
    const todos = require("../controllers/todo.controller");
    var router = require("express").Router();

    router.post("/", todos.create);

    router.get("/", todos.findAll)

    router.delete("/", todos.deleteAll);

    router.get("/:id", todos.findOne);

    router.delete("/:id", todos.delete);

    router.put("/:id", todos.update);

    app.use('/api/todos', router);

};