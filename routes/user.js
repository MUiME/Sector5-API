var userCtrl = require(global.modulePath('user', 'controller'));

module.exports = [
    {
        verb: 'post',
        endpoint: '/users',
        callback: userCtrl.create
    },
    {
        verb: 'get',
        endpoint: '/users/duplicate/:username',
        callback: userCtrl.isDuplicateUsername
    }
];


/**
 * @swagger
 * definition:
 *   UserInput:
 *     properties:
 *       firstname:
 *         type: string
 *       lastname:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       gender:
 *         type: string
 *   UserToken:
 *     properties:
 *       token:
 *         type: string
 *   UserIs:
 *     properties:
 *       is:
 *         type: boolean
 */

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - User
 *     summary: Create a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User properties
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserInput'
 *     responses:
 *       200:
 *         description: Token for authorization
 *         schema:
 *           $ref: '#/definitions/UserToken'
 */

/**
 * @swagger
 * /users/duplicate/{username}:
 *   get:
 *     tags:
 *       - User
 *     summary: Find out if username duplicates or not
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Result
 *         schema:
 *           $ref: '#/definitions/UserIs'
 */
