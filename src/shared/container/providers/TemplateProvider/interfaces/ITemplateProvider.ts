import IParseTemplateDTO from '../dtos/IParseTemplateDTO';

export default interface ITemplateProvider {
  parse({ file, variables }: IParseTemplateDTO): Promise<string>;
}
