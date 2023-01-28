const jwt = require('jsonwebtoken')
const helpers = require('../helpers/adminHelper');
const Expert = require('../model/expertModal');

const authExpert = async (req, res, next) => {
    let token;
    if (req.headers.authorization) {
        try {
            token = req.headers.authorization

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

            req.expert = await Expert.findOne({_id:decoded._id})

            next()

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
    if (! token) {
        return res.status(400).json({msg: "Invalid authentication."})
    }
}

module.exports = {
    authExpert
}
