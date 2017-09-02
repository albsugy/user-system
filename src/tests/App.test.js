import React from 'react'
import { shallow } from 'enzyme'
import {Provider} from 'react-redux'

import {configure} from './../store/configureStore'
import App from './../App'

var store = configure()

it('renders without crashing', () => {
  shallow(
    <Provider store={store}>
      <App />
    </Provider>)
})
