const express = require("express");
const cors = require("cors");

const app = express();

//Middleware

let corsOptions = {
   origin : 'http://localhost:3000'
}

app.use(cors(corsOptions));


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./models");

db.mongoose
    .connect(db.url, {
        
    })
    .then(() => {
        console.log("connected to the database");
    })
    .catch(err => {
        console.log(" Cannot connect to database", err);
        process.exit();
    });


app.get("/", (req, res) => {
    res.send("Todo backend is working");
});

require("./routes/todo.routes")(app);
app.use("/api/auth", require("./routes/auth.routes"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

