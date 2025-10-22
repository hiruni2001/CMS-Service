import mongoose from 'mongoose'

const ContentSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3, maxlength: 120, trim: true },
  date: { type: Date, required: true, default: Date.now },
  category: { type: String, enum: ['news', 'released', 'educational'], required: true },
  imageUrl: { type: String, default: '' },
  linkUrl: { type: String, default: '' },
  status: { type: String, enum: ['publish', 'unpublish'], default: 'unpublish' }
}, { timestamps: true })

export default mongoose.model('Content', ContentSchema)
