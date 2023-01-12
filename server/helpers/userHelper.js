const { rejects } = require('assert')
const { resolve } = require('path')
const bycrypt = require('bcrypt')
const User = require('../model/userModel')


exports.userSignin = async (userdata)=>{
    const hashedpassword = await bycrypt.hash(userdata.pwd, 12)
    let validation = {userTrue:false , existingUser : false}
       return new Promise (async(resolve,reject)=>{
        let user = await User.findOne({email:userdata.email})
        if(!user){
            const UserData = new User({
                name:userdata.user,
                email:userdata.email,
                password:hashedpassword,
                phone:userdata.phone,
                blockStatus:false

            })
            console.log(UserData)
            UserData.save()
            
            .then((res)=>{
                resolve({status:'ok'})
                console.log(res)

            }).catch((err)=>{
                console.log(err)
                reject(err)
            })
        }else{
            validation.existingUser = true
            resolve(validation)
            console.log('User alredy exist')
        }

    })
}


