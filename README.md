# WebAssembly Examples

各种 WebAssembly 的例子。可以使用下列激进版浏览器运行。

+ 黄色的 Chrome ([Chrome Canary](https://www.google.com/chrome/browser/canary.html))
+ 紫色的 Safari ([Safari Technology Preview](https://developer.apple.com/safari/technology-preview/))
+ 深蓝色的 Firefox ([Firefox Nightly](https://www.mozilla.org/en-US/firefox/nightly/all/))，*依然需要开启 flag*
+ 改头换面的 IE ([Microsoft Edge](https://www.microsoft.com/en-us/windows/microsoft-edge))

除了上边几个激进的浏览器，在主流版本里开启 flag 也是可以使用 WebAssembly ：

+ Chrome: 打开 `chrome://flags/#enable-webassembly`，选择 `enable`。
+ Firefox: 打开 `about:config` 将 `javascript.options.wasm` 设置为 `true`。

## Examples

每个例子里都有单独的 README。

+ [simple](./simple/): 使用 asm.js 编译成 WebAssembly 的例子。
+ [cpp](./cpp/): 用 C/C++ 编译成 WebAssembly 的例子。
+ [multi-wasm](./multi-wasm/): 使用多个 wasm 文件。
+ [js-api](./js-api/): 在 wasm 中调用 javascript API。
+ [rust](./rust/): 把 Rust 编译成 WebAssembly 的例子。
