Router.configure({
  layoutTemplate: 'basicLayout'
});

AccountsTemplates.configureRoute('signIn', {
  name: 'signin',
  path: '/login',
  layoutTemplate: 'login',
  redirect: '/',
});