import React from 'react'
import SaveFooter from './UserProfileFooter'
import ProfilePage from './UserProfileSection'
import ProfileHeader from './UserProfileHeader'

export default function UserProfilePage() {
  return (
    <div className='max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24'>
        <ProfileHeader></ProfileHeader>
        <ProfilePage></ProfilePage>
        <SaveFooter></SaveFooter>
    </div>
  )
}
