import {
  QueryBus,
  QueryHandlerRegistry,
  CommandHandlerRegistry,
  CommandBus,
} from "../../domain";
import { DefaultCommandBus, DefaultQueryBus } from "../bus";
import { EventStore } from "../store";
import { AppContext, AppModule } from "./app-module";
import { AppRouter } from "./app-router";

export type ModuleClass<T extends AppModule> = new (eventStore: EventStore, queryBus: QueryBus, commandBus: CommandBus) => T;

export abstract class Application<TContext extends AppContext> {
  protected readonly moduleMap: Map<string, AppModule> = new Map();

  protected readonly queryHandlerRegistry = new QueryHandlerRegistry();
  protected readonly commandHandlerRegistry = new CommandHandlerRegistry();
  protected readonly queryBus: QueryBus = new DefaultQueryBus(
    this.queryHandlerRegistry
  );
  protected readonly commandBus: CommandBus = new DefaultCommandBus(
    this.commandHandlerRegistry
  );

  protected constructor(
    protected readonly eventStore: EventStore,
    protected readonly appRouter: AppRouter,
    protected context: TContext
) {}

  public use<T extends AppModule>(
    moduleClass: ModuleClass<T>
  ): T {
    const appModule = new moduleClass(this.eventStore, this.queryBus, this.commandBus);

    appModule.configureRoutes(this.appRouter, this.context);

    this.moduleMap.set(appModule.name, appModule);

    return appModule;
  }

  public getModule(name: string): AppModule | undefined {
    return this.moduleMap.get(name);
  }

  public abstract run(): Promise<void>;
}
