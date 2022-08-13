const { roles } = require("../../middlwear/auth");

const endPoint = {
    getAllUsers: [roles.Admin],
    changeRole: [roles.Admin],
    blockUser: [roles.Admin , roles.HR],


}

module.exports  = {
    endPoint
}