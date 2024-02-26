import { defer, of } from "rxjs";

export function asyncData<T>(mock: T){
    return defer(() => Promise.resolve(mock));
}

export function asyncError(mock: unknown){
    return defer(() => Promise.reject(mock));
}

export function mockObservable<T>(mock: T){
    return of(mock);
}

export function mockPromise<T>(mock: T){
    return Promise.resolve(mock);
}