const typeDefs = [/* GraphQL */`
  # Error type.
  type Error {
    key: String
    value: String
  }

  # Auth type.
  type Auth {
    token: String
    errors: [Error]
  }

  # User type.
  type User {
    id: String!
    firstName: String!
    lastName: String!
    email: String!
  }

  #Apartment type
  type Apartment {
    id: String!
    title: String!
    description: String!
    type: String!
    rooms: Int!
    price: Int!
    number: String!
    images: [String]!
    vk_profile: String
    createdAt: String
  }

  # Query type.
  type Query {
    # Fetch a list of users.
    users: [User]!
    apartments: [Apartment!]
  }

  type Mutation {
    # Sign up.
    signUp(firstName: String!, lastName: String!, email: String!, password: String!): Auth

    # Sign in.
    signIn(email: String!, password: String!): Auth
  }

  schema {
    query: Query
    mutation: Mutation
  }
`];

export default typeDefs;
