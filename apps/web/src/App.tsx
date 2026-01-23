import React, { useState } from 'react'
import { ConnectPage } from './pages/ConnectPage'
import { LeftSidebar } from './components/LeftSidebar'
import { useSessionStore } from './store/sessionStore'
import { createOpenCodeClient } from './services/opencodeClient'

function App() {
  const client = createOpenCodeClient()
  const {
    connection,
    projects,
    selectedSessionId,
    connectionError,
    connect,
    disconnect,
    setSelectedSessionId
  } = useSessionStore(client)

  const handleConnect = (serverUrl: string) => {
    connect(serverUrl)
  }

  const handleDisconnect = () => {
    disconnect()
  }

  if (
    !connection ||
    connection.status === 'disconnected' ||
    connection.status === 'error'
  ) {
    return (
      <div className='app'>
        <ConnectPage
          onConnect={handleConnect}
          connectionError={connectionError}
        />
      </div>
    )
  }

  if (connection.status === 'connecting') {
    return (
      <div className='app'>
        <div className='loading-screen'>
          <p>正在连接到服务器...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>OpenCode WebUI</h1>
        <button onClick={handleDisconnect}>断开连接</button>
      </header>

      <div className='app-layout'>
        <LeftSidebar
          projects={projects}
          selectedSessionId={selectedSessionId}
          onSelectSession={setSelectedSessionId}
        />

        <main className='main-content'>
          {selectedSessionId ? (
            <div className='session-view'>
              <p>会话内容占位: {selectedSessionId}</p>
            </div>
          ) : (
            <div className='empty-state'>
              <p>选择一个会话开始</p>
            </div>
          )}
        </main>

        <aside className='right-sidebar'>
          <p>代码视图占位</p>
        </aside>
      </div>
    </div>
  )
}

export default App
