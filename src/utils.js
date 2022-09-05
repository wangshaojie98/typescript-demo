import Main from "./main"
console.log({
    Main
});
import _ from 'lodash';
const getConditionValue = ({ conditions = [], compareValue, predicate = (a, b) => a < b, values, defaultValue = null }) => {
    const compareFn = _.partial(predicate, compareValue);

    const getValuleOrDefaultByKey = _.unary(_.flow(
        _.partial(_.get, values, _),
        _.partialRight(_.defaultTo, defaultValue),
    ));

    const compose = _.flow([
        _.partial(_.findIndex, _, compareFn),
        getValuleOrDefaultByKey
    ]);

    return compose(conditions);
};

export const getCellStyle = (aOptions) => (record) => {
    const options = _.assign({ defaultValue: {} }, _.pick(aOptions, ['conditions', 'predicate', 'values']), { compareValue: _.get(record, [_.get(aOptions, ['key'])]) });
    const res = getConditionValue(options);
    return res;
};



function validateEmptyStatus(fn) {
    return function (val) {
        if (val !== 0 && !val) {
            return '/';
        }
        return fn(val);
    };
}

export const getColumnRender = (key = 'default') => ({
    default: validateEmptyStatus(v => v),
    str: validateEmptyStatus(v => v),
    float: validateEmptyStatus(v => _.floor(v, 2)),
    float_percent: validateEmptyStatus(v => `${_.floor(v * 100, 2)}%`),
    int: validateEmptyStatus(v => v),
}[key]);

export const getColums = (options = {}) => {
  return 'getColums' 
};