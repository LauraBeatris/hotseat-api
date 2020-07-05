import ITemplateProvider from '../interfaces/ITemplateProvider';

export default class FakeTemplateProvider implements ITemplateProvider {
  public async parse(): Promise<string> {
    return 'Parse template';
  }
}
