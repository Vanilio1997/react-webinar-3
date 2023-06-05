import { memo, useCallback, useEffect} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import LoginLayout from "../../components/layouts/login-layout";
import AuthorizationHeader from "../../components/authorization-header";

function LoginHeader(){

   const store = useStore();

   const select = useSelector(state => ({
      userName: state.login.userName,
      token: state.login.token,
      isAuthorized: state.login.isAuthorized
   }))

   const callbacks = {
      loginUser: useCallback(token => store.actions.profile.getProfileInfo(token), [store]),
      leaveProfile: useCallback( () => store.actions.login.leaveProfile(), [store]),
   }
   

   return(
      <LoginLayout>
         <AuthorizationHeader 
            userName={select.userName} 
            onLeaveProfile={callbacks.leaveProfile}
            profileLink='/profile'
            loginLink = '/login'
            isAuthorized={select.isAuthorized}
         />
      </LoginLayout>
   )
}

export default memo(LoginHeader);