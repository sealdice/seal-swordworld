import Loader, { I18nJsonObject } from 'bcdice/lib/loader/loader';

export default class StaticLoader extends Loader {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  dynamicImportI18n(baseClassName: string, locale: string): Promise<I18nJsonObject> {
    return new Promise((resolve) => resolve({}));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  dynamicImport(className: string): Promise<void> {
    return new Promise((resolve) => resolve());
  }
}