/* tslint:disable */
/* eslint-disable */
/**
* @param {Int32Array} arr
* @returns {number}
*/
export function sum(arr: Int32Array): number;
/**
* @param {Int32Array} arr
* @returns {number}
*/
export function count(arr: Int32Array): number;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly sum: (a: number, b: number) => number;
  readonly count: (a: number, b: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
