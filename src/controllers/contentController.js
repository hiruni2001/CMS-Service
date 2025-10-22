import Content from '../models/Content.js'
import { validationResult } from 'express-validator'

export const createContent = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const content = await Content.create(req.body)
    res.status(201).json(content)
  } catch (err) { next(err) }
}

export const listContents = async (req, res, next) => {
  try {
    const { status, q, category } = req.query
    const filter = {}
    if (status) filter.status = status
    if (category) filter.category = category
    if (q) filter.title = { $regex: q, $options: 'i' }
    const items = await Content.find(filter).sort({ createdAt: -1 })
    res.json(items)
  } catch (err) { next(err) }
}

export const getContent = async (req, res, next) => {
  try {
    const item = await Content.findById(req.params.id)
    if (!item) return res.status(404).json({ error: 'Not found' })
    res.json(item)
  } catch (err) { next(err) }
}

export const updateContent = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const item = await Content.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!item) return res.status(404).json({ error: 'Not found' })
    res.json(item)
  } catch (err) { next(err) }
}

export const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body
    if (!['publish', 'unpublish'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' })
    }
    const item = await Content.findByIdAndUpdate(req.params.id, { status }, { new: true })
    if (!item) return res.status(404).json({ error: 'Not found' })
    res.json(item)
  } catch (err) { next(err) }
}

export const deleteContent = async (req, res, next) => {
  try {
    const item = await Content.findByIdAndDelete(req.params.id)
    if (!item) return res.status(404).json({ error: 'Not found' })
    res.json({ ok: true })
  } catch (err) { next(err) }
}
