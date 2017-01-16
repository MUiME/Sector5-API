var authCtrl = require(global.modulePath('auth', 'controller'));

module.exports = [
    {
        verb: 'post',
        endpoint: '/authenticate',
        callback: authCtrl.authenticate
    },
    {
        verb: 'post',
        endpoint: '/refreshToken',
        callback: authCtrl.refreshToken
    }
];


/**
 * @swagger
 * definition:
 *   AuthUser:
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *   AuthError:
 *     properties:
 *       message:
 *         type: string
 */

/**
 * @swagger
 * /authenticate:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Authenticate user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: uaccount
 *         description: User account properties
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/AuthUser'
 *     responses:
 *       200:
 *         description: Token for authorization
 *         schema:
 *           $ref: '#/definitions/UserToken'
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/AuthError'
 */
