const {roles} = require('../../middlwear/auth')
const endPoint = {
    createPost : [roles.Admin,roles.User]
}
module.exports = endPoint