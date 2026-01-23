import React, { useState } from 'react'

interface MessageInputProps {
  onSendMessage: (content: string) => void
  disabled?: boolean
}

export function MessageInput({ onSendMessage, disabled }: MessageInputProps) {
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim() && !disabled) {
      onSendMessage(content.trim())
      setContent('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='message-input'>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='输入消息...'
        disabled={disabled}
        rows={1}
      />
      <button type='submit' disabled={disabled || !content.trim()}>
        发送
      </button>
    </form>
  )
}
