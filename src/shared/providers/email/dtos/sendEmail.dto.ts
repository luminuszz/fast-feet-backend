export interface SendEmailDTO<T = unknown> {
  to: string
  body: T
}
