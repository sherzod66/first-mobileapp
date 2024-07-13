import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { language } from "../../../../utils/language";

export const useWelcomeHooks = () => {
  const [shouldShow, setShouldShow] = useState(true);
  const { t, i18n } = useTranslation();
  const [drop, setDrop] = useState<string>(language(i18n.language));
  //const [state, setState] = useState(true);
  const changeLanguage = (lang: "en" | "ru" | "uz") => {
    i18n.changeLanguage(lang);
    setShouldShow(!shouldShow);
  };
  useEffect(() => {
    setDrop(language(i18n.language));
  }, [i18n.language]);

  return {
    shouldShow,
    setShouldShow,
    drop,
    changeLanguage,
  };
};
