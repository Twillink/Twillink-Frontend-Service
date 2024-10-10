export type ErrorApiResponseType = {
  title?: string;
  message: string | object | undefined | null;
  type: 'none' | 'default' | 'info' | 'success' | 'danger' | 'warning';
  status?: number | undefined | null;
  data?: any;
};
