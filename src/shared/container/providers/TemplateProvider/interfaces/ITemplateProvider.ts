import IParseTemplateDTO from '../dtos/IParseTemplateDTO';

export default interface ITemplateProvider {
  parse({ templateFilePath, variables }: IParseTemplateDTO): Promise<string>;
}
