import React from 'react'
import SettingsHeader from '../assets/Components/SettingPage/SettingsHeader'
import SettingsMainSection from '../assets/Components/SettingPage/SettingsMainSection'
import Header from '../assets/Components/Common/Header'

export default function Settings() {
  return (
   <div className='max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24'>
         <Header title="Settings"></Header>
          <SettingsMainSection></SettingsMainSection>
          {/* <BottomNav></BottomNav> */}
      </div>
  )
}
