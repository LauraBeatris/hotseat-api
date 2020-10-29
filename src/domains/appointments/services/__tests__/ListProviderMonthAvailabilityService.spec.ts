import FakeUsersRepository from '@domains/users/fakes/repositories/FakeUsersRepository';
import FakeAppointmentsRepository from '@domains/appointments/fakes/repositories/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from '@domains/appointments/services/ListProviderMonthAvailabilityService';
import { MAX_APPOINTMENTS_PER_DAY } from '@domains/users/constants/appointments';
import AppError from '@shared/errors/AppError';

let usersRepository: FakeUsersRepository;
let appointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('List Provider Month Availability', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    appointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      usersRepository,
      appointmentsRepository,
    );
  });

  it('should list the month availability of a provider', async () => {
    const { id: provider_id } = await usersRepository.create({
      name: 'Jackie Chan',
      email: 'jackiechan@test.com',
      password: 'meaningless password',
    });

    const { id: customer_id } = await usersRepository.create({
      name: 'Jackie Chan Customer',
      email: 'jackiechancustomer@test.com',
      password: 'meaningless password',
    });

    await appointmentsRepository.create({
      date: new Date(2020, 1, 1, 20, 0, 0),
      provider_id,
      customer_id,
      type: 'CLASSIC_SHAVING',
    });

    const maxAppointmentsPerDayArray = Array.from(
      { length: MAX_APPOINTMENTS_PER_DAY },
      (_, index) => index + 1,
    );

    const fillDayWithAppointments = maxAppointmentsPerDayArray.map(() =>
      appointmentsRepository.create({
        date: new Date(2020, 1, 2, 20, 0, 0),
        provider_id,
        customer_id,
        type: 'CLASSIC_SHAVING',
      }),
    );

    await Promise.all(fillDayWithAppointments);

    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2020, 1, 0, 0, 0, 0).getTime());

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id,
      month: 2,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true, isPast: false },
        { day: 1, available: true, isPast: false },
        { day: 2, available: false, isPast: false },
        { day: 22, available: true, isPast: false },
      ]),
    );
  });

  it('should not list the month availability an nonexisting provider', async () => {
    const meanlessMonth = 1;
    const meanlessYear = 2020;

    await expect(
      listProviderMonthAvailabilityService.execute({
        provider_id: 'nonexisting provider id',
        month: meanlessMonth,
        year: meanlessYear,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
