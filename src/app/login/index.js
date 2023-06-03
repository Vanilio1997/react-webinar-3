import {memo, useEffect,useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/layouts/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import LoginHeader from "../../containers/login-header";
import LoginForm from '../../containers/login-form';
import Navigation from "../../containers/navigation";

function Login() {

  const store = useStore();

  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);
  
  const {t} = useTranslate();

  return (
    <PageLayout>
      <LoginHeader/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <LoginForm />
    </PageLayout>
  );
}

export default memo(Login);
