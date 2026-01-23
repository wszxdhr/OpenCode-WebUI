import React from 'react'

type TabId = 'projects' | 'sessions' | 'settings'

interface LeftNavProps {
  activeTab: TabId
  onTabChange: (tabId: TabId) => void
}

export function LeftNav({ activeTab, onTabChange }: LeftNavProps) {
  return (
    <nav className='left-nav'>
      <button
        className={`nav-tab ${activeTab === 'projects' ? 'active' : ''}`}
        onClick={() => onTabChange('projects')}
      >
        <span className='tab-icon'>📁</span>
        <span className='tab-label'>项目</span>
      </button>
      <button
        className={`nav-tab ${activeTab === 'sessions' ? 'active' : ''}`}
        onClick={() => onTabChange('sessions')}
      >
        <span className='tab-icon'>💬</span>
        <span className='tab-label'>会话</span>
      </button>
      <button
        className={`nav-tab ${activeTab === 'settings' ? 'active' : ''}`}
        onClick={() => onTabChange('settings')}
      >
        <span className='tab-icon'>⚙️</span>
        <span className='tab-label'>设置</span>
      </button>
    </nav>
  )
}
