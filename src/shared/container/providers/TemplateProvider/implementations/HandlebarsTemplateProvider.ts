import handlebars from 'handlebars';

import IParseTemplateDTO from '../dtos/IParseTemplateDTO';
import ITemplateProvider from '../interfaces/ITemplateProvider';

export default class HandlebarsTemplateProvider implements ITemplateProvider {
  public async parse({ file, variables }: IParseTemplateDTO): Promise<string> {
    const compileTemplate = handlebars.compile(file);

    return compileTemplate(variables);
  }
}
