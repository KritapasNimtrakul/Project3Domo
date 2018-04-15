const models = require('../models');

const Data = models.uData;

const makerPage = (req, res) => {
  Data.uDataModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.render('preview', { csrfToken: req.csrfToken(), uDatas: docs });
  });
};

const makeuData = (req, res) => {
  if (!req.body.name || !req.body.text || !req.body.relate) {
    return res.status(400).json({ error: 'All field require' });
  }

  const uData = {
    name: req.body.name,
    text: req.body.text,
    relate: req.body.relate,
    owner: req.session.account._id,
  };

  const newuData = new Data.DataModel(uData);

  const uDataPromise = newuData.save();

  uDataPromise.then(() => res.json({ redirect: '/makerdata' }));

  uDataPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'uData already exists.' });
    }

    return res.status(400).json({ error: 'An error occured.' });
  });
  return uDataPromise;
};

const getuDatas = (request, response) => {
  const req = request;
  const res = response;

  return Data.uDataModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    console.log(docs);
    return res.json({ uDatas: docs });
  });
};

const deleteuDatas = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: 'RAWR! IDK' });
  }
  console.log(req.body.id);

  const uDataPromise = Data.uDataModel.removeuData(req.body.id);

  uDataPromise.then(() => res.json({ redirect: '/makerdata' }));

  uDataPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'uData does not exists.' });
    }

    return res.status(400).json({ error: 'An error occured.' });
  });
  return uDataPromise;
};

module.exports.makerPage = makerPage;
module.exports.getuDatas = getuDatas;
module.exports.make = makeuData;
module.exports.deleteuDatas = deleteuDatas;
