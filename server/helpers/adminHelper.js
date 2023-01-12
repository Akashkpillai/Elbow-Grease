
const Admin = require('../model/adminModel')

module.exports = {
    findAdminById : (userId) =>{
        return new Promise(async(resolve, reject)=>{
            try {
                const user = Admin.findOne({_id:userId})
                resolve(user)
            } catch (error) {
                reject
            }
        })
    },
    

}