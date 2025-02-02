export default class StateManager {
  constructor() {
    this._state = {
      user: null,
      cards: [],
      isLoading: false,
      currentModal: null,
      errors: [],
    };
    this._subscribers = new Set();
  }

  getState() {
    return this._state;
  }

  setState(newState) {
    this._state = { ...this._state, ...newState };
    this._notifySubscribers();
  }

  subscribe(callback) {
    this._subscribers.add(callback);
    return () => this._subscribers.delete(callback);
  }

  _notifySubscribers() {
    this._subscribers.forEach((callback) => callback(this._state));
  }
}
