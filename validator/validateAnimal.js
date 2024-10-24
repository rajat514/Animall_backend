const { body } = require("express-validator")


const validateAnimalCategory = [
    // body('name')
    //     .notEmpty().trim().withMessage('please fill the detail!'),

    body('gender')
        .isString().optional({ nullable: true }).withMessage('please fill the detail!'),

    body('isSubCategoryGender')
        .optional({ nullable: true }).isBoolean().withMessage('please fill the detail!'),
    body('lang').isArray().withMessage('lang must be an array'), // Validate 'lang' as an array
    body('lang.*').isObject().withMessage('Each element in lang must be an object'), // Validate each element is an object
    body('lang.*.*').notEmpty().withMessage('langCode field cannot be empty')
    // body('langCode')
    //     .isString().withMessage('please fill the detail!'),

    // body('lang')
    //     .isString().withMessage('please fill the detail!'),
]

const validateAnimalBreed = [
    // body('name')
    //     .notEmpty().trim().withMessage('please fill the detail!'),

    body('gender')
        .isString().optional({ nullable: true }).withMessage('please fill the detail!'),

    body('animalCategoryId')
        .optional({ nullable: true }).isString().withMessage('please fill the detail!'),
    body('lang').isArray().withMessage('lang must be an array'), // Validate 'lang' as an array
    body('lang.*').isObject().withMessage('Each element in lang must be an object'), // Validate each element is an object
    body('lang.*.*').notEmpty().withMessage('langCode field cannot be empty')
]

const validateAnimalOptionalData = [
    body('type').isString().notEmpty().withMessage('please fill the detail!'),
    body('lang').isArray().withMessage('lang must be an array'), // Validate 'lang' as an array
    body('lang.*').isObject().withMessage('Each element in lang must be an object'), // Validate each element is an object
    body('lang.*.*').notEmpty().withMessage('langCode field cannot be empty')
]

const validateSellAnimal = [
    body('animalId')
        .notEmpty().isString().withMessage('please fill the detail!'),

    body('breedId')
        .notEmpty().isString().withMessage('please fill the detail!'),

    body('lactation')
        .optional({ nullable: true }).isString().withMessage('please fill the detail!'),

    body('currentMilk')
        .optional({ nullable: true }).isString().withMessage('please fill the detail!'),

    body('milkCapacity')
        .optional({ nullable: true }).isString().withMessage('please fill the detail!'),

    body('file_type_0')
        .isString().withMessage('please fill the detail!'),

    body('file_type_1')
        .isString().withMessage('please fill the detail!'),

    body('price')
        .notEmpty().isString().withMessage('please fill the detail!'),

    body('isNegotiable')
        .optional({ nullable: true }).isBoolean().withMessage('please fill the detail!'),

    body('isPrime')
        .optional({ nullable: true }).isBoolean().withMessage('please fill the detail!'),

    body('animalBaby')
        .optional({ nullable: true }).isString().withMessage('please fill the detail!'),

    body('pregnent')
        .optional({ nullable: true }).isString().withMessage('please fill the detail!'),

    body('calfGender')
        .optional({ nullable: true }).isString().withMessage('please fill the detail!'),

    body('info')
        .optional({ nullable: true }).isString().isLength({ max: 100 }).trim().withMessage('please fill the detail!'),

    // body('longitude')
    //     .optional({ nullable: true }).isNumeric().trim().withMessage('please fill the detail!'),

    // body('latitude')
    //     .optional({ nullable: true }).isNumeric().trim().withMessage('please fill the detail!'),

]


module.exports = {
    validateAnimalCategory, validateAnimalBreed, validateSellAnimal, validateAnimalOptionalData
}