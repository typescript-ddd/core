export interface RouteDefinition<TRequest = any, TResponse = any> {
  method: string;
  path: string;
  handler: (req: TRequest, res: TResponse) => void;
}

export interface AppRouter<TRequest = any, TResponse = any> {
  on: (
    method: string,
    path: string,
    handler: (req: TRequest, res: TResponse) => Promise<any>
  ) => void;

  off: (
    method: string,
    path: string,
  ) => void;

  getRoutes(): RouteDefinition<TRequest, TResponse>[];  
}
