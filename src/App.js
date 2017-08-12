import React from 'react';
import {store} from './DI';
import {Provider} from 'react-redux'
import {IsItYummyInTheMess} from './redux/component'

const App = () => (
    //Provide the single store to the children of the AppContainer (IsItYummyInTheMess)
    <Provider store={store}>
        <IsItYummyInTheMess/>
    </Provider>
);

export default App;