import { isProxy, toRaw } from 'vue';

export default (val: any) => {
    if(isProxy(val)){
        return toRaw(val)
    } 
    return val
}