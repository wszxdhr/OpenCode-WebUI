import React from 'react'
import type { Message } from '../types/shared.d.ts'

interface MessageListProps {
  messages: Message[]
  isLoading?: boolean
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  if (isLoading) {
    return (
      <div className='message-list loading'>
        <p>加载中...</p>
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className='message-list empty'>
        <p>暂无消息</p>
      </div>
    )
  }

  return (
    <div className='message-list'>
      {messages.map((message) => (
        <div key={message.id} className={`message-item ${message.sender}`}>
          <div className='message-sender'>
            {message.sender === 'user' && '用户'}
            {message.sender === 'assistant' && '助手'}
            {message.sender === 'system' && '系统'}
          </div>
          <div className='message-content'>{message.content}</div>
          <div className='message-time'>
            {new Date(message.createdAt).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  )
}
