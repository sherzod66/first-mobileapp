import { useState } from "react";
import { useTranslation } from "react-i18next";

export const SelectLanguageHooks = (press: () => void) => {
  const { i18n } = useTranslation();
  const changeLanguage = (key: string) => {
    i18n.changeLanguage(key);
    press();
  };

  const languageInfo = [
    {
      key: "ru",
      value: "Русский язык",
      imagePath: require("../../../assets/icons/ru.png"),
    },
    {
      key: "en",
      value: "English",
      imagePath: require("../../../assets/icons/en.png"),
    },
    {
      key: "uz",
      value: "O'zbek tili",
      imagePath: require("../../../assets/icons/uz.png"),
    },
  ];
  return { changeLanguage, languageInfo };
};
