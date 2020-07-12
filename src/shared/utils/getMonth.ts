import { getMonth } from 'date-fns';

/**
 * Returns the day of a month, plus 1, since JavaScript starts the months
 * with 0
 *
 * For instance: January (0), February (1)
 */
export default (date: Date): number => getMonth(date) + 1;
