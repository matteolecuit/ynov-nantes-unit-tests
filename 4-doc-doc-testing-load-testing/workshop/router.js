const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { getTodo, postTodo, patchTodo } = require('./toDoController');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * @swagger
 * /api/todo:
 *   get:
 *     tags: Todo
 *     description: Updates a single todo
 *     produces: application/json
 *     parameters:
 *       name: todo
 *       in: body
 *       description: Fields for the todo resource
 *       schema:
 *         type: array
 *         $ref: '#/definitions/todo'
 *     responses:
 *       200:
 *         description: Successfully updated
 *   post:
 *     tags: Todo
 *     description: Creates a new todo
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: todo
 *         description: Puppy object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Puppy'
 *     responses:
 *       200:
 *         description: Successfully created
 */
app.route('/todo')
    .get(getTodo)
    .post(postTodo);

/**
 * @swagger
 * /api/todo/{id}:
 *   patch:
 *     tags: Todo
 *     description: Updates a single todo
 *     produces: application/json
 *     parameters:
 *       name: todo
 *       in: body
 *       description: Fields for the todo resource
 *       schema:
 *         type: array
 *         $ref: '#/definitions/todo'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
app.route('/todo/:id') 
    .patch(patchTodo);

module.exports = app;