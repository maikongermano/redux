import { all, takeLatest, select, call, put } from 'redux-saga/effects'
import { addProductToCartFailure, addProductToCartRequest, addProductToCartSuccess } from './actions';
import { IState } from '../..';
import api from '../../../services/api';
import { AxiosResponse } from 'axios';
import { ActionTypes } from './types';


type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

interface IStockResponse {
    id: number;
    quantity: number;
}

function* checkProductStock({ payload }: CheckProductStockRequest) {
    const { product } = payload;

    // retorna a quantidade se existir se não retorna zero
    const currentQuantity: number = yield select((state: IState) => {
        return state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0;
    })

    // chamada api dentro do redux saga
    const availableStockResponse: AxiosResponse<IStockResponse> = yield call(api.get, `stock/${product.id}`);

    if (availableStockResponse.data.quantity > currentQuantity) {
        yield put(addProductToCartSuccess(product));
    } else {
        yield put(addProductToCartFailure(product.id));
    }

    console.log(currentQuantity)
}

export default all([
    takeLatest(ActionTypes.addProductToCartRequest, checkProductStock)
]);