import React from 'react'

interface EmptyStateProps {
  title?: string
  description?: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className='empty-state'>
      <div className='empty-state-icon'>📭</div>
      <h2 className='empty-state-title'>{title || '暂无内容'}</h2>
      {description && <p className='empty-state-description'>{description}</p>}
    </div>
  )
}
