import {
  CommandAction,
  Middleware,
  pipeline,
  QueryAction,
} from "../../presentation";
import { EventStore } from "../store";
import { AppRouter } from "./app-router";

export interface AppModuleConfig {
  controllers: (CommandAction | QueryAction)[];
  eventStore: EventStore;
}

export interface AppContext {
  [key: string]: any;
}

interface Context {
  req: any;
  res: any;
  ctx: AppContext;
}

export abstract class AppModule {
  abstract readonly name: string;
  private readonly middlewares: Middleware<Context>[] = [];
  protected constructor(protected readonly config: AppModuleConfig) {}

  public configureRoutes(router: AppRouter, appContext: AppContext = {}): void {
    this.config.controllers.forEach((controller) => {
      router.on(controller.method, controller.path, async (req, res) => {
        const engine = pipeline<Context>(async (context, next) => {
          context.req = req;
          context.res = res;
          context.ctx = appContext;
          next();
        });

        const context = { req, res, next: () => {}, ctx: appContext };

        const newContext = await (async () => {
          await engine.execute(context);
          return context;
        })();

        return await controller.execute(
          newContext.req,
          newContext.res,
          newContext.ctx
        );
      });
    });
  }

  public use(...middlewares: Middleware<Context>[]): void {
    this.middlewares.push(...middlewares);
  }

  protected get store(): EventStore {
    return this.config.eventStore;
  }
}
