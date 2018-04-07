const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let uDataModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const uDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  relate: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdData: {
    type: Date,
    default: Date.now,
  },
});

uDataSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  text: doc.text,
  relate: doc.relate,
});

uDataSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };
  return uDataModel.find(search).select('name text relate').exec(callback);
};

uDataSchema.statics.removeDomo = (id, callback) => {
  const search = {
    _id: id,
  };
  return uDataModel.remove(search).exec(callback);
};

uDataModel = mongoose.model('uData', uDataSchema);

module.exports.uDataModel = uDataModel;
module.exports.uDataSchema = uDataSchema;
