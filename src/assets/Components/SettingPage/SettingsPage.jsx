import React from 'react'
import BottomNav from './SettingsNav'
import SettingsMainSection from './SettingsMainSection'
import SettingsHeader from './SettingsHeader'

export default function SettingsPage() {
  return (
    <div className='max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24'>
        <SettingsHeader></SettingsHeader>
        <SettingsMainSection></SettingsMainSection>
        <BottomNav></BottomNav>
    </div>
  )
}
