const mongoose = require( 'mongoose' )
const { Schema } = mongoose

const countrySchema = new Schema( {
  name: String,
  description: String,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
}, {
  timestamps: true
} )

countrySchema.set( 'toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function ( doc, ret, options )
  {
    ret.idCountry = ret._id
    delete ret.id
    delete ret._id
    delete ret.__v
  }
} )

module.exports = mongoose.model( 'Country', countrySchema )