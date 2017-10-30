const R = require('ramda');


/**
 * source: https://github.com/ramda/ramda/wiki/Cookbook#flatten-a-nested-object-into-dot-separated-key--value-pairs
 * @param obj :: row
 * @description slightly modified function from ramda's cookbook. The deepest key is maintained over keeping
 * history of keys. For most use cases, the deepest key represents, in a real world example, the value for the
 * row that should be denormalized.
 */
const flattenObj = obj => {
    const go = obj_ => R.chain(([k, v]) => {
        if (typeof v == 'object') {
            return R.map(([k_, v_]) => [`${k_}`, v_], go(v))
        } else {
            return [[k, v]]
        }
    }, R.toPairs(obj_));

    return R.fromPairs(go(obj));
};

module.exports = Object.freeze({
    flattenObj
});