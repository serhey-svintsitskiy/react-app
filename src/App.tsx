import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import taskSliceReducer from './components/TaskSlice';
import timerSliceReducer from './components/TimerSlice';
import Tasks from "./components/Tasks";
import Timer from "./components/Timer";

const PomodoreStore = configureStore({
  reducer: {
    tasks: taskSliceReducer,
    timer: timerSliceReducer
  }
});

function App() {
  return (
      <Provider store={PomodoreStore}>
        <div>
          <div>
            <Timer/>
            <Tasks/>
          </div>
        </div>
      </Provider>
  );
}

export default App;
