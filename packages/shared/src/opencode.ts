import type {
  Session,
  MessageEnvelope,
  SendMessageRequest
} from './contracts.js'

export type { Session, MessageEnvelope, SendMessageRequest }

export interface ServerConnection {
  id: string
  serverUrl: string
  protocol: 'http' | 'https'
  status: 'disconnected' | 'connecting' | 'connected' | 'error'
  lastError?: string
  transport: 'http' | 'ws' | 'both'
}

export interface Project {
  id: string
  name: string
  sessions: SessionSummary[]
}

export interface SessionSummary {
  id: string
  title: string
  updatedAt: string
  preview?: string
}

export interface Message {
  id: string
  sessionId: string
  sender: 'user' | 'assistant' | 'system'
  content: string
  createdAt: string
  order: number
}

export type ConnectionError =
  | { type: 'invalid_url'; message: string }
  | { type: 'unreachable'; message: string }
  | { type: 'server_error'; message: string; code?: number }
