import React, { useRef } from 'react'
import SaveFooter from './UserProfileFooter'
import ProfilePage from './UserProfileSection'
import PageHeader from '../Common/Header'

export default function UserProfilePage() {

  const saveRef = useRef(null)

  const handleSave = () => {
    if (saveRef.current) {
      saveRef.current()
    }
  }

  return (
    <div className='max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24'>
      <PageHeader title="Profile" backTo="AUTO" />
      <ProfilePage onSaveRef={saveRef} />
      <SaveFooter onSave={handleSave} />
    </div>
  )
}