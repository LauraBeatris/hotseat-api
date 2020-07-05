import handlebars from 'handlebars';
import fs from 'fs';

import IParseTemplateDTO from '../dtos/IParseTemplateDTO';
import ITemplateProvider from '../interfaces/ITemplateProvider';

export default class HandlebarsTemplateProvider implements ITemplateProvider {
  public async parse({
    templateFilePath,
    variables,
  }: IParseTemplateDTO): Promise<string> {
    const templateFile = await fs.promises.readFile(templateFilePath, {
      encoding: 'utf8',
    });

    const compileTemplate = handlebars.compile(templateFile);

    return compileTemplate(variables);
  }
}
