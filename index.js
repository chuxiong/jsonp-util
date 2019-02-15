const jsonp = (url, opt = {}, fn = null) => {

  if (typeof opt === 'function') {
    fn = opt
    opt = {}
  }

  let { params : params = {}, timeout = null, cbKey = 'callback', cbVal = 'fengyu' } = opt
  let timer = null

  if (cbVal === 'fengyu') {
    cbVal += Date.now()
  }

  let s = ''
  for (let k in params) {
    s += `&${k}=${encodeURIComponent(params[k])}`
  }
  s += `&${cbKey}=${cbVal}`

  s = s.slice(1)

  url += (~url.indexOf('?') ? '&' : '?') + s

  var script = document.createElement('script')

  var remove = () => {
    timer && clearTimeout(timer)
    document.head.removeChild(script)
    window[cbVal] = undefined
  }

  script.src = url


  if (typeof fn === 'function') {
    window[cbVal] = data => {
      fn(data)
      remove()
    }

    document.head.appendChild(script)
    return
  }

  return new Promise((resolve, reject) => {
    // 请求超时
    if (timeout) {
      timer = setTimeout(() => {
        reject(new Error('jsonp request timeout'))
        remove()
      }, timeout)
    }
    // 正常
    window[cbVal] = data => {
      resolve(data)
      remove()
    }

    document.head.appendChild(script)
  })
}