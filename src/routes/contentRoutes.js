import { Router } from 'express'
import { createContent, listContents, getContent, updateContent, deleteContent, updateStatus } from '../controllers/contentController.js'
import { contentCreateRules, contentUpdateRules } from '../validators/contentValidators.js'

const router = Router()

router.post('/', contentCreateRules, createContent)
router.get('/', listContents)
router.get('/:id', getContent)
router.put('/:id', contentUpdateRules, updateContent)
router.patch('/:id/status', updateStatus)
router.delete('/:id', deleteContent)

export default router
