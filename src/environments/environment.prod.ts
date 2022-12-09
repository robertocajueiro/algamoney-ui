export const environment = {
  production: true,
  apiUrl: 'http://localhost:8080',
  //apiUrl: 'https://algamoneyui-robertocajueiro.netlify.app',
  //  tokenAllowedDomains: [ /algamoneyapi-robertocajueiro.herokuapp.com/ ],

  tokenAllowedDomains: [/localhost:8080/],
  tokenDisallowedRoutes: [/\/oauth\/token/],
};
