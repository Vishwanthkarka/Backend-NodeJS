import React from 'react'
import   {useSelector} from'react-redux'
function UserDashboard() {
    let {userObj} = useSelector(state => state.user)
  return (
    <div>UserDashboard
        <img src={userObj.profileImg} width="50px" className='rounded float-end m-5 profile-pic'/>
        <h1>Hello</h1>
    </div>
  )
}

export default UserDashboard