const jwt = require('jsonwebtoken')

const {REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET, ACTIVATION_TOKEN_SECRET} = process.env
const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if (! token) {
            return res.status(400).json({msg: "Invalid authentication."})
        }
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(400).json({msg: "Invalid authentication."})
            }
            req.user = user
            // console.log('user',req.user);
            next();
        })
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

module.exports = auth
