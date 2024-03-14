import { benefitsPortalContainer } from "@/apps/Auth/container";
import { FetchClientRepository } from "@/apps/Shared/Http/FetchHttp";
import { environment } from "@/apps/Shared/Http/environments/environment.dev";
import { Container } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";

export type InjectableType = "constant" | "class";

export type Injectables = {
  [name: string]: {
    id: string;
    class: any;
    type: InjectableType;
  };
};

export const sharedInjectables = {
  baseUrl: {
      id: 'baseUrl',
      class: environment.baseUrl,
      type: 'constant' as InjectableType,
  },
  HttpRepository: {
    id: "HttpRepository",
    class: FetchClientRepository,
    type: "class" as InjectableType,
  },
};

function bindContainerDependencies(container: Container): Container {
  const _sharedInjectables: Injectables = sharedInjectables;

  Object.entries(_sharedInjectables).forEach(([, payload]) => {
    const actionByType: { [K in InjectableType] } = {
      class: () =>
        container.bind(payload.id).to(payload.class).inSingletonScope(),
      constant: () => container.bind(payload.id).toConstantValue(payload.class),
    };

    actionByType[payload.type]();
  });
  return container;
}

export function initializeIocContainer(): Container {
  const container = new Container();
  container.load(buildProviderModule());
  // container.load(backofficeContainer);
  container.load(benefitsPortalContainer);
  // container.load(bookingContainer);

  return bindContainerDependencies(container);
}

export * from "inversify";
