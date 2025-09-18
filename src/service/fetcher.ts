import { clean, toQueryString } from "@/utils/record";

class Fetcher {
  private requestInit: RequestInit = {
    headers: {
      "X-ListenAPI-Key": process.env.LISTEN_API_KEY ?? "",
    },
  } as RequestInit;

  /**
   * Sends a GET request to the specified path with the given parameters.
   * @param path The path to send the request to.
   * @param params The query parameters to include in the request.
   * @returns The fetch request promise.
   */
  async _get(path: string, params?: Record<string, unknown>) {
    const options = clean(params);
    const queryString = toQueryString(options);
    const uri = `${process.env.LISTEN_BASE_URL}${path}${queryString}`;
    console.log("Fetching:", uri);
    const res = fetch(uri, this.requestInit);
    return res;
  }
}

const fetcher = new Fetcher();

export default fetcher;
