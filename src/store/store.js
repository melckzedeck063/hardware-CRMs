import { configureStore } from '@reduxjs/toolkit'

import users from './reducers/user_reducer';
import products from './reducers/product_reducer';
import sales from './reducers/sales_reducer'

export default configureStore({

    reducer : {
        users,
        products,
        sales
    }
})
