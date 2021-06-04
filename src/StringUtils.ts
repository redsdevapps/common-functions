/**
 * @module StringUtils
 */


/**
 * Capitalizes first letter of the word or sentence received
 * @param  {string} word the word or sentense to capitalize.
 * @returns String same word or sentense with first letter in UpperCase.
 */
export const capitalize = (word: string): String => {
  return `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`;
}