import LoginFormLayout from "../../components/layouts/login-form-layout";
import Form from "../../components/form";
import { memo, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function LoginForm(){
   
   const store = useStore()

   const select = useSelector(state => ({
      error: state.login.errorInfo
     })) 
   const callbacks = {
      loginUser: useCallback(body => store.actions.login.loginUser(body), [store]),
   }
   
   const formFields = [
      {label: "Логин" , id: "login", type: "text"},
      {label: "Пароль", id: "password", type: "password"},
   ]
   
   return(
      <LoginFormLayout>
         <h2>Вход</h2>
         <Form items={formFields} onSubmit={callbacks.loginUser} btnText='Войти' errorMessage={select.error}/>
      </LoginFormLayout>
   )
}

export default memo(LoginForm)