/**
 * Contains UTILS functions
 */
export class Utils {
  /**
   * Dispatch 'resize' event in order to refreshing ngView
   */
  public static refreshView(): void {
    window.dispatchEvent( new Event( 'resize' ) );
  }

  /**
   * Wrapper of querySelectorAll js method
   * @param {string} query is a group of selectors to match on or elements of the DOM
   * @returns {any} a non-live node list [ NodeList[elements] ] of element objects
   */
  public static find( query: string ): NodeListOf<Element> {
    if( !document || !query ) return null;

    return document.querySelectorAll( query );
  }
}
