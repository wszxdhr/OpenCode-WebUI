import React from 'react'
import { SessionList } from './SessionList'
import type { Project } from '@sysui/shared'

interface LeftSidebarProps {
  projects: Project[]
  selectedSessionId: string | null
  onSelectSession: (sessionId: string) => void
}

export function LeftSidebar({
  projects,
  selectedSessionId,
  onSelectSession
}: LeftSidebarProps) {
  return (
    <aside className='left-sidebar'>
      <div className='sidebar-header'>
        <h2>会话</h2>
      </div>

      <div className='sidebar-content'>
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
      </div>
    </aside>
  )
}
