const {model, Schema} = require('mongoose');

const warehouseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
},
{timestamps: true},
);

module.exports = model('Warehouse', warehouseSchema);