const Admin = require('../model/adminModel')
const jwt = require('jsonwebtoken')
const helpers = require('../helpers/adminHelper')

const authAdmin = async (req,res,next) =>{
    let token;
    if( req.headers.authorization){

        try {
            token=req.headers.authorization
          
            const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
          
            req.user=await helpers.findAdminById(decoded.adminId)
            next()

        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    }
    if(!token){
        return res.status(400).json({msg:"Invalid authentication."})
    }

}

module.exports = {
    authAdmin
}