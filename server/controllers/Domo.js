const models = require('../models');

const Domo = models.Domo;

const makerPage = (req, res) => {
  Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), domos: docs });
  });
};

const makeDomo = (req, res) => {
  if (!req.body.name || !req.body.text) {
    return res.status(400).json({ error: 'All field require' });
  }
  console.log(req.body);

  const domoData = {
    name: req.body.name,
    text: req.body.text,
    relate: req.body.relate,
    owner: req.session.account._id,
  };

  const newDomo = new Domo.DomoModel(domoData);

  const domoPromise = newDomo.save();

  domoPromise.then(() => res.json({ redirect: '/explore' }));

  domoPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists.' });
    }

    return res.status(400).json({ error: 'An error occured.1' });
  });
  return domoPromise;
};

const getDomos = (request, response) => {
  const req = request;
  const res = response;

  return Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    console.log(docs);
    return res.json({ domos: docs });
  });
};
const getAll = (request, response) => {
  const req = request;
  const res = response;

  return Domo.DomoModel.getAllCollection((err,docs) => {
          if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    console.log(docs);
    return res.json({ domos: docs });
  })
};

const deleteDomos = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: 'RAWR! IDK' });
  }
  console.log(req.body.name, req.body.text);

  const domoPromise = Domo.DomoModel.removeDomo(req.body.name, req.body.text);

  domoPromise.then(() => res.json({ redirect: '/explore' }));

  domoPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Domo does not exists.' });
    }

    return res.status(400).json({ error: 'An error occured.' });
  });
  return domoPromise;
};

module.exports.makerPage = makerPage;
module.exports.getDomos = getDomos;
module.exports.make = makeDomo;
module.exports.deleteDomos = deleteDomos;
module.exports.getAll = getAll;
