import React from 'react'
import UserProfilePage from '../../components/user/userProfile/UserProfile'
import  UserNavbar from '../../components/user/Navbar/Navbar'
function Profile() {
  return (
    <div>
        <UserNavbar/>
        <UserProfilePage/>
    </div>
  )
}

export default Profile