import Cookies from 'js-cookie';

export async function csrfFetch( url, options = {} ) {

  options.headers = options.headers || {};
  if (!options.headers['Content-Type']) {
    options.headers['Content-Type'] = 'application/json';
  }

  const csrfToken = document.cookie.match(/csrf_token=([^;]+)/)?.[1];
  if (csrfToken) {
    options.headers['X-CSRFToken'] = csrfToken; // Add CSRF token header
  }

  const response = await fetch(url, options);
  return response;

    // options.method = options.method || 'GET';

    // options.headers = options.headers || {};

    // options.credentials = 'include';

    // if (options.method.toUpperCase() !== 'GET') {
    //   const token = document.cookie
    //     .split('; ')
    //     .find((row) => row.startsWith('csrf_token='))
    //     .split('=')[1];
    //   options.headers['X-CSRF-Token'] = token;
    //   options.headers['Content-Type'] =
    //     options.headers['Content-Type'] || 'application/json';
    //   options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
    // }

    // const res =
		// 	(await window.fetch(url, options)) || (await fetch(url, options));

    // if ( res.status >= 400 ) throw res;

    // if (!res.ok) {
    //   throw new Error(res.statusText);
    // }

    // return res;

}

export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
  }