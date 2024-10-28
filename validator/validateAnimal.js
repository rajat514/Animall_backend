const { body } = require("express-validator")


const validateAnimalCategory = [
    // body('name')
    //     .notEmpty().trim().withMessage('please fill the detail!'),

    body('gender')
        .isString().optional({ checkFalsy: true }).withMessage('please fill the detail!'),

    body('isSubCategoryGender')
        .optional({ checkFalsy: true }).isBoolean().withMessage('please fill the detail!'),
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
        .isString().optional({ checkFalsy: true }).withMessage('please fill the detail!'),

    body('animalCategoryId')
        .optional({ checkFalsy: true }).isString().withMessage('please fill the detail!'),
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

    body('lactationId')
        .optional({ checkFalsy: true }).isString().withMessage('please fill the detail!'),

    body('currentMilk')
        .optional({ checkFalsy: true }).isString().withMessage('please fill the detail!'),

    body('milkCapacity')
        .optional({ checkFalsy: true }).isString().withMessage('please fill the detail!'),

    body('file_type_0')
        .isString().withMessage('please fill the detail!'),

    body('file_type_1')
        .isString().withMessage('please fill the detail!'),

    body('price')
        .notEmpty().isString().withMessage('please fill the detail!'),

    body('isNegotiable')
        .optional({ checkFalsy: true }).isBoolean().withMessage('please fill the detail!'),

    body('isPrime')
        .optional({ checkFalsy: true }).isBoolean().withMessage('please fill the detail!'),

    body('animalBabyId')
        .optional({ checkFalsy: true }).isString().withMessage('please fill the detail!'),

    body('pregnentId')
        .optional({ checkFalsy: true }).isString().withMessage('please fill the detail!'),

    body('calfGenderId')
        .optional({ checkFalsy: true }).isString().withMessage('please fill the detail!'),

    body('info')
        .optional({ checkFalsy: true }).isString().isLength({ max: 100 }).trim().withMessage('please fill the detail!'),

    // body('longitude')
    //     .optional({ checkFalsy: true }).isNumeric().trim().withMessage('please fill the detail!'),

    // body('latitude')
    //     .optional({ nullable: true }).isNumeric().trim().withMessage('please fill the detail!'),

]


module.exports = {
    validateAnimalCategory, validateAnimalBreed, validateSellAnimal, validateAnimalOptionalData
}