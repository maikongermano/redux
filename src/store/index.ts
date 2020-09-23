import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './models/rootReducer';
import rootSaga from './models/rootSaga';
import { ICartState } from './models/cart/types';


export interface IState {
    cart: ICartState;
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

// estado global
const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(...middlewares)
    )
        
);

 sagaMiddleware.run(rootSaga);

export default store;