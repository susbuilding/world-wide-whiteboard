class EventEmitter {
    constructor() {
        this.subscribers = {};
    }

    on(eventName, eventListener) {
        if (!this.subscribers[eventName]) {
            this.subscribers[eventName] = [];
        }

        this.subscribers[eventName].push(eventListener);

    };

    emit(eventName){
        if (!this.subscribers[eventName]) {
            return;
        }

        // Grab the remaining arguments to our emit function.
        let remainingArgs = [].slice.call(arguments, 1);

        // For each subscriber, call it with our arguments.
        this.subscribers[eventName].forEach( (listener) => {
            listener.apply(null, remainingArgs);
        });
    }
}

window.EventEmitter = EventEmitter;
