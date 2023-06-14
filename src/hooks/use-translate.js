import {useCallback, useLayoutEffect, useMemo, useState} from "react";
// import useStore from "../store/use-store";
// import useSelector from "../store/use-selector";
// import translate from "../i18n/translate";
import useServices from "./use-services";
import shallowEqual from "shallowequal";
/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {

  const i18n = useServices().i18n;

  const [language, setLanguage] = useState(() => i18n.lang);
  const setLang = useCallback((lang) => i18n.setLang(lang) ,[]);
  const t = useCallback((text, number) => i18n.translate(language , text , number), [language]);

  const unsubscribe = useMemo(() => {
    return i18n.subscribe(() => {
      const newLang = i18n.lang;
      setLanguage(prevLang => shallowEqual(prevLang, newLang) ? prevLang : newLang);
    });
  }, []);

  useLayoutEffect(() => unsubscribe, [unsubscribe]);

  return {lang:language, setLang , t}

}
