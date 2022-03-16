export default class {
  #value;
  #listeners;

  constructor(value) {
    this.#value = value;
    this.#listeners = [];
  }

  subscribe(newListners) {
    this.#listeners.push(newListners);
  }

  #notify() {
    this.#listeners.forEach((listener) => listener(this.#value));
  }

  get value() {
    return this.#value;
  }

  set value(newValue) {
    this.#value = newValue;
    this.#notify();
  }
}
