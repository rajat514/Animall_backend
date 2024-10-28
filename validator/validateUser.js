const { body } = require("express-validator");


const validateSignUp = [
    body('mobile')
        .notEmpty().trim().isLength({ min: 10, max: 10 }).isNumeric().withMessage('please fill the correct number!')
]

const validateOtp = [
    body('mobile')
        .notEmpty().trim().isLength({ min: 10, max: 10 }).isNumeric().withMessage('please fill the correct number!'),

    body('phoneOtp')
        .notEmpty().trim().isLength({ min: 6, max: 6 }).isNumeric().withMessage('please fill the correct number!'),

]


const validateLocation = [
    body('longitude')
        .optional({ checkFalsy: true }).trim().isNumeric().withMessage('please fill the correct detail!'),

    body('latitude')
        .optional({ checkFalsy: true }).trim().isNumeric().withMessage('please fill the correct datail!'),
]

const validateUserProfile = [
    body('name')
        .isString().trim().optional({ checkFalsy: true }).withMessage('please fill the correct datail!'),

    body('languages')
        .isString().optional({ checkFalsy: true }).withMessage('please fill the correct datail!'),

    body('address')
        .isString().trim().optional({ checkFalsy: true }).withMessage('please fill the correct datail!'),

    body('whatsUpNumber')
        .isNumeric().trim().optional({ checkFalsy: true }).withMessage('please fill the correct datail!'),

    body('birthday')
        .isDate().optional({ checkFalsy: true }).withMessage('please fill the correct datail!'),

    body('numberOfAnimal')
        .isString().optional({ checkFalsy: true }).withMessage('please fill the correct datail!'),

    body('workId')
        .isString().optional({ checkFalsy: true }).withMessage('please fill the correct datail!'),

    body('animalHusbandryId')
        .isString().optional({ checkFalsy: true }).withMessage('please fill the correct datail!'),

    body('useAnimalAppId')
        .isString().optional({ checkFalsy: true }).withMessage('please fill the correct datail!'),

    body('educationLevelId')
        .isString().optional({ checkFalsy: true }).withMessage('please fill the correct datail!'),

    body('longitude')
        .optional({ checkFalsy: true }).trim().isNumeric().withMessage('please fill the correct detail!'),

    body('latitude')
        .optional({ checkFalsy: true }).trim().isNumeric().withMessage('please fill the correct datail!'),
]


const validateDoctor = [
    body('name')
        .notEmpty().isString().withMessage('please fill the correct name!'),

    body('profession')
        .notEmpty().isString().withMessage('please fill the correct profession!'),

    body('experience')
        .notEmpty().isString().withMessage('please fill the correct experience!'),

    body('address')
        .notEmpty().isString().withMessage('please fill the correct address!'),

    body('education')
        .notEmpty().isString().withMessage('please fill the correct education!'),

    body('phoneNo')
        .notEmpty().isString().trim().isLength({ min: 10, max: 10 }).withMessage('please fill the correct phoneNo!'),

    body('whatsUpNo')
        .optional({ checkFalsy: true }).trim().isLength({ min: 10, max: 10 }).isString().withMessage('please fill the correct whatsUpNo!'),

    body('longitude')
        .optional({ checkFalsy: true }).isFloat({ min: -180, max: 180 }).withMessage('please fill the correct longitude!'),

    body('latitude')
        .optional({ checkFalsy: true }).isFloat({ min: -90, max: 90 }).withMessage('please fill the correct latitude!'),
]

const validateUserProfileInfo = [
    body('type').isString().notEmpty().withMessage('please fill the detail!'),
    body('lang').isArray().withMessage('lang must be an array'), // Validate 'lang' as an array
    body('lang.*').isObject().withMessage('Each element in lang must be an object'), // Validate each element is an object
    body('lang.*.*').notEmpty().withMessage('langCode field cannot be empty')
]

module.exports = {
    validateSignUp, validateOtp, validateLocation, validateUserProfile, validateDoctor, validateUserProfileInfo
}