import { uuid } from 'uuidv4';

class Appointment {
  id: string;

  provider: string;

  date: Date;

  type: string;

  constructor({ provider, date, type }: Omit<Appointment, 'id'>) {
    this.id = uuid();

    this.provider = provider;
    this.date = date;
    this.type = type;
  }
}

export default Appointment;
