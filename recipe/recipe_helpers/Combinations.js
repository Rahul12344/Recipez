function combinations(array) {
    array.sort();
    var fn = function(active, rest, a) {
        if (!active && rest.length == 0)
            return;
        if (rest.length == 0) {
            a.push(active);
        } else {
            fn(addToArrayAndReturnValue(active,rest[0]), rest.slice(1,), a);
            fn(active, rest.slice(1,), a);
        }
        return a;
    }
    return fn([], array, []).sort(function(a, b){return b.length - a.length}).slice(0,-1);
}

function addToArrayAndReturnValue(array,value) {
    array1 = Object.assign([],array);
    array1.push(value);
    return array1;
}

module.exports = combinations;
