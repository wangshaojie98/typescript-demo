/**
 * 事件发射器
 */

interface MyEmitter {
  emit(channel: string, value: unknown): void;
  on(event: string, f: (value: unknown) => void): void
}

type RedisClient = {
  on(event: 'ready', f: () => void ): void;
  on(event: 'error', f: (e: Error) => void): void;
  on(event: 'reconnecting', f: (params: { attempt: number, delay: number} ) => void): void;
}

type Events = {
  ready: void;
  error: Error;
  reconnecting: { attempt: number, delay: number }
}

type Redisclient1 = {
  on<T extends keyof Events>(
    event: T,
    f: (arg: Events[T]) => void
  ): void;
  emit<T extends keyof Events>(
    event: T,
    args: Events[T]
  ): void
}