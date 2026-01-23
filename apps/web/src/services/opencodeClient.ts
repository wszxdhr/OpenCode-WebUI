import type {
  Session,
  MessageEnvelope,
  SendMessageRequest
} from '../types/shared.d.ts'

export interface OpenCodeClient {
  connect(serverUrl: string): Promise<void>
  disconnect(): void
  getSessions(): Promise<Session[]>
  getMessages(sessionId: string): Promise<MessageEnvelope[]>
  sendMessage(
    sessionId: string,
    request: SendMessageRequest
  ): Promise<MessageEnvelope>
}

export class OpenCodeClientImpl implements OpenCodeClient {
  private serverUrl: string = ''
  private connected: boolean = false

  async connect(serverUrl: string): Promise<void> {
    const url = new URL(serverUrl)
    this.serverUrl = `${url.protocol}//${url.host}`
    this.connected = true
  }

  disconnect(): void {
    this.serverUrl = ''
    this.connected = false
  }

  async getSessions(): Promise<Session[]> {
    const response = await fetch(`${this.serverUrl}/session`)
    if (!response.ok) {
      throw new Error(`Failed to fetch sessions: ${response.statusText}`)
    }
    return response.json()
  }

  async getMessages(sessionId: string): Promise<MessageEnvelope[]> {
    const response = await fetch(
      `${this.serverUrl}/session/${sessionId}/message`
    )
    if (!response.ok) {
      throw new Error(`Failed to fetch messages: ${response.statusText}`)
    }
    return response.json()
  }

  async sendMessage(
    sessionId: string,
    request: SendMessageRequest
  ): Promise<MessageEnvelope> {
    const response = await fetch(
      `${this.serverUrl}/session/${sessionId}/message`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      }
    )
    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.statusText}`)
    }
    return response.json()
  }
}

export function createOpenCodeClient(): OpenCodeClient {
  return new OpenCodeClientImpl()
}
