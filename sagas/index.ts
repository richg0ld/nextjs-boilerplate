import { all } from 'redux-saga/effects'
import sample from './sample';

const mergedSagas = [].concat(
    sample,
);

function * rootSaga () {
    yield all(mergedSagas)
}

export default rootSaga