const mongoose = require( 'mongoose' )
const { Schema } = mongoose

const materialSchema = new Schema( {
  name: String,
  description: String,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country'
  },
}, {
  timestamps: true
} )

materialSchema.set( 'toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function ( doc, ret, options )
  {
    ret.idBrand = ret._id
    delete ret.id
    delete ret._id
    delete ret.__v
  }
} )
module.exports = mongoose.model( 'Brand', materialSchema )