import {memo, useEffect,useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import LoginHeader from "../../components/login-layout";
import Form from '../../components/form';
import Navigation from '../../containers/navigation';

function Login() {

  const store = useStore();

  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);
  
  
  const callbacks = {
   // Получение токена
   loginUser: useCallback(body => store.actions.login.loginUser(body), [store]),
 }


  const {t} = useTranslate();

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
      <Form items={formFields} onSubmit={callbacks.loginUser}/>
    </PageLayout>
  );
}

export default memo(Login);
