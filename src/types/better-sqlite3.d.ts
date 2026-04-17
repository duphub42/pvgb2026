declare module 'better-sqlite3' {
  interface DatabaseConstructor {
    new (filename: string, options?: Record<string, unknown>): Database
  }

  export interface Database {
    prepare(sql: string): Statement
    exec(sql: string): void
    close(): void
  }

  export interface Statement {
    all<T = unknown>(...params: unknown[]): T[]
    run(...params: unknown[]): { changes: number; lastInsertRowid: number }
    get<T = unknown>(...params: unknown[]): T | undefined
  }

  const Database: DatabaseConstructor
  export default Database
}
