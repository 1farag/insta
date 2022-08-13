const Joi = require("joi");

const displayProfile = {
    headers: Joi.object().required().keys({
        authorization:Joi.string().required()
    }).options({allowUnknown:true})
}
module.exports = {displayProfile}