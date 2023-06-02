import {memo, useEffect,useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import LoginHeader from "../../components/login-layout";
import ProfileCard from '../../components/profile-card';
import Navigation from '../../containers/navigation';
import useSelector from '../../hooks/use-selector';

function Login() {

  const store = useStore();
  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);
  
  const select = useSelector(state => ({
   profile: state.profile.profileInfo
  }))
  
  const callbacks = {
   // получаем данные пользователяы
   loginUser: useCallback(token => store.actions.profile.getProfileInfo(token), [store]),
 }


 useEffect(()=>{
   callbacks.loginUser(localStorage.getItem('token')) 
 },[])

 console.log(select.profile.result);

  const {t} = useTranslate();

  return (
    <PageLayout>
      <LoginHeader/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <ProfileCard profile={select.profile.result} />
    </PageLayout>
  );
}

export default memo(Login);
