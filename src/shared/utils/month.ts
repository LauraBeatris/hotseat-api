import { getMonth as DFNSGetMonth } from 'date-fns';

/**
 * @summary Returns the day of a month.
 * Since JavaScript starts the months with 0, this function will
 * add + 1 to the original number
 *
 * @example Original return: January (0), February (1)
 *
 * By adding 1, it will return the friendly number to use in services:
 * January (1), February (1)
 *
 * @param {Date} date The date
 */
const getMonthOfADate = (date: Date): number => DFNSGetMonth(date) + 1;

/**
 * @summary Returns the month subtracted by one in order to
 * pass to a JS Date, since JavaScript starts the months with 0
 *
 * @example parseMonthToJSMonth(1) -> 0 (January)
 *
 * @param {number} Month The month number
 */
export const parseMonthToJSMonth = (month: number): number => month - 1;

export default getMonthOfADate;
