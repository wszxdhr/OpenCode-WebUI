interface HealthCheckResponse {
  status: string
  version: string
  timestamp: string
}

export class HealthClient {
  private serverUrl: string = ''

  async checkHealth(serverUrl: string): Promise<HealthCheckResponse> {
    const url = new URL(serverUrl)
    this.serverUrl = `${url.protocol}//${url.host}`

    try {
      const response = await fetch(`${this.serverUrl}/health`)
      if (!response.ok) {
        throw new Error(`Health check failed: ${response.statusText}`)
      }
      return response.json()
    } catch (error) {
      throw new Error(
        `Health check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }
}

export function createHealthClient(): HealthClient {
  return new HealthClient()
}
