const express = require('express');
const redisCLient = require('./redis');
const body_Parser = require('body-parser');
/* init express */
const app = express();

app.use(body_Parser.json());



/* post routers */
app.post("/tasks", (req, res) => {
    if (req.body.task) {
        redisCLient.lpushAsync('my_task', req.body.task)
            .then(e => res.json({
                message: "Task is added succesfully."
            }))
    } else {
        res.json({
            error: true,
            message: "Please specify your task."
        }).status(400)
    }
})

/* get routers */
app.get("/tasks", (req, res) => {
    redisCLient.lrangeAsync('my_task', 0, -1)
        .then(d => {
            res.json({
                data: d
            })
        }).catch(e => {
            res.json({
                error: true,
                message: "Could not list task"
            }).status(500)
        })
})

app.listen(3000);