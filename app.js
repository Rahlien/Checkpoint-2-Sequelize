const express = require('express');
const app = express();
module.exports = app; // this line is only used to make testing easier.
const router = require('./routes/index.js')
// remember to plug in your router and any other middleware you may need here (i.e. body parser, mounting any router-level middleware, etc.)

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use((err, req, res, next) => {
  res.sendStatus(err.status);
});


app.use('/users', router)

app.use((req, res) => {
    res.status(404).send("Not Found")
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err);
});

// app.get("/", (req, res) => {
//     res.redirect("/users")
// })

if (!module.parent) app.listen(3000); // conditional prevents a very esoteric EADDRINUSE issue with mocha watch + supertest + npm test.


