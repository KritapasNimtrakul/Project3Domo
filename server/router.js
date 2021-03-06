const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getDomos', mid.requiresLogin, controllers.Domo.getDomos);
  app.post('/deleteDomo', mid.requiresLogin, controllers.Domo.deleteDomos);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Domo.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Domo.make);

  app.post('/changePass', mid.requiresLogin, controllers.Account.changePass);

  app.get('/getExplore', mid.requiresSecure, mid.requiresLogout, controllers.Domo.getAll);
  app.get('/loginExplore', mid.requiresLogin, controllers.Domo.getAll);
  app.get('/explore', mid.requiresLogin, controllers.Domo.makerPage);
  app.post('/explore', mid.requiresLogin, controllers.Domo.make);
  app.get('/loginSearch', mid.requiresLogin, controllers.Domo.searchDomos);

  app.post('/search', mid.requiresLogin, controllers.Domo.searchDomos);
  app.post('/searchLogin', mid.requiresSecure, mid.requiresLogout, controllers.Domo.searchDomos);
  app.post('/read', mid.requiresSecure, mid.requiresLogout, controllers.Domo.readDomos);
  app.post('/readLogin', mid.requiresLogin, controllers.Domo.readDomos);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
