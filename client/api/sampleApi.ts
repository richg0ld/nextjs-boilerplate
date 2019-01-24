import service from "./service";

export default () => {
    return service({
        method: 'get',
        uri: '/v1/common/init',
    })
};