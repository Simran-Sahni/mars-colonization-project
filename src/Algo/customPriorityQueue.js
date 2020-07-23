
const top = 0;
const parent = (i) => ((i + 1) >>> 1) - 1;
const left = (i) => (i << 1) + 1;
const right = (i) => (i + 1) << 1;
/**
 * from https://stackoverflow.com/a/42919752
 */
class PriorityQueue {
  /**
   *
   * @param {anything} comparator
   */
  constructor(comparator = (a, b) => a < b) {
    this._heap = [];
    this._comparator = comparator;
  }

  /**
   *  size of priority queue
   * @return {number}
   */
  size() {
    return this._heap.length;
  }

  /**
   * returns if priority queue is empty
   * @return {boolean}
   */
  isEmpty() {
    return this.size() === 0;
  }

  /**
   * returns the top element of priority queue
   * @return {*}
   */
  peek() {
    return this._heap[top];
  }

  /**
   * pushes values to the priority queue
   * @param {anything} values
   * @return {number}
   */
  push(...values) {
    values.forEach((value) => {
      this._heap.push(value);
      this._siftUp();
    });
    return this.size();
  }

  /**
   *  pop from priority queue
   * @return {*}
   */
  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > top) {
      this._swap(top, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }

  /**
   *
   * @param {number} value
   * @return {*}
   */
  replace(value) {
    const replacedValue = this.peek();
    this._heap[top] = value;
    this._siftDown();
    return replacedValue;
  }

  /**
   *
   * @param {number} i
   * @param {number} j
   * @return {boolean}
   * @private
   */
  _greater(i, j) {
    return this._comparator(this._heap[i], this._heap[j]);
  }

  /**
   *
   * @param {number} i
   * @param {number} j
   * @private
   */
  _swap(i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }

  /**
   *
   * @private
   */
  _siftUp() {
    let node = this.size() - 1;
    while (node > top && this._greater(node, parent(node))) {
      this._swap(node, parent(node));
      node = parent(node);
    }
  }

  /**
   *
   * @private
   */
  _siftDown() {
    let node = top;
    while (
      (left(node) < this.size() && this._greater(left(node), node)) ||
            (right(node) < this.size() && this._greater(right(node), node))
    ) {
      const maxChild = (right(node) < this.size() &&
          this._greater(right(node), left(node))) ?
          right(node) : left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
}
export default PriorityQueue;
