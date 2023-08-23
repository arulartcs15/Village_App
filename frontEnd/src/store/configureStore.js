import { createStore, combineReducers } from 'redux'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import residentsReducers from '../reducers/residentsReducers'
import villagesReducers from '../reducers/villagesReducers'
import productsReducers from '../reducers/productsReducers'
import eventsReducers from '../reducers/eventsReducers'
import usersReducers from '../reducers/usersReducers'

const configureStore = () => {
    const store = createStore(combineReducers({
        residents: residentsReducers,
        village: villagesReducers,
        products: productsReducers,
        events: eventsReducers,
        users: usersReducers
    }), applyMiddleware(thunk))
    return store
}

export default configureStore