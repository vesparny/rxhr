import $$observable from 'symbol-observable'

const encodeParams = params =>
  Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&')

const buildUrl = (url, params) =>
  params ? url + '?' + encodeParams(params) : url

const fromResponseHeaderString = headersString => {
  const headers = {}
  headersString.split('\n').forEach(line => {
    const index = line.indexOf(':')
    if (index > 0) headers[line.slice(0, index)] = line.slice(index + 1).trim()
  })
  return headers
}

const noop = () => {}

const rxhr = options => {
  return {
    subscribe (onNext, onError, onComplete) {
      let observer = onNext
      let request = new XMLHttpRequest()
      if (typeof onNext === 'function') {
        observer = {
          next: onNext,
          error: onError || noop,
          complete: onComplete || noop
        }
      }
      try {
        const buildResponse = err => {
          const body =
            err ||
            (!options.responseType || options.responseType === 'text'
              ? request.responseText
              : request.response)
          let response = {
            // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
            status: request.status === 1223 ? 204 : request.status,
            ok: request.status >= 200 && request.status < 300,
            type: err ? 'error' : 'default',
            statusText: err ? request.statusText : request.statusText || 'OK',
            headers: fromResponseHeaderString(request.getAllResponseHeaders()),
            url: request.responseURL,
            text: () =>
              typeof body === 'object' ? JSON.stringify(body) : body,
            json: () => (typeof body === 'string' ? JSON.parse(body) : body),
            blob: () => new Blob([body])
          }
          return response
        }

        const onReqLoad = () => {
          let response = buildResponse()
          if (response.ok) {
            observer.next(response)
            observer.complete()
            return
          }
          observer.error(response)
        }

        const onReqError = () => {
          const response = buildResponse(new Error('Network Error'))
          observer.error(response)
        }

        const onReqTimeout = () => {
          const response = buildResponse(new Error('ECONNABORTED'))
          observer.error(response)
        }

        const onReqProgress = evt => {
          typeof options.progressObserver[$$observable] === 'function'
            ? options.progressObserver.next(evt)
            : options.progressObserver(evt)
        }

        request.open(
          options.method.toUpperCase(),
          buildUrl(options.url, options.params)
        )
        // response type
        options.responseType && (request.responseType = options.responseType)
        // with credentials
        request.withCredentials = options.withCredentials === true
        // headers
        for (let i in options.headers) {
          request.setRequestHeader(i, options.headers[i])
        }
        // timeout in ms
        request.timeout = options.timeout

        request.send(options.body || null)

        request.onload = onReqLoad
        request.onerror = onReqError
        request.ontimeout = onReqTimeout
        if (options.progressObserver) {
          request.onprogress = onReqProgress
        }
      } catch (err) {
        observer.error(err)
      }
      return {
        unsubscribe () {
          request.abort()
        }
      }
    },
    [$$observable] () {
      return this
    }
  }
}

export default rxhr
