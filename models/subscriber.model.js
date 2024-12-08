const mongoose = require( 'mongoose' )
const { Schema } = mongoose

const materialSchema = new Schema( {
  email: String,
  notes: String,
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