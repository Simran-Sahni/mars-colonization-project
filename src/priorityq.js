/**
 *
 */
class QElement {
  /**
   *
   * @param element
   * @param priority
   */
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

// PriorityQueue class
/**
 *
 */
export default class PriorityQueue {
  /**
   *
   */
  constructor() {
    this.items = [];
  }

  // enqueue function to add element
  // to the queue as per priority
  enqueue(element, priority) {
    // creating object from queue element
    const qElement = new QElement(element, priority);
    let contain = false;

    // iterating through the entire
    // item array to add element at the
    // correct location of the Queue
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > qElement.priority) {
        // Once the correct location is found it is
        // enqueued
        this.items.splice(i, 0, qElement);
        contain = true;
        break;
      }
    }
    if (!contain) {
      this.items.push(qElement);
    }
  }

  /**
   *
   * @return {string|*}
   */
  dequeue() {
    if (this.isEmpty()) {
      return 'Underflow';
    }
    return this.items.shift();
  }

  /**
   *
   * @return {string|*}
   */
  front() {
    if (this.isEmpty()) {
      return 'No elements in Queue';
    }
    return this.items[0];
  }

  /**
   *
   * @return {string|*}
   */

  /**
   *
   * @return {boolean}
   */
  isEmpty() {
    // return true if the queue is empty.
    return this.items.length === 0;
  }
}
