import connectors from './connectors';

import User from './models/User';
import Apartment from './models/Apartment';

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
            title: apartment.title,
            description: apartment.description,
            type: apartment.type,
            rooms: apartment.rooms,
            price: apartment.price,
            number: apartment.number,
            street: apartment.street,
            vk_profile: apartment.vk_profile,
            images: apartment.images,
            createdAt: apartment.createdAt
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

export default resolvers;
