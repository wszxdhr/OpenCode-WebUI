import React from 'react'
import { SessionList } from './SessionList'
import { LeftNav } from './LeftNav'
import type { Project } from '@sysui/shared'

type TabId = 'projects' | 'sessions' | 'settings'

interface LeftSidebarProps {
  projects: Project[]
  selectedSessionId: string | null
  onSelectSession: (sessionId: string) => void
  activeTab: TabId
  onTabChange: (tabId: TabId) => void
}

function EmptyState({
  title,
  description
}: {
  title: string
  description: string
}) {
  return (
    <div className='empty-state'>
      <h3 className='empty-title'>{title}</h3>
      <p className='empty-description'>{description}</p>
    </div>
  )
}

export function LeftSidebar({
  projects,
  selectedSessionId,
  onSelectSession,
  activeTab,
  onTabChange
}: LeftSidebarProps) {
  return (
    <aside className='left-sidebar'>
      <LeftNav activeTab={activeTab} onTabChange={onTabChange} />

      <div className='sidebar-content'>
        {activeTab === 'sessions' && (
          <>
            {projects.map((project) => (
              <div key={project.id} className='project-group'>
                <h3 className='project-name'>{project.name}</h3>
                <SessionList
                  sessions={project.sessions}
                  selectedSessionId={selectedSessionId}
                  onSelectSession={onSelectSession}
                />
              </div>
            ))}
          </>
        )}

        {activeTab === 'projects' && (
          <EmptyState title='项目列表' description='暂无项目' />
        )}

        {activeTab === 'settings' && (
          <EmptyState title='设置' description='暂无设置' />
        )}
      </div>
    </aside>
  )
}
