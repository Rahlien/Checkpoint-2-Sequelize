const express = require('express');
const router = express.Router();
const todos = require('../models/express-models/todos');
module.exports = router;

// write your routes here. Feel free to split into multiple files if you like.

router.get('/users', (req, res, next) => {
    try{
        res.send(res.body.listPeople)
        
    } 
    catch (ex) {
        next(ex)
    }
})