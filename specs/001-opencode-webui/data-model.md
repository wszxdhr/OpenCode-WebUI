# Phase 1 Data Model: OpenCode WebUI Monorepo

## Entities

### ServerConnection

- id: string
- serverUrl: string
- protocol: 'http' | 'https'
- status: 'disconnected' | 'connecting' | 'connected' | 'error'
- lastError?: string
- transport: 'http' | 'ws' | 'both'

### Project

- id: string
- name: string
- sessions: SessionSummary[]

### SessionSummary

- id: string
- title: string
- updatedAt: string (ISO)
- preview?: string

### Message

- id: string
- sessionId: string
- sender: 'user' | 'assistant' | 'system'
- content: string
- createdAt: string (ISO)
- order: number

## Relationships

- ServerConnection -> Project[] (一对多)
- Project -> SessionSummary[] (一对多)
- SessionSummary -> Message[] (一对多)

## Validation Rules

- serverUrl 必须为 http/https 开头
- sessionId/messageId 必须为非空字符串
- Message.order 必须单调递增

## State Transitions

### ServerConnection.status

- disconnected -> connecting -> connected
- connecting -> error
- connected -> disconnected

### Message

- created -> displayed (前端渲染)
