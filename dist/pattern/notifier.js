export class Notifier {
    _observers;
    constructor() {
        this._observers = [];
    }
    addObserver(observer) {
        this._observers.push(observer);
    }
    notify() {
        this._observers.forEach((observer) => { observer.notify(); });
    }
}
