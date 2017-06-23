//http://blog.gypsydave5.com/2015/03/21/lazy-eval-and-memo/
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