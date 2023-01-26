import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

/* api functionality should include:
- get chore payments (daily, weekly, monthly, ad hoc)
- update chore payments
*/

/* WEEKLY PAYMENT */

function* fetchDailyPayment(action) {
    console.log('in fetchDailyPayment and action is:', action);
    try {        
        const response = yield axios.get(`/api/chore/payment/daily/${action.payload.userID}/${action.payload.weekID}` );
        yield put({ type: 'GET_DAILY_PAYMENT_SUCCESS', payload: response.data });
    } catch (error) {
        yield put({ type: 'GET_DAILY_PAYMENT_FAILED', payload: error });
        console.log('Chore Daily Payment GET request failed', error);
    }
}

function* updateDailyPayment(action) {
    console.log('in updateDailyPayment saga and action is:', action);
    try {        
        const response = yield axios.put(`/api/chore/payment/daily`, action.payload);
        yield put({ type: 'PUT_DAILY_PAYMENT_SUCCESS', payload: response.data });
    } catch (error) {
        yield put({ type: 'PUT_DAILY_PAYMENT_FAILED', payload: error });
        console.log('Chore Daily Payment PUT request failed', error);
    }
}

/* WEEKLY PAYMENT */
function* fetchWeeklyPayment(action) {
    try {        
        const response = yield axios.get(`/api/chore/payment/weekly/${action.payload.userID}/${action.payload.weekID}`);
        yield put({ type: 'GET_WEEKLY_PAYMENT_SUCCESS', payload: response.data });
    } catch (error) {
        yield put({ type: 'GET_WEEKLY_PAYMENT_FAILED', payload: error });
        console.log('Chore Weekly Payment GET request failed', error);
    }
}

function* updateWeeklyPayment(action) {
    console.log('in updateWeeklyPayment saga and action is:', action);
    try {
        const response = yield axios.put(`/api/chore/payment/weekly`, action.payload);
        yield put({ type: 'PUT_WEEKLY_PAYMENT_SUCCESS', payload: response.data });
    } catch (error) {
        yield put({ type: 'PUT_WEEKLY_PAYMENT_FAILED', payload: error });
        console.log('Chore Weekly Payment PUT request failed', error);
    }
}

function* fetchTotalDailyChorePayment(action) {
    console.log('OH YEAH..about to get total DAILY chore payment');
    try {        
        const response = yield axios.get(`/api/chore/payment/daily/total/${action.payload.userID}/${action.payload.weekID}`);
        console.log('response from getting total daily chore is:', response.data)
        yield put({ type: 'GET_TOTAL_DAILY_CHORE_PAYMENT_SUCCESS', payload: response.data });
    } catch (error) {
        yield put({ type: 'GET_TOTAL_DAILY_CHORE_PAYMENT_FAILED', payload: error });
        console.log('Chore Daily Payment GET request failed', error);
    }
}

function* fetchTotalWeeklyChorePayment(action) {
    console.log('OH YEAH..about to get total WEEKLY chore payment');
    try {        
        const response = yield axios.get(`/api/chore/payment/weekly/total/${action.payload.userID}/${action.payload.weekID}`);
        console.log('response from getting total weekly chore is:', response.data)
        yield put({ type: 'GET_TOTAL_WEEKLY_CHORE_PAYMENT_SUCCESS', payload: response.data });
    } catch (error) {
        yield put({ type: 'GET_TOTAL_WEEKLY_CHORE_PAYMENT_FAILED', payload: error });
        console.log('Chore Weekly Payment GET request failed', error);
    }
}


function* chorePaymentSaga() {
    yield takeLatest('GET_DAILY_PAYMENT_REQUESTED', fetchDailyPayment);
    yield takeLatest('GET_WEEKLY_PAYMENT_REQUESTED', fetchWeeklyPayment);
    yield takeLatest('UPDATE_DAILY_PAYMENT', updateDailyPayment);
    yield takeLatest('UPDATE_WEEKLY_PAYMENT', updateWeeklyPayment);
    yield takeLatest('GET_TOTAL_DAILY_CHORE_PAYMENT', fetchTotalDailyChorePayment);
    yield takeLatest('GET_TOTAL_WEEKLY_CHORE_PAYMENT', fetchTotalWeeklyChorePayment);
}

export default chorePaymentSaga;