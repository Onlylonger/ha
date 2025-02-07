# Module Federtaion

Module Federation 功能源自于 webpack@5 中，关于它的实现原理是怎样呢？以下有一些参考文章，让我们尝试去了解其中的内容并总结一份文章出来。

首先以下是我参考的一些文章：

- [最详细的 Module Federation 的实现原理讲解](https://juejin.cn/post/7151281452716392462)
- [一文通透讲解 webpack5 module federation](https://juejin.cn/post/7048125682861703181)
- [Module Federation](https://module-federation.io/zh/guide/start/quick-start.html)
- [blog1](https://www.sysuke.com/fe/webpack/buildAndModuleFederation.html)
- [解析 Module Federation 的 Shared 原理](https://juejin.cn/post/7053737966753021965)
- [blog2](https://jonny-wei.github.io/blog/devops/webpack/module-federation.html)
- [blog3](https://blog.towavephone.com/module-federation-principle-research/)
- [webpack4 module federation](https://zhuanlan.zhihu.com/p/574738059)
- [Module Federation 没有魔法仅仅是异步 chunk](https://zhuanlan.zhihu.com/p/352936804)

## 关于 MF 的优劣

先举个实际例子来讨论：

公司有一个商城技术开发团队，开发了 pc web 网站， mobile web 网站，以及 后台系统 等网站。 各自都是不同团队独立部署和维护的，但是有些可能是公用的，MF 和 NPM 都是其中的方案。但是 NPM 每次迭代都需要 调用方 手动更新，而 MF 则只需要 provider 一方更新即可。

可以看到其中 3 点：各自团队独立开发以及部署，"热更新"，以及一个隐藏点：按需加载（动态 import 处理的）。

其中"热更新" 这点来说，对于 consumer 来说，由于是 runtime 加载的 js 文件，所以每次刷新都会及时生效。这个有利有弊，好处在于不用 comsumer 手动再更新，坏处则在于对于不可靠的 provider 很容易出问题。因此当使用这个方式的时候，如何规避此风险是需要解决的问题之一。

让我们更深入的继续聊聊上面的例子：

后台系统需要使用 pc web 网站的 `button` 组件，后台系统使用的是 typescript 编写的，当后台系统尝试接入并且使用 pc web MF 暴露的模块的时候，发现以下几点

- 目前只支持 webpack,rspack....
- shared 配置使用有些模糊
- 并没有 类型声明 提供帮助，编程效率打了些折扣
- 单元测试 出错
- 开发中，如何查看 provider 组件的状态。

应用场景可以查看[官网](https://webpack.js.org/concepts/module-federation/#use-cases). 翻译来说。

1. 你可以各自应用提供自己可复用的组件，给其它应用使用，例如上面的举例。
2. 你可以提供一个组件库应用，对外提供可复用模块。

## 使用例子

略过...

## 原理解析

我们基于 webpack@5 的 示例 流程来进行解析，分为 构建、运行时 解析，其中构建主要是分析 webpack 是如何根据 ModuleFederation 插件进行构建生成最终的代码.....

当没有 MF 模块的时候，webpack 会提供一些运行时帮助函数，用于加载我们的代码。假设你 webpack 配置有如下

```js
module.exports = {
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "all",
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },
};
```

产物会有 runtime,vendors,main 以及其它异步 js 文件。细看下 index.html 会发现，执行有先后. 优先执行 runtime, 其次 vendors. 最后是 main.

runtime 中可以进一步分析拆解。我们可以用个简化版来表述

```js
(() => {
  // webpackBootstrap
  "use strict";
  var __webpack_modules__ = {};

  // The module cache
  var __webpack_module_cache__ = {};

  // The require function
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    // Create a new module (and put it into the cache)
    var module = (__webpack_module_cache__[moduleId] = {
      id: moduleId,
      loaded: false,
      exports: {},
    });

    // Execute the module function
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

    // Flag the module as loaded
    module.loaded = true;

    // Return the exports of the module
    return module.exports;
  }

  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = __webpack_modules__;

  /* webpack/runtime/chunk loaded */
  (() => {
    var deferred = [];
    __webpack_require__.O = (result, chunkIds, fn, priority) => {
      if (chunkIds) {
        priority = priority || 0;
        for (
          var i = deferred.length;
          i > 0 && deferred[i - 1][2] > priority;
          i--
        )
          deferred[i] = deferred[i - 1];
        deferred[i] = [chunkIds, fn, priority];
        return;
      }
      var notFulfilled = Infinity;
      for (var i = 0; i < deferred.length; i++) {
        var [chunkIds, fn, priority] = deferred[i];
        var fulfilled = true;
        for (var j = 0; j < chunkIds.length; j++) {
          if (
            (priority & (1 === 0) || notFulfilled >= priority) &&
            Object.keys(__webpack_require__.O).every((key) =>
              __webpack_require__.O[key](chunkIds[j])
            )
          ) {
            chunkIds.splice(j--, 1);
          } else {
            fulfilled = false;
            if (priority < notFulfilled) notFulfilled = priority;
          }
        }
        if (fulfilled) {
          deferred.splice(i--, 1);
          var r = fn();
          if (r !== undefined) result = r;
        }
      }
      return result;
    };
  })();

  /* webpack/runtime/define property getters */
  (() => {
    // define getter functions for harmony exports
    __webpack_require__.d = (exports, definition) => {
      for (var key in definition) {
        if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
        }
      }
    };
  })();

  /* webpack/runtime/hasOwnProperty shorthand */
  (() => {
    __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
  })();

  /* webpack/runtime/make namespace object */
  (() => {
    // define __esModule on exports
    __webpack_require__.r = (exports) => {
      if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
      }
      Object.defineProperty(exports, "__esModule", { value: true });
    };
  })();

  /* webpack/runtime/node module decorator */
  (() => {
    __webpack_require__.nmd = (module) => {
      module.paths = [];
      if (!module.children) module.children = [];
      return module;
    };
  })();

  /* webpack/runtime/jsonp chunk loading */
  (() => {
    // no baseURI

    // object to store loaded and loading chunks
    // undefined = chunk not loaded, null = chunk preloaded/prefetched
    // [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
    var installedChunks = {
      runtime: 0,
    };

    // no chunk on demand loading

    // no prefetching

    // no preloaded

    // no HMR

    // no HMR manifest

    __webpack_require__.O.j = (chunkId) => installedChunks[chunkId] === 0;

    // install a JSONP callback for chunk loading
    var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
      var [chunkIds, moreModules, runtime] = data;
      // add "moreModules" to the modules object,
      // then flag all "chunkIds" as loaded and fire callback
      var moduleId,
        chunkId,
        i = 0;
      if (chunkIds.some((id) => installedChunks[id] !== 0)) {
        for (moduleId in moreModules) {
          if (__webpack_require__.o(moreModules, moduleId)) {
            __webpack_require__.m[moduleId] = moreModules[moduleId];
          }
        }
        if (runtime) var result = runtime(__webpack_require__);
      }
      if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
      for (; i < chunkIds.length; i++) {
        chunkId = chunkIds[i];
        if (
          __webpack_require__.o(installedChunks, chunkId) &&
          installedChunks[chunkId]
        ) {
          installedChunks[chunkId][0]();
        }
        installedChunks[chunkId] = 0;
      }
      return __webpack_require__.O(result);
    };

    var chunkLoadingGlobal = (self["webpackChunktest_webpack"] =
      self["webpackChunktest_webpack"] || []);
    chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
    chunkLoadingGlobal.push = webpackJsonpCallback.bind(
      null,
      chunkLoadingGlobal.push.bind(chunkLoadingGlobal)
    );
  })();
})();
```

往往 vendor 结构是这样的

```js
"use strict";
(self["webpackChunktest_webpack"] =
  self["webpackChunktest_webpack"] || []).push([
  ["vendors"],
  {
    "./node_modules/react-dom/cjs/react-dom.development.js": (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {},
    "./node_modules/react-dom/index.js": (
      module,
      __unused_webpack_exports,
      __webpack_require__
    ) => {},
    "./node_modules/scheduler/index.js": (
      module,
      __unused_webpack_exports,
      __webpack_require__
    ) => {},
  },
]);
```

其中 \__unused_webpack_ 表示占位参数，实际并没有使用。

而 main 的结构是这样的

```js
"use strict";
(self["webpackChunktest_webpack"] =
  self["webpackChunktest_webpack"] || []).push([
  ["main"],
  {
    "./src/app/App.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__);
      __webpack_require__.d(__webpack_exports__, {
        App: () => /* binding */ App,
      });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js"
      );
      var _button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ../button */ "./src/button/index.ts"
      );
      var _dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ../dialog */ "./src/dialog/index.ts"
      );

      function App() {
        return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [
            "app",
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              _button__WEBPACK_IMPORTED_MODULE_1__.Button,
              {}
            ),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              _dialog__WEBPACK_IMPORTED_MODULE_2__.Dialog,
              {}
            ),
          ],
        });
      }
    },

    "./src/app/index.ts": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__);
      __webpack_require__.d(__webpack_exports__, {
        App: () => /* reexport safe */ _App__WEBPACK_IMPORTED_MODULE_0__.App,
      });
      var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! ./App */ "./src/app/App.tsx"
      );
    },

    "./src/button/button.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__);
      __webpack_require__.d(__webpack_exports__, {
        Button: () => /* binding */ Button,
      });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js"
      );

      function Button() {
        return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
          "button",
          { children: "nihao" }
        );
      }
    },

    "./src/button/index.ts": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__);
      __webpack_require__.d(__webpack_exports__, {
        Button: () =>
          /* reexport safe */ _button__WEBPACK_IMPORTED_MODULE_0__.Button,
      });
      var _button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! ./button */ "./src/button/button.tsx"
      );
    },

    "./src/dialog/dialog.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__);
      __webpack_require__.d(__webpack_exports__, {
        Dialog: () => /* binding */ Dialog,
      });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js"
      );

      function Dialog() {
        return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
          children: "dialog",
        });
      }
    },

    "./src/dialog/index.ts": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__);
      __webpack_require__.d(__webpack_exports__, {
        Dialog: () =>
          /* reexport safe */ _dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog,
      });
      var _dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! ./dialog */ "./src/dialog/dialog.tsx"
      );
    },

    "./src/main.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__);
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js"
      );
      var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! react-dom/client */ "./node_modules/react-dom/client.js"
      );
      var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./app */ "./src/app/index.ts"
      );

      var appEl = document.getElementById("app");
      if (appEl) {
        var app = (0, react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(
          appEl
        );
        app.render(
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
            _app__WEBPACK_IMPORTED_MODULE_2__.App,
            {}
          )
        );
      }
    },
  },
  (__webpack_require__) => {
    // webpackRuntimeModules
    var __webpack_exec__ = (moduleId) =>
      __webpack_require__((__webpack_require__.s = moduleId));
    __webpack_require__.O(0, ["vendors"], () =>
      __webpack_exec__("./src/main.tsx")
    );
    var __webpack_exports__ = __webpack_require__.O();
  },
]);
```

按照 runtime.js --> vendors.js --> main.js 的逻辑执行，分为几个步骤

1. runtime 负责初始化 webpack 相关函数，便于 vendors 和 main 调用.
2. vendors 调用 webpack push helper 方法，传递 ['vendors'], {"./node_modules/react-dom/cjs/react-dom.development.js": (module,exports,require) => {}} 参数
3. main 和 vendors 类似，但是会增加第 3 个参数，(require) => {}.
