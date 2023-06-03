import {memo, useEffect,useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/layouts/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import LoginHeader from "../../containers/login-header";
import ProfileCard from "../../components/profile-card";
import Navigation from "../../containers/navigation";
import useSelector from "../../hooks/use-selector";

function Login() {

  const store = useStore();

  const select = useSelector(state => ({
   profile: state.profile.profileInfo
  }))
  
  const callbacks = {
   // получаем данные пользователяы
   loginUser: useCallback(token => store.actions.profile.getProfileInfo(token), [store]),
 }


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
