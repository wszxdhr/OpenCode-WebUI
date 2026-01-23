import React, { useState } from 'react'
import { LeftNav } from './LeftNav'
import { RightSidebar } from './RightSidebar'

interface MainLayoutProps {
  leftSidebarContent: React.ReactNode
  mainContent: React.ReactNode
  rightSidebarContent?: React.ReactNode
}

export function MainLayout({
  leftSidebarContent,
  mainContent,
  rightSidebarContent
}: MainLayoutProps) {
  const [leftCollapsed, setLeftCollapsed] = useState(false)
  const [rightCollapsed, setRightCollapsed] = useState(false)

  const toggleLeft = () => setLeftCollapsed((prev) => !prev)
  const toggleRight = () => setRightCollapsed((prev) => !prev)

  return (
    <div className='main-layout'>
      <aside className={`left-sidebar ${leftCollapsed ? 'collapsed' : ''}`}>
        {leftSidebarContent}
        <button className='collapse-button left' onClick={toggleLeft}>
          {leftCollapsed ? '›' : '‹'}
        </button>
      </aside>

      <main className='main-content'>{mainContent}</main>

      {rightSidebarContent && (
        <aside className={`right-sidebar ${rightCollapsed ? 'collapsed' : ''}`}>
          <button className='collapse-button right' onClick={toggleRight}>
            {rightCollapsed ? '‹' : '›'}
          </button>
          {rightSidebarContent}
        </aside>
      )}
    </div>
  )
}
