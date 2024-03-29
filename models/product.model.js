const mongoose = require( 'mongoose' )
const { Schema } = mongoose

const productSchema = new Schema( {
  name: String,
  description: String,
  imageUrl: String,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand'
  },
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country'
  },
}, {
  timestamps: true
} )
productSchema.set( 'toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function ( doc, ret, options )
  {
    ret.idProduct = ret._id
    delete ret.id
    delete ret._id
    delete ret.__v
  }
} )
module.exports = mongoose.model( 'Product', productSchema )