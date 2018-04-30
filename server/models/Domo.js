const mongoose = require('mongoose');
const textSearch = require('mongoose-text-search');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let DomoModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const DomoSchema = new mongoose.Schema({
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
    required: false,
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

DomoSchema.plugin(textSearch);

DomoSchema.index({ name: 'text',text: 'text' });


DomoSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  text: doc.text,
  relate: doc.relate,
});

DomoSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };
  return DomoModel.find(search).select('name text relate').exec(callback);
};

DomoSchema.statics.removeDomo = (dname, dtext, callback) => {
  const search = {
    name: dname,
    text: dtext,
  };
  return DomoModel.remove(search).exec(callback);
};

DomoSchema.statics.getAllCollection = (callback) =>
DomoModel.find().select('name text relate').exec(callback);
    /*
  const collections = mongoose.connections[0].collections;
  //console.log(collections);
  console.log(collections.accounts.collection.s.db);

  const names = [];

  Object.keys(collections).forEach((k) => {
    names.push(k);
  });

  // console.log(names);
  return names;
  */

DomoSchema.statics.searchQuery = (word, callback) => {
const search = {
    $text: {$search: word}
}
//console.log(DomoModel.find(search));
return DomoModel.find(search).exec(callback);
};


DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;
