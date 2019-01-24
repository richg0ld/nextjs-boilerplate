import {call, put, take, fork} from 'redux-saga/effects'
import * as api from '../client/api'
import { actionTypes, sampleApiSuccess, sampleApiFailure } from '../actions/sample'

function * sampleApiSaga () {
    while(true) {
        yield take(actionTypes.SAMPLE_API_REQUEST);
        try {
            const res = yield call(api.sampleApi);
            yield put(sampleApiSuccess(res.data))
        } catch (err) {
            yield put(sampleApiFailure(err))
        }
    }
}

export default [
    fork(sampleApiSaga)
]