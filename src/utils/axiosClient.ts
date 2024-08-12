import axios from "axios";

export const BASE_URL = "https://sw-api.starnavi.io";

function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = "GET";

async function request<T>(
  url: string,
  method: RequestMethod = "GET",
  data: unknown = null
): Promise<T> {
  const axiosConfig: Record<string, any> = {
    method,
    url: BASE_URL + url,
    timeout: 5000,
  };

  if (data) {
    axiosConfig.data = data;
    axiosConfig.headers = {
      "Content-Type": "application/json; charset=UTF-8",
    };
  }

  await wait(100);

  try {
    const response = await axios(axiosConfig);
    return response.data as T;
  } catch (error: any) {
    console.error("Request failed with error:", error);
    throw new Error(`Request failed: ${error.message}`);
  }
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};
