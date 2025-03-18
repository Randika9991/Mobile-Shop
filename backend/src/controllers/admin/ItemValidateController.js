const { body } = require('express-validator');

exports.validateItem = [
    body('date').notEmpty().withMessage('Date is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('imageUrl').isURL().withMessage('Image URL must be valid'),
    body('color').optional().isString(),
    body('ram').optional().isNumeric(),
    body('rom').optional().isNumeric(),
    body('processor').optional().isString(),
    body('operatingSystem').optional().isString(),
    body('battery').optional().isNumeric(),
    body('frontCamera').optional().isNumeric(),
    body('rearCamera').optional().isNumeric(),
    body('displaySize').optional().isNumeric(),
    body('warrenty').optional().isNumeric(),
    body('modelName').notEmpty().withMessage('Model Number is required'),
    body('modelNumber').optional().isString(),
    body('qty').optional().isNumeric()
];