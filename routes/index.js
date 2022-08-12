const express = require('express');
const router = express.Router();
const app = express()
const todos = require('../models/express-models/todos');
module.exports = router;

// write your routes here. Feel free to split into multiple files if you like.

// const notFound = function () {
// app.use((req, res) => {
//     res.status(404).send("Not Found")
// })

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(400).send("No User");
// });
// }

// const notEntry = function () {
//     app.use((req, res) => {
//     res.status(400).send("Not Found")
// })
// }



router.get('/', (req, res, next) => {
    try{
        // console.log(res.body.reset)
        res.send(
            todos.listPeople()
        )
        
    } 
    catch (ex) {
        next(ex)
    }
})

router.get('/:name/tasks', async(req, res, next) => {
    try{

        if (!todos.list(req.params.name)){
            res.status(404).send("Not Found")
        }
        
        res.send(
            todos.list(req.params.name)
        )
        
        
    }
    catch (ex) {
        next(ex)
    }
})


router.post('/:name/tasks', (req, res, next) => {
    try{
        if(req.body.content === '' ){
            res.status(400).send("Bad Request")
        }
        
        todos.add(req.params.name, req.body)

        res.status(201).send(
            todos.list(req.params.name)[0]
        )
        
    }
    catch (ex) {
        next(ex)
    }
})

router.put('/:index', (req, res, next) => {
    try{
        // console.log(`this is ${req.params}`)
        // console.log(`this is ${req.params.name}`)
        // todos.complete(req.params.name, req.params)
        // console.log(`this is ${todos.list(req.params.name)}`)
        todos.complete(req.params.name, 1)
    }
    catch (ex) {
        next(ex)
    }
})

// router.delete('/:index', (req, res, next) => {
//     try{

//         todos.remove(req.params.name, req.params.index)
//         res.redirect(
//             todos.list(req.params.name)[0]
//         )
//     }
//     catch (ex) {
//         next(ex)
//     }
// })



module.exports = router