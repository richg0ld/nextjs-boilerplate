export const actionTypes = {
    SAMPLE_API_REQUEST: 'SAMPLE_API_REQUEST',
    SAMPLE_API_SUCCESS: 'SAMPLE_API_SUCCESS',
    SAMPLE_API_FAILURE: 'SAMPLE_API_FAILURE',
};

export function sampleApiRequest () {
    return {
        type: actionTypes.SAMPLE_API_REQUEST,
    }
}

export function sampleApiSuccess (res) {
    return {
        type: actionTypes.SAMPLE_API_SUCCESS,
        res
    }
}

export function sampleApiFailure (err) {
    return {
        type: actionTypes.SAMPLE_API_FAILURE,
        err
    }
}
