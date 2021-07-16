/**
 * @description Custom setItem implementation for supporting cookie custom options.
 *
 * @extends {Storage}
 */
export default interface KanvasStorage extends Storage {
  /**
   * Sets a new key/value pair in the defined storage implementation.
   *
   * @param {string} key
   * @param {string} value
   * @param {object} [options] - Define cookie specific option overrides.
   */
  setItem(key: string, value: string, options?: object): void;
}