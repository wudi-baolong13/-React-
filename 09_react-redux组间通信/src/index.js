import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './redux/store'
import { Provider } from 'react-redux';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  /**此处需要用Provider包裹App，目的是让App所有的后代容器组件都能接收到store */
  <Provider store={store}>
    <App/>
  </Provider>
)

//检查redux中的状态，只要变化就调用render
// store.subscribe(() => {
//   root.render(
//     <App />
//   );
// })
