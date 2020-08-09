import ITemplateProvider from '@shared/container/providers/TemplateProvider/interfaces/ITemplateProvider';

export default class FakeTemplateProvider implements ITemplateProvider {
  public async parse(): Promise<string> {
    return 'Parse template';
  }
}
