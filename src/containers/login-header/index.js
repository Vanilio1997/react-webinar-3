import { memo, useMemo , useCallback, useEffect} from "react";
import LoginLayout from "../../components/layouts/login-layout";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import ButtonLink from "../../components/button-link";
import { Link } from "react-router-dom";

function LoginHeader(){

   const store = useStore();

   const select = useSelector(state => ({
      userName: state.profile.profileInfo?.result?.profile?.name,
      token: state.login.token
   }))

   const callbacks = {
      loginUser: useCallback(token => store.actions.profile.getProfileInfo(token), [store]),
      leaveProfile: useCallback( () => store.actions.login.leaveProfile(), [store]),
   }

   const token = localStorage.getItem('token')

   useEffect(()=>{
      callbacks.loginUser(token) 
    },[token])
   console.log(select.userName);
   console.log(store);
   return(
      <LoginLayout>
         {
            token 
            ?
               <>
                  <Link to={'/profile'}>{select.userName}</Link>
                  <ButtonLink onClickCallback={callbacks.leaveProfile} link={'/login'} text='Выход'/>
               </>
            :
            <ButtonLink link={'/login'} text="Вход"/>
         }
      </LoginLayout>
   )
}

export default memo(LoginHeader);