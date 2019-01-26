import service from "./service";

export default () => {
    return service({
        method: 'get',
        uri: '/sample/api',
    })
};