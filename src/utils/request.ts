import axios, { AxiosRequestConfig } from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.timeout = 50000;
axios.defaults.headers.common['Content-Type'] = 'application/json';

type RequestOpts = Omit<AxiosRequestConfig, 'url'>;

const safeRequest = <T>(url: string, options: RequestOpts): Promise<T> => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      ...options,
      url,
    }).then(
      (res) => {
        if (res) {
          resolve(res.data);
        } else {
          reject(res);
        }
      },
      (err) => {
        reject(err);
      },
    );
  });
};

/**
 * get
 * @param url
 * @param opts
 * @returns {Promise}
 */
const get = <T>(url: string, opts: RequestOpts = {}): Promise<T> => {
  return safeRequest(url, opts);
};

/**
 * post
 * @param url
 * @param opts
 * @returns {Promise}
 */
const post = <T>(url: string, opts: RequestOpts = {}): Promise<T> => {
  return safeRequest(url, {
    ...opts,
    method: 'POST',
  });
};

/**
 * put
 * @param url
 * @param opts
 * @returns {Promise}
 */
const put = <T>(url: string, opts: RequestOpts = {}): Promise<T> => {
  return safeRequest(url, {
    ...opts,
    method: 'PUT',
  });
};

export default {
  get,
  post,
  put,
};
