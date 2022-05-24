import React, {useState} from 'react'
import EditProfileForm from '../../components/editProfileForm/EditProfileForm'
import "./profileedit.scss"

function ProfileEdit() {
  // const [file, setFile] = useState<any>(null)
  return (
      <div className="profileEditContainer">
          <EditProfileForm/>

      </div>
  )
}

export default ProfileEdit