interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseTemplateDTO {
  templateFilePath: string;
  variables: ITemplateVariables;
}
