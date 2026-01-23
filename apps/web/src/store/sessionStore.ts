import { useState, useCallback } from 'react'
import type {
  ServerConnection,
  Project,
  SessionSummary,
  ConnectionError
} from '@sysui/shared'
import type { OpenCodeClient } from './services/opencodeClient'

export function useSessionStore(client: OpenCodeClient) {
  const [connection, setConnection] = useState<ServerConnection | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  )
  const [connectionError, setConnectionError] =
    useState<ConnectionError | null>(null)

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
    setConnectionError(null)
  }, [client])

  return {
    connection,
    projects,
    selectedSessionId,
    connectionError,
    connect,
    disconnect,
    setSelectedSessionId
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
