const initialState = {
  'alerts': [
    // {
    //   'id': 0,
    //   'message': 'To customize the theme of an Alert, wrap it in a react-jss higher-order component or provide it with a sheet prop shaped like the one react-jss provides:'
    // },
  ],
};

class AlertsStore {
  constructor() {
    this.setDictionaryForActionTypes();
    this.setDictionaryForReducerActionHandlers();
  }

  setDictionaryForActionTypes() {
    this.actionTypes = {
      'ADD_ALERT': 'ADD_ALERT',
      'REMOVE_ALERT': 'REMOVE_ALERT',
    };
  }

  setDictionaryForReducerActionHandlers() {
    this.reducerActionHandlers = {
      [this.actionTypes.ADD_ALERT]: this.stateFor_addAlert,
      [this.actionTypes.REMOVE_ALERT]: this.stateFor_removeAlert,
    };
  }

  mapStateToProps() {
    return (state) => {
      return {
        'alerts': state.alertsStore.alerts,
        'alertTimeout': 2000,
      };
    };
  }

  mapDispatchToProps() {
    return (dispatch) => {
      return {
        'addAlert': (alert) => {
          dispatch({
            'type': this.actionTypes.ADD_ALERT,
            'payload': alert,
          });
        },
        'removeAlert': (alert) => {
          dispatch({
            'type': this.actionTypes.REMOVE_ALERT,
            'payload': alert,
          });
        },
      };
    };
  }

  stateFor_addAlert(state, action) {
    const alert = action.payload;
    alert.id = new Date().getTime();
    return {
      ...state,
      'alerts': [...state.alerts, alert],
    };
  }

  stateFor_removeAlert(state, action) {
    const alert = action.payload;
    return {
      ...state,
      'alerts': state.alerts.filter(a => a.id !== alert.id),
    };
  }

  reducer() {
    return (state=initialState, action) => {
      const handler = this.reducerActionHandlers[action.type];
      let newState;
      if (handler) {
        newState = handler(state, action);
      } else {
        newState = state;
      }
      return newState;
    };
  }
}

const alertsStore = new AlertsStore();
export default alertsStore;
