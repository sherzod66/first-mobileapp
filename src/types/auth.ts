export type SignInResponse = {
  phone: string;
  otp: string;
};

export type SignUpResponse = {
  phone: string;
  otp: string;
};

export type VerifyResponse = {
  access_token: string;
  refresh_token: string;
};
