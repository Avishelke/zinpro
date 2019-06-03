import get from 'lodash/get';
import chunk from 'lodash/chunk';

export {chunk};

export function getValue(object , key , deafultValue ){
    return  get(object , key , deafultValue);
}
