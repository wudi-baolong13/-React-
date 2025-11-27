import { Outlet, useNavigate } from 'react-router-dom';


function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <h1>我是 App</h1>
      <button onClick={() => navigate('/child')}>Child 页面</button>
      <button onClick={() => navigate('/count')}>Count 页面</button>
      <button onClick={() => navigate('/retext')}>ReText 页面</button>

      <Outlet /> {/* 子路由会渲染到这里 */}


    </div>
  );
}

export default App;
