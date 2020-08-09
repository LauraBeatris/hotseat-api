import IParseTemplateDTO from '@shared/container/providers/TemplateProvider/dtos/IParseTemplateDTO';

export default interface ITemplateProvider {
  parse({ templateFilePath, variables }: IParseTemplateDTO): Promise<string>;
}
