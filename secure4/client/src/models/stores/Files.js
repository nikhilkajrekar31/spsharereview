const initialState = {
  'files': [
  ],
};

class FilesStore {
  constructor() {
    this.setDictionaryForActionTypes();
    this.setDictionaryForReducerActionHandlers();
  }

  setDictionaryForActionTypes() {
    this.actionTypes = {
      'FETCH_FILES': 'FETCH_FILES',
    };
  }

  setDictionaryForReducerActionHandlers() {
    this.reducerActionHandlers = {
      [this.actionTypes.FETCH_FILES]: this.stateFor_fetchFiles,
    };
  }

  mapStateToProps() {
    return (state) => {
      return {
        'files': state.filesStore.files,
      };
    };
  }

  mapDispatchToProps() {
    return (dispatch) => {
      return {
        'fetchFilesFor': (user) => {
          return new Promise((resolve, reject) => {
            user.fetchFiles()
              .then(files => {
                dispatch({
                  'type': this.actionTypes.FETCH_FILES,
                  'payload': files,
                });
                resolve();
              }).catch(() => reject());
          });
        },
      };
    };
  }

  stateFor_fetchFiles(state, action) {
    const files = action.payload;
    return {
      'files': files,
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

const filesStore = new FilesStore();
export default filesStore;
