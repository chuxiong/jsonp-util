# jsonp

一个简单的`jsonp`工具



# Install

Node.js

```shell
npm install jsonp-util
```

browser

```html
<script src='jsonp.js'></script>
```



# API

### jsonp(url [,opt] [,fn])

- `url`（`String`） 请求接口
- `opts`（`object`）配置对象：
  - `params`（`object`）`GET` 查询参数
  - `timeout`（`Number`）请求超时阈值，默认`null`没有超时阈值
  - `cbKey`（`String`）`jsonp`参数`key`值，默认`callback`
  - `cbVal`（`String`） `jsonp`请求回调函数名字，默认`fengyu` + 时间毫秒值
- `fn`（`function`）jsonp 成功的回调函数。`fn`不存在则返回`Promise`



# Example

```js
jsonp('http://localhost:3000', {
    params: {
        ex1: '1',
        ex2: '2'
    }
    cbKey: 'call',
    cbVal: 'cbFn'
}, data => {
    console.log(data) //success
})
// url: http://localhost:3000?ex1=1&ex2=2&call=cbFn


// Promise
jsonp('url')
  .then(res => {console.log(res)}) // success
```



# License

### MIT