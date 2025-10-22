import { body } from 'express-validator'

export const contentCreateRules = [
  body('title')
    .isString().withMessage('Title must be a string')
    .isLength({ min: 3, max: 120 }).withMessage('Title must be 3-120 chars'),
  body('date')
    .optional({ checkFalsy: true })
    .isISO8601().withMessage('Date must be ISO-8601 (YYYY-MM-DD)'),
  body('category')
    .isIn(['news', 'released', 'educational']).withMessage('Invalid category'),
  body('imageUrl')
    .optional({ checkFalsy: true })
    .isURL().withMessage('imageUrl must be a valid URL'),
  body('linkUrl')
    .optional({ checkFalsy: true })
    .isURL().withMessage('linkUrl must be a valid URL'),
  body('status')
    .optional({ checkFalsy: true })
    .isIn(['publish', 'unpublish']).withMessage('Invalid status')
]

export const contentUpdateRules = [
  body('title')
    .optional()
    .isString().withMessage('Title must be a string')
    .isLength({ min: 3, max: 120 }).withMessage('Title must be 3-120 chars'),
  body('date')
    .optional({ checkFalsy: true })
    .isISO8601().withMessage('Date must be ISO-8601'),
  body('category')
    .optional()
    .isIn(['news', 'released', 'educational']).withMessage('Invalid category'),
  body('imageUrl')
    .optional({ checkFalsy: true })
    .isURL().withMessage('imageUrl must be a valid URL'),
  body('linkUrl')
    .optional({ checkFalsy: true })
    .isURL().withMessage('linkUrl must be a valid URL'),
  body('status')
    .optional()
    .isIn(['publish', 'unpublish']).withMessage('Invalid status')
]
