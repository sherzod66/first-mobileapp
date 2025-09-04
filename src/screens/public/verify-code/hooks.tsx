import { useEffect, useRef, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PublickStackParamList } from '../../../navigation/PublicStack';
import { PUBLIC } from '../../../navigation/ROUTES';
import { ApiService, AuthService } from '../../../services';
import { Response, SignInResponse, VerifyResponse } from '../../../types';
import { useRedux } from '../../../store/hooks';
import { setTokens } from '../../../store/slices/appSlice';
import { getFirebaseMessageToken } from '../../../utils/getFirebaseMessageToken';
import { useTranslation } from 'react-i18next';

export type VerifyCodeScreenNavigationProp = NativeStackNavigationProp<
  PublickStackParamList,
  PUBLIC.SIGN_IN
>;

export type VerifyCodeScreenRouteProp = RouteProp<
  PublickStackParamList,
  PUBLIC.VERIFY_CODE
>;

export const VerifyCodeHooks = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const firstInput = useRef<null>(null);
  const secondInput = useRef<null>(null);
  const thirdInput = useRef<null>(null);
  const fourInput = useRef<null>(null);

  const [ss, dispatch] = useRedux(s => s);

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
      setCode('' + value);
    } else {
      setCode(code + value);
    }
  };

  const onSubmit = async () => {
    try {
      const token = await getFirebaseMessageToken();
      const res = await ApiService.post<Response<VerifyResponse>>(
        '/auth/verify',
        {
          phone,
          otp: code,
          messageToken: token,
        },
      );
      console.log('response:', res);
      dispatch(setTokens(res.data));
      await AuthService.setToken(res.data);
    } catch (e) {
      console.log('e: ', JSON.stringify(e, null, 4));
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
      console.log('e: ', JSON.stringify(e, null, 4));
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
    t,
  };
};
