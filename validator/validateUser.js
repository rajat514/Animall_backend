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
        .optional({ nullable: true }).trim().isNumeric().withMessage('please fill the correct detail!'),

    body('latitude')
        .optional({ nullable: true }).trim().isNumeric().withMessage('please fill the correct datail!'),
]

const validateUserProfile = [
    body('name')
        .isString().trim().optional({ nullable: true }).withMessage('please fill the correct datail!'),

    body('languages')
        .isString().optional({ nullable: true }).withMessage('please fill the correct datail!'),

    body('address')
        .isString().trim().optional({ nullable: true }).withMessage('please fill the correct datail!'),

    body('whatsUpNumber')
        .isNumeric().trim().optional({ nullable: true }).withMessage('please fill the correct datail!'),

    body('birthday')
        .isDate().optional({ nullable: true }).withMessage('please fill the correct datail!'),

    body('numberOfAnimal')
        .isString().optional({ nullable: true }).withMessage('please fill the correct datail!'),

    body('work')
        .isString().optional({ nullable: true }).withMessage('please fill the correct datail!'),

    body('howManyYearsOfAnimalHusbandry')
        .isString().optional({ nullable: true }).withMessage('please fill the correct datail!'),

    body('photwhyDoYouUseTheAppo')
        .isString().optional({ nullable: true }).withMessage('please fill the correct datail!'),

    body('educationLevel')
        .isString().optional({ nullable: true }).withMessage('please fill the correct datail!'),

    body('longitude')
        .optional({ nullable: true }).trim().isNumeric().withMessage('please fill the correct detail!'),

    body('latitude')
        .optional({ nullable: true }).trim().isNumeric().withMessage('please fill the correct datail!'),
]


const validateDoctor = [
    body('name')
        .notEmpty().isString().withMessage('please fill the correct datail!'),

    body('profession')
        .notEmpty().isString().withMessage('please fill the correct datail!'),

    body('experience')
        .notEmpty().isString().withMessage('please fill the correct datail!'),

    body('address')
        .notEmpty().isString().withMessage('please fill the correct datail!'),

    body('longitude')
        .optional({ nullable: true }).trim().isNumeric().withMessage('please fill the correct detail!'),

    body('latitude')
        .optional({ nullable: true }).trim().isNumeric().withMessage('please fill the correct datail!'),
]

module.exports = {
    validateSignUp, validateOtp, validateLocation, validateUserProfile, validateDoctor
}