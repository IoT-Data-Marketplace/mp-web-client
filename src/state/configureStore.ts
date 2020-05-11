import { applyMiddleware, createStore } from 'redux';
import throttle from 'lodash/throttle';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { loadState, saveState } from './localStorage';

const configureStore = () => {
  // const persistedState = loadState();

  const store = createStore(
    reducers,
    // persistedState,
    composeWithDevTools(applyMiddleware(thunk))
  );

  store.subscribe(
    throttle(() => {
      saveState(store.getState());
    }, 1000)
  );
  return store;
};

export default configureStore;
