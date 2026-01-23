import React, { useState, useEffect } from 'react'
import { ConnectPage } from './pages/ConnectPage'
import { LeftSidebar } from './components/LeftSidebar'
import { RightSidebar } from './components/RightSidebar'
import { MessageList } from './components/MessageList'
import { MessageInput } from './components/MessageInput'
import { EmptyState } from './components/EmptyState'
import { MainLayout } from './layout/MainLayout'
import { useSessionStore } from './store/sessionStore'
import { createOpenCodeClient } from './services/opencodeClient'
import './styles/layout.css'

function App() {
  const client = createOpenCodeClient()
  const {
    connection,
    projects,
    selectedSessionId,
    messages,
    isMessagesLoading,
    connectionError,
    connect,
    disconnect,
    setSelectedSessionId,
    fetchMessages,
    sendMessage
  } = useSessionStore(client)

  const [activeTab, setActiveTab] = useState<
    'projects' | 'sessions' | 'settings'
  >('sessions')

  const handleConnect = (serverUrl: string) => {
    connect(serverUrl)
  }

  const handleDisconnect = () => {
    disconnect()
  }

  const handleSendMessage = async (content: string) => {
    if (!selectedSessionId) {
      return
    }
    await sendMessage(selectedSessionId, content)
  }

  useEffect(() => {
    if (selectedSessionId) {
      fetchMessages(selectedSessionId)
    }
  }, [selectedSessionId, fetchMessages])

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

      <MainLayout
        leftSidebarContent={
          <LeftSidebar
            projects={projects}
            selectedSessionId={selectedSessionId}
            onSelectSession={setSelectedSessionId}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        }
        mainContent={
          selectedSessionId ? (
            <div className='session-view'>
              <MessageList messages={messages} isLoading={isMessagesLoading} />
              <MessageInput
                onSendMessage={handleSendMessage}
                disabled={isMessagesLoading}
              />
            </div>
          ) : (
            <EmptyState
              title="选择一个会话开始"
              description="从左侧列表中选择会话来查看消息"
            />
          )
        }
        rightSidebarContent={
          selectedSessionId ? (
            <RightSidebar>
              <EmptyState
                title="代码视图"
                description="选择会话后显示相关代码文件"
              />
            </RightSidebar>
          ) : undefined
        }
      />
        }
        mainContent={
          selectedSessionId ? (
            <div className='session-view'>
              <p>会话内容占位: {selectedSessionId}</p>
            </div>
          ) : (
            <div className='empty-state'>
              <p>选择一个会话开始</p>
            </div>
          )
        }
        rightSidebarContent={<RightSidebar />}
      />
    </div>
  )
}

export default App
