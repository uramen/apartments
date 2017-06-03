let host = 'localhost';
let port = 4000;

//For cloud9
if(process.env.NODE_ENV === 'cloud9') {
  host = 'apartments-uramen.c9users.io';
  port = 8081;
}

export const
  server = {
    host: 'apartments-uramen.c9users.io',
    port: 8081
  },

  database = {
    uri: 'mongodb://uramen:qwertyura@ds137101.mlab.com:37101/tenements'
  },

  auth = {
    secret: 'yura_krasaucheg',
    expiresIn: 86400 // expires in 24 hours
  };
