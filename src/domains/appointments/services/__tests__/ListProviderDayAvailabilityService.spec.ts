import FakeAppointmentsRepository from '@domains/appointments/fakes/repositories/FakeAppointmentsRepository';
import FakeUsersRepository from '@domains/users/fakes/repositories/FakeUsersRepository';
import ListProviderDayAvailabilityService from '@domains/appointments/services/ListProviderDayAvailabilityService';
import APPOINTMENT_TYPES from '@domains/appointments/enums/appointmentTypes';
import AppError from '@shared/errors/AppError';

let appointmentsRepository: FakeAppointmentsRepository;
let usersRepository: FakeUsersRepository;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('List Provider Day Availability', () => {
  beforeEach(() => {
    appointmentsRepository = new FakeAppointmentsRepository();
    usersRepository = new FakeUsersRepository();
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      usersRepository,
      appointmentsRepository,
    );
  });

  it('should list the day availability of a provider', async () => {
    const provider = await usersRepository.create({
      name: 'Jackie Chan Provider',
      email: 'jackiechanprovider@test.com',
      password: 'meaningless password',
    });

    const customer = await usersRepository.create({
      name: 'Jackie Chan Customer',
      email: 'jackiechancustomer@test.com',
      password: 'meaningless password',
    });

    await appointmentsRepository.create({
      date: new Date(2020, 1, 1, 15, 0, 0),
      provider_id: provider.id,
      customer_id: customer.id,
      type: APPOINTMENT_TYPES[1],
    });

    await appointmentsRepository.create({
      date: new Date(2020, 1, 1, 16, 0, 0),
      provider_id: provider.id,
      customer_id: customer.id,
      type: APPOINTMENT_TYPES[0],
    });

    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 1, 1, 13, 0, 0).getTime());

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: provider.id,
      day: 1,
      month: 2,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        {
          hour: 9,
          available: false,
        },
        {
          hour: 12,
          available: false,
        },
        {
          hour: 14,
          available: true,
        },
        {
          hour: 15,
          available: false,
        },
        {
          hour: 16,
          available: false,
        },
        {
          hour: 17,
          available: true,
        },
      ]),
    );
  });

  it('should not list the day availability of a nonexisting provider', async () => {
    await expect(
      listProviderDayAvailabilityService.execute({
        provider_id: 'nonexisting provider id',
        day: 1,
        month: 2,
        year: 2020,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
