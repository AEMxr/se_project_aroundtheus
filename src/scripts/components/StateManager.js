export default class StateManager {
  static initialState = {
    user: null,
    cards: [],
    isLoading: false,
    currentModal: null,
    errors: [],
    forms: {},
  };

  constructor() {
    this._state = { ...StateManager.initialState };
    this._subscribers = new Set();
  }

  getState() {
    return this._state;
  }

  setState(newState) {
    this._state = this._mergeState(newState);
    this._notifySubscribers();
  }

  _mergeState(newState) {
    return Object.entries(newState).reduce(
      (merged, [key, value]) => ({
        ...merged,
        [key]:
          value instanceof Object && !Array.isArray(value)
            ? { ...merged[key], ...value }
            : value,
      }),
      { ...this._state }
    );
  }

  subscribe(callback) {
    this._subscribers.add(callback);
    return () => this._subscribers.delete(callback);
  }

  _notifySubscribers() {
    this._subscribers.forEach((callback) => callback(this._state));
  }
}
