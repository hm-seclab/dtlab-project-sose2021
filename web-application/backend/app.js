// Plugins
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const cors = require('cors');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const db = require('./config/database');

const {postContentValidationRules, postUuidValidationRules, validate} = require('./config/validator.js')

// Express App
const app = express();

// Plugins Setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.json());

// Swagger
const swaggerDocs = require("./config/swagger");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, {explorer: true}));

// CORS settings
app.use(cors());

// Keycloak
const memoryStore = new session.MemoryStore();
const keycloakConfig = {
    clientId: 'backend',
    bearerOnly: true,
    authServerUrl: 'https://auth.yourdomain.com/auth',
    resource: 'backend',
    realm: 'hm-client',
    ConfidentialPort: 0
}
const keycloak = new Keycloak({store: memoryStore}, keycloakConfig);

app.use(session({
    secret: 'thisShouldBeLongAndSecret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

app.use(keycloak.middleware());

// Endpoints
/**
 * @swagger
 * /status:
 *  get:
 *      summary: Get status of the backend
 *      tags:
 *          - Status
 *      description: Get status of the backend
 *      responses:
 *          200:
 *              description: Successful response
 */
app.get('/status', function (req, res, next) {
    res.status(200).json({online: 'true'});
});

/**
 * @swagger
 * /posts/all:
 *  get:
 *      summary: Get all posts
 *      tags:
 *          - Posts
 *      description: Get all posts
 *      responses:
 *          200:
 *              description: Successful response
 */
app.get("/posts/all", function (req, res) {
    db.Post.findAll(
        {
            include: {
                model: db.User,
                attributes: ['first_name', 'last_name']
            },
        })
        .then(posts => {
            res.status(200).send(JSON.stringify(posts));
        })
        .catch(err => {
            res.status(500).send(JSON.stringify(err));
        });
});

/**
 * @swagger
 * /posts/:
 *  post:
 *      summary: Create a  post
 *      tags:
 *          - Posts
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Post'
 *
 *      responses:
 *          '201':
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Post'
 */
app.post("/posts", keycloak.protect('realm:user'), postContentValidationRules(), validate, function (req, res) {
    const user =
        db.User.build({
            user_id: req.kauth.grant.access_token.content.preferred_username,
            first_name: req.kauth.grant.access_token.content.given_name,
            last_name: req.kauth.grant.access_token.content.family_name
        });

    db.User.findOrCreate({
        where: {user_id: user.user_id},
        defaults: {
            first_name: user.first_name,
            last_name: user.last_name
        }
    })
        .then(() => {
            db.Post.create({
                content: req.body.post_content,
                UserUserId: user.user_id,
                parent: req.body.post_parent
            })
                .then(post => {
                    res.status(201).send(JSON.stringify(post));
                })
                .catch(err => {
                    res.status(500).send(JSON.stringify(err));
                });
        })
        .catch(err => {
        res.status(500).send(JSON.stringify(err));
    });

});

/**
 * @swagger
 * /posts/{id}:
 *  delete:
 *      summary: Delete a post
 *      tags:
 *          - Posts
 *      description: Delete a specific post
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *            description: Id of the Post
 *      responses:
 *          '200':
 *              description: Successful response
 */
app.delete("/posts/:post_uuid", keycloak.protect('realm:user'), postUuidValidationRules(), validate, function (req, res) {
    db.Post.findOne({where: {post_uuid: req.params.post_uuid}}).then(post_from_database => {
        if ((req.kauth.grant.access_token.hasRealmRole("admin")) || (req.kauth.grant.access_token.content.preferred_username === post_from_database.UserUserId)) {
            db.Post.destroy({
                where: {
                    post_uuid: req.params.post_uuid
                }
            })
                .then(() => {
                    res.status(204).send();
                })
                .catch(err => {
                    res.status(500).send(JSON.stringify(err));
                });
        } else {
            res.status(403).send();
        }
    }).catch(err => {
        res.status(500).send(JSON.stringify(err))
    })
});

/**
 * @swagger
 * /posts/:
 *  put:
 *      summary: Edit a  post
 *      tags:
 *          - Posts
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Post'
 *
 *      responses:
 *          '200':
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Post'
 */
app.put("/posts", keycloak.protect('realm:user'), postContentValidationRules(), validate, function (req, res) {
    db.Post.findOne({ where: {post_uuid: req.body.id} }).then(post_from_database => {
        if ((req.kauth.grant.access_token.hasRealmRole("admin")) || (req.kauth.grant.access_token.content.preferred_username === post_from_database.UserUserId)) {
            db.Post.update(
                {content: req.body.post_content},
                {
                    where: {post_uuid: req.body.id}
                })
                .then(post => {
                    res.status(200).send(JSON.stringify(post));
                })
                .catch(err => {
                    res.status(500).send(JSON.stringify(err));
                });
        } else {
            res.status(403).send("Forbidden!");
        }
    }).catch(err => {
        res.status(500).send(JSON.stringify(err));
    });
});

module.exports = app


