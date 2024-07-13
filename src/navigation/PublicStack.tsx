import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  SelectLanguage,
  Welcome,
  SignIn,
  SignUp,
  VerifyCode,
} from "../screens/public";
import { ROUTES } from "./ROUTES";

export type PublickStackParamList = {
  [ROUTES.PUBLIC.WELCOME]: undefined;
  [ROUTES.PUBLIC.SIGN_IN]: undefined;
  [ROUTES.PUBLIC.SIGN_UP]: undefined;
  [ROUTES.PUBLIC.VERIFY_CODE]: {
    phone: string;
    from: "signin" | "signup";
  };
};

const Stack = createNativeStackNavigator<PublickStackParamList>();

const PublicStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ gestureEnabled: false, headerShown: false }}
    >
      {/* <Stack.Screen
        name={ROUTES.PUBLIC.SELECT_LANGUAGE}
        component={SelectLanguage}
      /> */}
      <Stack.Screen name={ROUTES.PUBLIC.WELCOME} component={Welcome} />
      <Stack.Screen name={ROUTES.PUBLIC.SIGN_IN} component={SignIn} />
      <Stack.Screen name={ROUTES.PUBLIC.SIGN_UP} component={SignUp} />
      <Stack.Screen name={ROUTES.PUBLIC.VERIFY_CODE} component={VerifyCode} />
    </Stack.Navigator>
  );
};

export default PublicStack;
