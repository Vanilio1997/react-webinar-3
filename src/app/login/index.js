import {memo, useEffect,useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import PageLayout from "../../components/layouts/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import LoginHeader from "../../containers/login-header";
import LoginForm from "../../components/login-form"
import Navigation from "../../containers/navigation";

function Login() {

  const store = useStore();
  
  const {t} = useTranslate();

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

  return (
    <PageLayout>
      <LoginHeader/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <LoginForm 
        items={formFields} 
        onSubmit={callbacks.loginUser} 
        btnText='Войти' 
        errorMessage={select.error}
        headerText='Вход'
        />
    </PageLayout>
  );
}

export default memo(Login);
