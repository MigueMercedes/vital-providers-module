import axios, { AxiosRequestConfig } from "axios";

export interface BaseQueryParams {
  url: string;
  gateway?: string;
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

const baseQuery = async <T>({
  url,
  gateway = process.env.NEXT_PUBLIC_BASE_API_URL,
  method = "GET",
  body,
  headers = {},
}: BaseQueryParams): Promise<T> => {
  const isServer = typeof window === "undefined";
  const token = isServer ? "" : localStorage.getItem("token");

  const config: AxiosRequestConfig = {
    url: `${gateway}${url}`,
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    data: method === "GET" ? undefined : body,
  };

  try {
    const response = await axios(config);

    return response.data?.resp
      ? response.data
      : ({
          resp: {
            codigo: 0,
            mensaje: "OK",
          },
          data: response.data,
        } as T);
  } catch (error: any) {
    const response = error.response;
    // this is for handling any possible error
    return response?.data
      ? response?.data
      : ({
          resp: {
            codigo: response?.data?.codigo || 500,
            mensaje:
              response?.data?.mensaje ||
              "Ha ocurrido un error inesperado, vuelve a intentarlo mas tarde.",
          },
        } as T);
  }
};

export default baseQuery;
