const User = require('../model/userModel')
const Admin = require('../model/adminModel')
const Expert = require('../model/expertModal')

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
    findUserById : (userId) =>{
        return new Promise(async(resolve, reject)=>{
            try {
                const user = User.findOne({_id:userId})
                resolve(user)
            } catch (error) {
                reject
            }
        })
    },
    findExpertById : (userId) =>{
        return new Promise(async(resolve, reject)=>{
            try {
                const user = Expert.findOne({_id:userId})
                resolve(user)
            } catch (error) {
                reject
            }
        })
    },
    

}