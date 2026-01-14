export interface ApiResponse<T> {
  status: string;
  message?: string;
  data: T | null;
  meta?: Record<string, unknown>;
}
