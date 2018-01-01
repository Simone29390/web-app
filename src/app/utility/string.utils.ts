/**
 * Contains UTILS functions
 */
export class StringUtils {
  /**
   * The empty String "".
   * @type {string}
   */
  public static EMPTY: string = '';

  /**
   * The space String
   * @type {string}
   */
  public static SPACE: string = ' ';

  /**
   * Checks if a String is empty ("") or null.
   * @param {string} str the String to check, may be null
   * @returns {boolean} true if the String is empty or null
   */
  public static isEmpty( str: string ): boolean {
    return str === null || str === '';
  }
}
