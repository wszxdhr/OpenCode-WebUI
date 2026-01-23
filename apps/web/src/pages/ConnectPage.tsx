import React, { useState, FormEvent } from 'react'
import { createHealthClient } from '../services/healthClient'
import type { ConnectionError } from '@sysui/shared'

interface ConnectPageProps {
  onConnect: (serverUrl: string) => void
  connectionError: ConnectionError | null
}

export function ConnectPage({ onConnect, connectionError }: ConnectPageProps) {
  const [serverUrl, setServerUrl] = useState('http://localhost:4096')
  const [isConnecting, setIsConnecting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsConnecting(true)

    try {
      const healthClient = createHealthClient()
      await healthClient.checkHealth(serverUrl)
      onConnect(serverUrl)
    } catch (error) {
      console.error('Health check failed:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className='connect-page'>
      <div className='connect-container'>
        <h1>OpenCode WebUI</h1>
        <p>连接到 OpenCode Server</p>

        <form onSubmit={handleSubmit} className='connect-form'>
          <div className='form-group'>
            <label htmlFor='serverUrl'>服务器地址</label>
            <input
              id='serverUrl'
              type='url'
              value={serverUrl}
              onChange={(e) => setServerUrl(e.target.value)}
              placeholder='http://localhost:4096'
              disabled={isConnecting}
              required
            />
          </div>

          <button type='submit' disabled={isConnecting}>
            {isConnecting ? '连接中...' : '连接'}
          </button>
        </form>

        {connectionError && (
          <div className='error-message'>
            <strong>连接失败</strong>
            <p>{connectionError.message}</p>
            <p>请检查服务器地址是否正确，并确保服务器正在运行。</p>
          </div>
        )}
      </div>
    </div>
  )
}
