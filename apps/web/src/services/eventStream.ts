export interface EventStream {
  connect(): void
  disconnect(): void
  onMessage(callback: (event: MessageEvent) => void): void
}

export class EventStreamImpl implements EventStream {
  private eventSource: EventSource | null = null
  private url: string = ''

  constructor(url: string) {
    this.url = url
  }

  connect(): void {
    if (this.eventSource) {
      return
    }
    this.eventSource = new EventSource(this.url)
  }

  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close()
      this.eventSource = null
    }
  }

  onMessage(callback: (event: MessageEvent) => void): void {
    if (!this.eventSource) {
      return
    }
    this.eventSource.addEventListener('message', callback)
  }
}

export function createEventStream(url: string): EventStream {
  return new EventStreamImpl(url)
}
