function ajax(options) {
  var defaults = {
    type: "get",
    url: "",
    data: {},
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    success: function () {},
    error: function () {},
  };
  options = { ...defaults, ...options };

  // 封装 params 参数
  var params = "";
  for (var attr in options.data) {
    params += arr + "=" + options.data[attr] + "&";
  }
  params = params.substring(0, params.length - 1);

  // 返回一个Promise 对象
  return new Promise((resolve, reject) => {
    // 1.执行异步 ajax 请求
    //创建xhr对象
    var xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    // 打开连接（初始化请求，没有发送请求）
    xhr.open(options.method, options.url);
    // 发送请求
    if (options.type == "post") {
      var ContentType = defaults.header["Content-Type"];
      //设置post 请求头
      xhr.setRequestHeader("Content-Type", ContentType);
      //判断用户希望的请求参数格式的类型
      if (ContentType == "application/json") {
        //如果类型为json
        //向服务器端传递json数据格式的参数
        xhr.send(JSON.stringify(defaults.data));
      } else {
        // 向服务器端传递普通类型的请求参数
        xhr.send(params);
      }
    } else {
      //get 发送请求
      xhr.send();
    }

    xhr.onload = function () {
      var contentType = xhr.getResponseHeader("Content-Type");
      var responseText = xhr.responseText; //服务端返回的数据
      if (contentType.includes("application/json")) {
        //将json字符串转换为json对象
        responseText = JSON.parse(responseText);
      }
      if (this.status === 200) {
        resolve(responseText);
      } else {
        reject("加载失败");
      }
    };
    xhr.onerror = function () {
      reject(this);
    };
  });
}
