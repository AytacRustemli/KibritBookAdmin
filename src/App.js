import SideBar from './components/SideBar/SideBar';
import MyRouter from './router/MyRouter';

function App() {
  return (
    <div className='container-fluid' >
        <div className="row">
          <div className="col-lg-3 p-0">
            <SideBar />
          </div>
          <div className="col-lg-9">
            <MyRouter />
          </div>
        </div>
      </div>
  );
}

export default App;