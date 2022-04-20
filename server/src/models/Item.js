const {model, Schema} = require('mongoose');

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  warehouse: {
    type: String,
    required: true,
  },
  incoming: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  }
},
{timestamps: true},
);

module.exports = model('Item', itemSchema);