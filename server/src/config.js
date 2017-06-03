let host = 'localhost';
let port = 4000;
let refer = 'http://localhost:3000';

//For cloud9
if(process.env.NODE_ENV === 'cloud9') {
  host = 'https://apartments-uramen.c9users.io';
  port = 8081;
  refer = host;
}

export const
  server = {
    host,
    port,
    refer
  },

  database = {
    uri: 'mongodb://uramen:qwertyura@ds137101.mlab.com:37101/tenements'
  },

  auth = {
    secret: 'yura_krasaucheg',
    expiresIn: 86400 // expires in 24 hours
  };
