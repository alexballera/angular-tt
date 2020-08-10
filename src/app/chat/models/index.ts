export * from './chat'

export interface Notification {
  id: string
  text: string
  type: 'success' | 'info' | 'warning' | 'error'
  action?: string
  timestamp?: number
  payload?: any
  persistent?: boolean
}

export interface Context {
  school: string
  course: any
}

export interface ContextMenu {
  text: string
  parameter: string
}
