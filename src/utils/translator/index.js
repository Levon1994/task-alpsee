import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from 'react';

import Fetch from 'utils/fetch';

const TranslatorContext = createContext();

const TranslatorProvider = ({ children }) => {

  const [translations, setTranslations] = useState({});
  const [language, setLanguage] = useState('en');

  const loadTranslations = useCallback(async lang => {
    const result = await Fetch.get(`/translations/resources-locale_${lang}.json`);
    setTranslations(prev => ({ ...prev, [lang]: result || {} }));
  }, []);

  useEffect(() => {
    if (!translations[language]) {
      loadTranslations(language);
    }
  }, [language, translations, loadTranslations]);

  const translate = useCallback(str => {
    const currentTranslations = translations[language];
    return (currentTranslations && currentTranslations[str]) || str;
  }, [translations, language]);

  const value = useMemo(
    () => ({ translate, setLanguage }),
    [translate, setLanguage],
  );

  return (
    <TranslatorContext.Provider value={value}>
      {children}
    </TranslatorContext.Provider>
  );
}

const useTranslator = () => {
  const { translate: t, setLanguage } = useContext(TranslatorContext);
  return { t, setLanguage };
};

export {
  TranslatorProvider,
  useTranslator,
}
