import React from 'react'
import SettingsMainSection from '../assets/Components/SettingPage/SettingsMainSection'
import Header from '../assets/Components/Common/Header'

export default function Settings() {
  return (
   <div className='max-w-[380px] mx-auto w-full pb-24'>
         <Header title="Settings" backTo="/"></Header>
          <SettingsMainSection></SettingsMainSection>
          {/* <BottomNav></BottomNav> */}
      </div>
  )
}
