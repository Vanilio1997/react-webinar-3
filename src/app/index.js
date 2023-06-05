import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import PrivateRoute from "../components/private-route" 

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route  path='' element={<PrivateRoute redirectPathName={'/login'} tokenName={'token'} /> }>
          <Route  path={'/profile'} element={ <Profile/> }/>
        </Route>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
