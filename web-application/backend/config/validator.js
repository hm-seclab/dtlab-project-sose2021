// validator.js

const { body, param, validationResult } = require('express-validator')

const postContentValidationRules = () => {
    return [
        body('post_content').not().isEmpty().withMessage("The post content should not be empty!"),
        body('post_content').isLength({ max: 250 }).withMessage("Post content should be maximum 250 Char!"),
        body('post_content').whitelist(['abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789öüäÖÜÄß%@&() .,?'])
            .trim().not().isEmpty().withMessage("The post content should not be empty!"),
    ]
}

const postUuidValidationRules = () => {
    return [
        param('post_uuid').notEmpty().withMessage("The post uuid can not be empty!"),
        param('post_uuid').isUUID("4").withMessage("The post uuid is not a valid uuid!")
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    postContentValidationRules,
    postUuidValidationRules,
    validate,
}