// Shared types for OpenCode WebUI

export interface ServerConnection {
  id: string;
  serverUrl: string;
  protocol: 'http' | 'https';
  status: 'disconnected' | 'connecting' | 'connected' | 'error';
  lastError?: string;
  transport: 'http' | 'ws' | 'both';
}

export interface Project {
  id: string;
  name: string;
  sessions: SessionSummary[];
}

export interface SessionSummary {
  id: string;
  title: string;
  updatedAt: string;
  preview?: string;
}

export interface Message {
  id: string;
  sessionId: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: string;
  order: number;
}

export interface Session {
  id: string;
  projectID?: string;
  title: string;
  time: {
    created: number;
    updated: number;
  };
}

export interface MessageEnvelope {
  info: {
    id: string;
    sessionID: string;
    role: string;
    time: {
      created: number;
      completed?: number;
    };
  };
  parts: Array<{
    type: string;
    text?: string;
  }>;
}

export interface SendMessageRequest {
  messageID: string;
  providerID: string;
  modelID: string;
  mode: string;
  parts: Array<{
    type: string;
    text: string;
  }>;
}

export type ConnectionError =
  | { type: 'invalid_url'; message: string }
  | { type: 'unreachable'; message: string }
  | { type: 'server_error'; message: string; code?: number };
