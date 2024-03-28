const mongoose = require( 'mongoose' )
const { Schema } = mongoose

const categorySchema = new Schema( {
  name: String,
  description: String,
}, {
  timestamps: true
} )

categorySchema.set( 'toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function ( doc, ret, options )
  {
    ret.idCategory = ret._id
    delete ret.id
    delete ret._id
    delete ret.__v
  }
} )

module.exports = mongoose.model( 'Category', categorySchema )