import FakeAppointmentsRepository from '@domains/appointments/fakes/repositories/FakeAppointmentsRepository';
import ListProviderAppointmentsService from '@domains/appointments/services/ListProviderAppointmentsService';

let appointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

const provider_id = 'jackie chan provider_id';
const customer_id = 'meanless customer_id';

describe('List Provider Appointments', () => {
  beforeEach(() => {
    appointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      appointmentsRepository,
    );
  });

  it('should list the provider appointments', async () => {
    const appointment1 = await appointmentsRepository.create({
      customer_id,
      provider_id,
      date: new Date(2020, 8, 14, 14, 0, 0),
      type: 'CLASSIC_SHAVING',
    });

    const appointment2 = await appointmentsRepository.create({
      customer_id,
      provider_id,
      date: new Date(2020, 8, 14, 15, 0, 0),
      type: 'HAIR_CARE',
    });

    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 8, 14, 8, 0, 0).getTime());

    const appointments = await listProviderAppointments.execute({
      day: 14,
      year: 2020,
      month: 9,
      provider_id,
    });

    expect(appointments).toEqual([
      {
        ...appointment1,
        isPast: false,
      },
      {
        ...appointment2,
        isPast: false,
      },
    ]);
  });

  it('should return if a appointment already happened', async () => {
    const appointment1 = await appointmentsRepository.create({
      provider_id,
      customer_id,
      date: new Date(2020, 8, 14, 8, 0, 0),
      type: 'HAIR_CARE',
    });

    const appointment2 = await appointmentsRepository.create({
      provider_id,
      customer_id,
      date: new Date(2020, 8, 14, 9, 0, 0),
      type: 'CLASSIC_SHAVING',
    });

    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 9, 14, 9, 0, 0).getTime());

    const appointments = await listProviderAppointments.execute({
      day: 14,
      year: 2020,
      month: 9,
      provider_id,
    });

    expect(appointments).toEqual([
      {
        ...appointment1,
        isPast: true,
      },
      {
        ...appointment2,
        isPast: false,
      },
    ]);
  });
});
