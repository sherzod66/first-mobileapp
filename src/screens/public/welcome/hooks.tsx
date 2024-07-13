import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { ROUTES } from "../../../navigation/ROUTES";

export const WelcomeHooks = () => {
  const [state, setState] = useState("");
  const [showedContent, setShowedContent] = useState(0);

  const navigation = useNavigation();
  const onAuthorizationPress = () => {
    navigation.navigate(ROUTES.PUBLIC.SIGN_UP as never);
  };
  const onPress = () => {
    if (showedContent === 4) {
      onAuthorizationPress();
    } else {
      setShowedContent(showedContent + 1);
    }
  };

  return {
    state,
    setState,
    showedContent,
    setShowedContent,
    onAuthorizationPress,
    onPress,
  };
};
