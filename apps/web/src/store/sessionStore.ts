import { useState, useCallback } from 'react'
import type {
  ServerConnection,
  Project,
  SessionSummary,
  ConnectionError,
  Message
} from '../types/shared.d.ts'
import type { OpenCodeClient, MessageEnvelope } from './services/opencodeClient'

export function useSessionStore(client: OpenCodeClient) {
  const [connection, setConnection] = useState<ServerConnection | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  )
  const [connectionError, setConnectionError] =
    useState<ConnectionError | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isMessagesLoading, setIsMessagesLoading] = useState(false)

  const connect = useCallback(
    async (serverUrl: string) => {
      setConnectionError(null)
      setConnection({
        id: crypto.randomUUID(),
        serverUrl,
        protocol: serverUrl.startsWith('https') ? 'https' : 'http',
        status: 'connecting',
        transport: 'http'
      })

      try {
        await client.connect(serverUrl)
        const sessions = await client.getSessions()
        const groupedByProject = groupSessionsByProject(sessions)
        setProjects(groupedByProject)
        setConnection((prev) =>
          prev ? { ...prev, status: 'connected' } : null
        )
      } catch (error) {
        setConnectionError({
          type: 'server_error',
          message: error instanceof Error ? error.message : 'Unknown error'
        })
        setConnection((prev) => (prev ? { ...prev, status: 'error' } : null))
      }
    },
    [client]
  )

  const disconnect = useCallback(() => {
    client.disconnect()
    setConnection(null)
    setProjects([])
    setSelectedSessionId(null)
    setMessages([])
    setIsMessagesLoading(false)
    setConnectionError(null)
  }, [client])

  const fetchMessages = useCallback(
    async (sessionId: string) => {
      setIsMessagesLoading(true)
      try {
        const messageEnvelopes = await client.getMessages(sessionId)
        const messages: Message[] = messageEnvelopes.map((envelope) => ({
          id: envelope.info.id,
          sessionId: envelope.info.sessionID,
          sender:
            envelope.info.role === 'user'
              ? 'user'
              : envelope.info.role === 'assistant'
                ? 'assistant'
                : 'system',
          content: envelope.parts[0]?.text || '',
          createdAt: new Date(envelope.info.time.created * 1000).toISOString(),
          order: envelope.info.time.created
        }))
        setMessages(messages)
      } catch (error) {
        console.error('Failed to fetch messages:', error)
      } finally {
        setIsMessagesLoading(false)
      }
    },
    [client]
  )

  const sendMessage = useCallback(
    async (sessionId: string, content: string) => {
      try {
        await client.sendMessage(sessionId, {
          messageID: crypto.randomUUID(),
          providerID: 'default',
          modelID: 'default',
          mode: 'default',
          parts: [{ type: 'text', text: content }]
        })
      } catch (error) {
        console.error('Failed to send message:', error)
        throw error
      }
    },
    [client]
  )

  return {
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
  }
}

function groupSessionsByProject(
  sessions: { projectID?: string; title: string }[]
): Project[] {
  const projectMap = new Map<string, Project>()

  for (const session of sessions) {
    const projectId = session.projectID || 'default'
    let project = projectMap.get(projectId)

    if (!project) {
      project = {
        id: projectId,
        name: projectId === 'default' ? 'Default' : projectId,
        sessions: []
      }
      projectMap.set(projectId, project)
    }

    project.sessions.push({
      id: session.id,
      title: session.title,
      updatedAt: new Date().toISOString()
    })
  }

  return Array.from(projectMap.values())
}
