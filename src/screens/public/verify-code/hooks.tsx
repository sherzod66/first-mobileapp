import { useEffect, useRef, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PublickStackParamList } from "../../../navigation/PublicStack";
import { PUBLIC } from "../../../navigation/ROUTES";
import { ApiService, AuthService } from "../../../services";
import { Response, SignInResponse, VerifyResponse } from "../../../types";
import { useRedux } from "../../../store/hooks";
import { setTokens } from "../../../store/slices/appSlice";
import { setOauthRequestInterceptor } from "../../../utils/axios";

export type VerifyCodeScreenNavigationProp = NativeStackNavigationProp<
  PublickStackParamList,
  PUBLIC.SIGN_IN
>;

export type VerifyCodeScreenRouteProp = RouteProp<
  PublickStackParamList,
  PUBLIC.VERIFY_CODE
>;

export const VerifyCodeHooks = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const firstInput = useRef<any>();
  const secondInput = useRef<any>();
  const thirdInput = useRef<any>();
  const fourInput = useRef<any>();

  const [ss, dispatch] = useRedux((s) => s);

  const navigation = useNavigation<VerifyCodeScreenNavigationProp>();
  const route = useRoute<VerifyCodeScreenRouteProp>();
  const { phone, from } = route.params;

  useEffect(() => {
    if (code.length === 4) {
      onSubmit();
    }
  }, [code]);

  const onCodeChange = (value: string) => {
    if (code.length === 4) {
      setCode("" + value);
    } else {
      setCode(code + value);
    }
  };

  const onSubmit = async () => {
    try {
      const res = await ApiService.post<Response<VerifyResponse>>(
        "/auth/verify",
        {
          phone,
          otp: code,
        }
      );

      dispatch(setTokens(res.data));
      await AuthService.setToken(res.data);
    } catch (e) {
      console.log("e: ", JSON.stringify(e, null, 4));
    }
  };

  const onChangePhoneNumber = () => {
    navigation.navigate(PUBLIC.SIGN_IN);
  };

  const onResend = async () => {
    try {
      setLoading(true);

      await ApiService.post<Response<SignInResponse>>(`/auth/${from}`, {
        phone,
      });

      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log("e: ", JSON.stringify(e, null, 4));
    }
  };

  return {
    code,
    setCode,
    firstInput,
    secondInput,
    thirdInput,
    fourInput,
    onCodeChange,
    onResend,
    onChangePhoneNumber,
    phone,
    loading,
  };
};
