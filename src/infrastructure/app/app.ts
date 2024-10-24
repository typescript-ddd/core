import { AppModule } from "./app-module";
import { AppRouter } from "./app-router";

export abstract class App {
    private readonly modules: AppModule[] = [];

    public module(...modules: AppModule[]): this {
        this.modules.push(...modules);
        return this;
    }

    public getModule(name: string): AppModule | undefined {
        return this.modules.find((module) => module.name === name);
    }

    public configureRoutes(router: AppRouter) {
        this.modules.forEach((module) => {
            module.configureRoutes(router);
        });
    }
}

