import { TFunction } from "i18next";
import { Container, initializeIocContainer, } from '@ioc/index';


export type Bootstrap = {
  // i18n: TFunction;
  container: Container;
};

export async function bootstrap(): Promise<Bootstrap> {
  // const i18n = await initializeI18n();
  const container = initializeIocContainer();

  // return { i18n, container, };
  return { container };
}
