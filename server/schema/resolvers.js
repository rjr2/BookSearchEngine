const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }
      throw new AuthenticationError("Not Logged In");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
        const user = User.create(args)
        console.log(user);
        const token = signToken(user);
        console.log(token);
        return {user, token};
    },
    
  },
};
module.exports = resolvers;
