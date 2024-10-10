import { mergeResolvers } from '@graphql-tools/merge'
import userTypeDefs from './user.typeDef.js'
import transactionTypeDefs from './transaction.typeDef.js'

const mergedTypeDefs = [userTypeDefs, transactionTypeDefs];

export default mergedTypeDefs;
