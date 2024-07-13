export type Response<D> = {
  success: boolean;
  data: D;
  error?: any | null;
};
