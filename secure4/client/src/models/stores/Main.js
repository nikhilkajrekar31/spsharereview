import { combineReducers, createStore } from 'redux';
import alertsStore from './Alerts';
import filesStore from './Files';

const rootReducer = combineReducers({
  'alertsStore': alertsStore.reducer(),
  'filesStore': filesStore.reducer(),
});

const store = createStore(rootReducer);

const mapDispatchToProps = (state) => {
  return {
    ...alertsStore.mapDispatchToProps()(state),
    ...filesStore.mapDispatchToProps()(state),
  };
};

const mapStateToProps = (state) => {
  return {
    ...alertsStore.mapStateToProps()(state),
    ...filesStore.mapStateToProps()(state),
  };
};

export {
  store,
  rootReducer,
  mapStateToProps,
  mapDispatchToProps,
};
