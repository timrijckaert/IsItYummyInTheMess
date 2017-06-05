function lazy(fn) {
    const args = arguments;
    let result;
    const lazyEval = fn.bind.apply(fn, args);
    return function () {
        if (result) {
            return result
        }
        result = lazyEval();
        return result;
    }
}
export {lazy}