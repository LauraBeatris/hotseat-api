import { getMonth } from 'date-fns';

/**
 * Returns the day of a month.
 * Since JavaScript starts the months with 0, this function will
 * add + 1 to the original number
 *
 * Original return: January (0), February (1)
 *
 * By adding 1, it will return the friendly number to use in services:
 * January (1), Febreary (1)
 */
export default (date: Date): number => getMonth(date) + 1;
