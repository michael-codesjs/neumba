export type CommonInput<T, P> = {
  /** typeof of input. */
  type: T,
  /** correlation id. */
  correlationId: string,
  /** consumer specific meta data. */
  meta?: Record<string, any>,
  /** input payload. */
  payload: P
};