"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defer = defer;
exports.createSubscribeFn = createSubscribeFn;
exports.subscribeFnToAsyncGenerator = subscribeFnToAsyncGenerator;
const array_js_1 = require("../array.js");
function defer() {
    const transit = {};
    const result = new Promise((resolve, reject) => Object.assign(transit, { resolve, reject }));
    return Object.assign(result, transit);
}
function createSubscribeFn(next, wait = Promise.resolve()) {
    const observers = [];
    (async () => {
        try {
            await wait;
            while (observers.length) {
                const [value, done] = await next();
                for (const observer of observers)
                    observer.next(value);
                if (done)
                    break;
            }
        }
        catch (err) {
            for (const observer of observers)
                observer.error(err);
        }
        finally {
            for (const observer of observers)
                observer.complete();
        }
    })();
    return (observer) => {
        observers.push(observer);
        return () => {
            observer.complete();
            (0, array_js_1.removeItem)(observers, observer);
        };
    };
}
async function* subscribeFnToAsyncGenerator(subscribe) {
    let finished = false;
    let deferred = defer();
    const observer = {
        next(value) {
            const result = deferred;
            deferred = defer();
            result.resolve(value);
        },
        error(exception) {
            const result = deferred;
            deferred = defer();
            result.reject(exception);
        },
        complete() {
            finished = true;
            deferred.resolve(null);
        },
    };
    const unsubscribe = subscribe(observer);
    try {
        while (true) {
            const value = await deferred;
            if (finished)
                break;
            yield value;
        }
    }
    finally {
        unsubscribe();
    }
}
