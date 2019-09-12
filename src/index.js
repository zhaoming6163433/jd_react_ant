import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux'
import store from './store/index'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// const Count = props => (
//     <div>
//         The count is {props.count}
//         <button onClick={props.increment}>increment</button>
//         <button onClick={props.incrementAsync}>incrementAsync</button>
//     </div>
// )

// const mapState = state => ({
//     count: state.count
// })

// const mapDispatch = ({ count: { increment, incrementAsync }}) => ({
//     increment: () => increment(1),
//     incrementAsync: () => incrementAsync(1)
// })

// const CountContainer = connect(mapState, mapDispatch)(Count)
ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
