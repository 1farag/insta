const {roles} = require('../../middlwear/auth')
const endPoint = {
    displayprofile : [roles.Admin,roles.HR,roles.User]
}
module.exports = endPoint