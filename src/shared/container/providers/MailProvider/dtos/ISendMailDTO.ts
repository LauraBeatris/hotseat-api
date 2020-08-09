import IParseTemplateDTO from '@shared/container/providers/TemplateProvider/dtos/IParseTemplateDTO';

interface IMailContact {
  name: string;
  address: string;
}

export default interface ISendMailDTO {
  to: IMailContact;
  subject: string;
  templateData: IParseTemplateDTO;
}
