import { format } from 'date-fns';

/**
 * @summary The prefix of the provider list cache key
 */
export const PROVIDERS_LIST_CACHE_KEY_PREFIX = 'providers-list';

/**
 * @summary Returns the cache key of the providers list
 *
 * @example getProvidersListCacheKey("abcde12345") -> "providers-list:abcde12345"
 *
 * @param {string} userId The user id
 */
export const getProvidersListCacheKey = (userId: string): string =>
  `${PROVIDERS_LIST_CACHE_KEY_PREFIX}:${userId}`;

/**
 * @summary The prefix of the provider appointments list cache key
 */
export const PROVIDER_APPOINTMENTS_LIST_CACHE_KEY_PREFIX = 'appointments-list';

/**
 * @summary Returns the cache key of the appointments list
 *
 * @example getProviderAppointmentsListCacheKey("abcde12345", "2020-10-30 14:00")
 * -> 'appointments-list:abcde12345:2020-10-30'
 *
 * @param {string} providerId The provider id
 * @param {Date} appointmentDate The appointment date
 */
export const getProviderAppointmentsListCacheKey = (
  providerId: string,
  appointmentDate: Date,
): string => {
  const formattedDate = format(appointmentDate, 'yyyy-M-d');

  return `${PROVIDER_APPOINTMENTS_LIST_CACHE_KEY_PREFIX}:${providerId}:${formattedDate}`;
};
