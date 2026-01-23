import React from 'react'

interface RightSidebarProps {
  children?: React.ReactNode
}

export function RightSidebar({ children }: RightSidebarProps) {
  return (
    <aside className='right-sidebar'>
      {children || (
        <div className='sidebar-content'>
          <div className='placeholder'>
            <p>选择会话后显示相关代码</p>
          </div>
        </div>
      )}
    </aside>
  )
}
