import React, { useState } from 'react'
import EditProfileForm from '../../components/editProfileForm/EditProfileForm'
import "./profileedit.scss"
import MediaQuery from "react-responsive";

function ProfileEdit() {
  // const [file, setFile] = useState<any>(null)

  return (
    <>
      <MediaQuery query="(min-width: 768px)">
        <div className="profileEditContainer">
          <EditProfileForm isMobile={false} />

        </div>

      </MediaQuery>

      <MediaQuery query="(max-width: 767px)">
        <div className="profileEditContainer">
          <EditProfileForm isMobile={true} />

        </div>

      </MediaQuery>
    </>
  )
}

export default ProfileEdit