const connectors = require('./connectors');

const User = require('./models/User');
const Apartment = require('./models/Apartment');

const resolvers = {
  Query: {
    users() {
      return connectors.User.getUsers()
        .then((users) => {
          return users.map((user) => {
            return {
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email
            };
          });
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
    apartments() {
      return connectors.Apartment.getApartments()
      .then((apartments) => {
        return apartments.map((apartment) => {
          return {
            id: apartment._id,
            description: apartment.description,
            type: apartment.type,
            rooms: apartment.rooms
          };
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
    }
  },
  Mutation: {
    signUp(root, args) {
      const errors = [];

      return connectors.Auth.signUp(args)
        .then(token => ({
          token,
          errors
        }))
        .catch((err) => {
          if (err.code && err.message) {
            errors.push({
              key: err.code,
              value: err.message
            });
            return { token: null, errors };
          }

          throw new Error(err);
        });
    },
    signIn(root, args) {
      const errors = [];

      return connectors.Auth.signIn(args)
        .then(token => ({
          token,
          errors
        }))
        .catch((err) => {
          if (err.code && err.message) {
            errors.push({
              key: err.code,
              value: err.message
            });

            return { token: null, errors };
          }

          throw new Error(err);
        });
    }
  }
};

module.exports = resolvers;
