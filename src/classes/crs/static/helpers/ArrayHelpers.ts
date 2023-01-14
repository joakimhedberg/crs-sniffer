export default class ArrayHelpers {
  /**
   * Split an array into n pieces
   * @param array Array to split
   * @param n Number of pieces in the result
   * @returns Array of arrays of type T
   */
  public static splitArray<T>(array: Array<T>, n: number): Array<Array<T>> {
    let [...arr] = array
    var res = []
    while (arr.length) {
      res.push(arr.splice(0, n));
    }
    return res;
  }
}