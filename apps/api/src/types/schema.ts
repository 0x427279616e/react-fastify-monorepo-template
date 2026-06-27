export interface RouteSchema {
  querystring?: Record<string, any>;
  params?: Record<string, any>;
  response?: Record<number, any>;
  body?: Record<string, any>;
}
