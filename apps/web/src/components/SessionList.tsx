import React from 'react'
import type { SessionSummary } from '@sysui/shared'

interface SessionListProps {
  sessions: SessionSummary[]
  onSelectSession: (sessionId: string) => void
  selectedSessionId: string | null
  isEmpty?: boolean
  isLoading?: boolean
}

export function SessionList({
  sessions,
  onSelectSession,
  selectedSessionId,
  isEmpty,
  isLoading
}: SessionListProps) {
  if (isLoading) {
    return (
      <div className='session-list loading'>
        <p>加载中...</p>
      </div>
    )
  }

  if (isEmpty || sessions.length === 0) {
    return (
      <div className='session-list empty'>
        <p>暂无会话</p>
      </div>
    )
  }

  return (
    <div className='session-list'>
      {sessions.map((session) => (
        <div
          key={session.id}
          className={`session-item ${selectedSessionId === session.id ? 'selected' : ''}`}
          onClick={() => onSelectSession(session.id)}
        >
          <div className='session-title'>{session.title}</div>
          {session.preview && (
            <div className='session-preview'>{session.preview}</div>
          )}
        </div>
      ))}
    </div>
  )
}
