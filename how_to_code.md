# WebAssembly 实践：如何写代码

本文不讨论 WebAssembly 的发展，只是一步一步地教你怎么写 WebAssembly 的各种 demo。文中给出的例子我都放在 GitHub 中了（[仓库地址](https://github.com/Hanks10100/wasm-examples)），包含了编译脚本和编译好的可执行文件，只需再有一个支持 WebAssembly 的浏览器就可以直接运行。

## 配置开发调试环境

### 安装编译工具

**略。** 参考官方 [Developer’s Guide](http://webassembly.org/getting-started/developers-guide/) 和 [Advanced Tools](http://webassembly.org/getting-started/advanced-tools/)，需要安装的工具有：

+ [Emscripten](http://kripken.github.io/emscripten-site/)
+ [Binaryen](https://github.com/WebAssembly/binaryen)
+ [WABT (WebAssembly Binary Toolkit)](https://github.com/WebAssembly/wabt)

> 安装过程挺繁琐的，得本地 clone 代码再编译。

### 安装浏览器

作为一个新技术，之所以说 WebAssembly 前途明媚，不仅是因为 W3C 成立了专门的 [Webassembly Community Group](https://www.w3.org/community/webassembly/)，被标准认可；也是因为这次各大主流浏览器厂商（难得的）达成了一致，共同参与规范的讨论，在自家的浏览器里都实现了。

体验新技术，建议使用激进版浏览器，最新版本中都已经支持了 WebAssembly。

+ 黄色的 Chrome ([Chrome Canary](https://www.google.com/chrome/browser/canary.html))
+ 紫色的 Safari ([Safari Technology Preview](https://developer.apple.com/safari/technology-preview/))
+ 深蓝色的 Firefox ([Firefox Nightly](https://www.mozilla.org/en-US/firefox/nightly/all/))，*依然需要开启 flag*
+ 改头换面的 IE ([Microsoft Edge](https://www.microsoft.com/en-us/windows/microsoft-edge))

除了上边几个激进的浏览器，在主流版本里开启 flag 也是可以使用 WebAssembly 的：

+ Chrome: 打开 `chrome://flags/#enable-webassembly`，选择 `enable`。
+ Firefox: 打开 `about:config` 将 `javascript.options.wasm` 设置为 `true`。

## 快速体验 WebAssembly

想快速体验 WebAssembly ？最简单的办法就是找个支持 WebAssembly 的浏览器，打开控制台，把下列代码粘贴进去。

```js
WebAssembly.compile(new Uint8Array(`
  00 61 73 6d  0d 00 00 00  01 0c 02 60  02 7f 7f 01
  7f 60 01 7f  01 7f 03 03  02 00 01 07  10 02 03 61
  64 64 00 00  06 73 71 75  61 72 65 00  01 0a 13 02
  08 00 20 00  20 01 6a 0f  0b 08 00 20  00 20 00 6c
  0f 0b`.trim().split(/[\s\r\n]+/g).map(str => parseInt(str, 16))
)).then(module => {
  const instance = new WebAssembly.Instance(module)
  const { add, square } = instance.exports

  console.log('2 + 4 =', add(2, 4))
  console.log('3^2 =', square(3))
  console.log('(2 + 5)^2 =', square(add(2 + 5)))
})
```

里边这一坨奇怪的数字，就是 WebAssembly 的二进制源码。

### 运行结果

如果报错，说明你的浏览器不支持 WebAssembly ；如果没报错，代码的运行结果如下（还会返回一个 Promise）：

```
2 + 4 = 6
3^2 = 9
(2 + 5)^2 = 49
```

其中 `add` 和 `square` 虽然做的事情很简单，就是计算加法和平方，但那毕竟是由 WebAssembly 编译出来的接口，是硬生生地用二进制写出来的！

### 解释代码

上边的二进制源码一行 16 个数，有 4 行零两个，一共有 66 个数；每个数都是 8 位无符号十六进制整数，一共占 66 Byte。

WebAssembly 提供了 [JS API](http://webassembly.org/docs/js/)，其中 [`WebAssembly.compile`](http://webassembly.org/docs/js/#webassemblycompile) 可以用来编译 wasm 的二进制源码，它接受 BufferSource 格式的参数，返回一个 Promise。

那些代码里的前几行，目的就是把字符串转成 ArrayBuffer。先将字符串分割成普通数组，然后将普通数组转成 8 位无符号整数的数组；里的数字是十六进制的，所有用了 `parseInt(str, 16)`。

> 如果浏览器支持了通过 `<script type="module">` 的方式引入 wasm 文件，这些步骤都是多余的（[他们有这个计划](http://webassembly.org/docs/modules/#integration-with-es6-modules)）。

```js
new Uint8Array(
  `...`.trim().split(/[\s\r\n]+/g).map(str => parseInt(str, 16))
)
```

然后，如果 `WebAssembly.compile` 返回的 Promise *fulfilled* 了，`resolve` 方法的第一个参数就是 WebAssembly 的模块对象，是 [`WebAssembly.Module`](http://webassembly.org/docs/js/#webassemblymodule-constructor) 的实例。

然后使用 [`WebAssembly.Instance`](http://webassembly.org/docs/js/#webassemblyinstance-constructor) 将模块对象转成 WebAssembly 实例（第二个参数可以用来导入变量）。

通过 `instance.exports` 可以拿到 wasm 代码输出的接口，剩下的代码就和和普通 javascript 一样了。

### 注意数据类型

WebAssembly 是有明确的数据类型的，我那个例子里用的都是 32 位整型数（是不是看不出来…… 二进制里那些 `7f` 表示 `i32` 指令，意思就是32位整数），所以用 WebAssembly 编译出来的时候要注意数据类型。

如果你乱传数据，WebAssembly 程序也不会报错，因为在执行时会被动态转换（`dynamic_cast`），它支持传递[模糊类型的数据引用](http://webassembly.org/docs/gc/#opaque-reference-types)。但是你如果给函数传了个字符串或者超大的数，具体会被转成什么就说不清了，通常是转成 0。

```js
console.log(square('Tom')) // 0
console.log(add(2e+66, 3e+66)) // 0
console.log(2e+66 + 3e+66) // 5e+66
```

> 想了解更多关于数据类型的细节，可以参考：[Data Types](http://webassembly.org/docs/binary-encoding/#data-types)。

## 把 C/C++ 编译成 WebAssembly

二进制代码简直不是人写的😂，还有其他方式能写 WebAssembly 吗？

有，那就是把其他语言编译成 WebAssembly 的二进制。想实现这个效果，不得不用到各种编译工具了。其中一个比较关键的工具是 **[Emscripten](http://kripken.github.io/emscripten-site/)**，它基于 LLVM ，可以将 C/C++ 编译成 asm.js，使用 `WASM` 标志也可以直接生成 WebAssembly 二进制文件（后缀是 `.wasm`）。

```
         Emscripten
source.c   ----->  target.js

     Emscripten (with flag)
source.c   ----->  target.wasm
```

工具如何安装就不讲了，在此只提醒一点：**`emcc` 在 1.37 以上版本才支持直接生成 wasm 文件。**

### 编写 C 代码

> [项目代码地址](https://github.com/Hanks10100/wasm-examples/tree/master/cpp)

首先新建一个 C 语言文件，假设叫 `math.c` 吧，在里边实现 `add` 和 `square` 方法：

```c
// math.c

int add (int x, int y) {
  return x + y;
}

int square (int x) {
  return x * x;
}
```

然后执行 `emcc math.c -Os -s WASM=1 -s SIDE_MODULE=1 -o math.wasm` 就可以生成 wasm 文件了。

### 代码解释

C 语言代码一目了然，就是写了两个函数，由于 C 语言里的函数都是全局的，这两个函数默认都会被模块导出。

不知道你有没有注意到，这个文件里没写 `main` 函数！没写入口函数，它自身什么也执行不了，但是可以把它当成一个库文件使用，所以我在也是用模块的方式编译生成的 wasm 文件。

在 WebAssembly [官方给出的例子](http://webassembly.org/getting-started/developers-guide/#compile-and-run-a-simple-program)中，是写了 `main` 函数，而且是直接把 C 文件编译生成了 html + js + wasm 文件，实际上是生成了一个可以运行 demo，简单粗暴。生成的代码体积比较大，很难看懂里边具体做了什么。为了代码简洁，我这里只是生成 wasm 模块，没有其他多余文件，要想把它运行起来还需要自己写 html 和 js 读取并执行 wasm 文件。（[完整代码](https://github.com/Hanks10100/wasm-examples/tree/master/cpp)）

如果你也想直接生成可用的 demo，你可以再写个 `main` 函数，然后执行 `emcc math.c -s WASM=1 -o math.html` 就可以了。

## 如何运行 WebAssembly 二进制文件？

现在有了 wasm 文件，也有了支持 WebAssembly 的浏览器，怎么把它运行起来呢？

目前只有一种方式能调用 wasm 里的提供接口，那就是：**用 javascript ！**

WebAssembly 目前只设计也只实现了 javascript API，就像我刚开始提供的那个例子一样，只有通过 js 代码来编译、实例化才可以调用其中的接口。这也很好的说明了 WebAssembly 并不是要替代 javascript ，而是用来增强 javascript 和 Web 平台的能力的。我觉得 WebAssembly 更适合用于写模块，承接各种复杂的计算，如图像处理、3D运算、语音识别、视音频编码解码这种工作，主体程序还是要用 javascript 来写的。

### 编写加载函数 (loader)

在最开始的例子里，已经很简化的将执行 WebAssembly 的步骤写出来了，其实就是 【加载文件】->【转成 buffer】->【编译】->【实例化】。

```js
function loadWebAssembly (path) {
  return fetch(path)                   // 加载文件        
    .then(res => res.arrayBuffer())    // 转成 ArrayBuffer
    .then(WebAssembly.instantiate)     // 编译 + 实例化
    .then(mod => mod.instance)         // 提取生成都模块
}
```

代码其实很简单，使用了 [Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 来获取 wasm 文件，然后将其转换成 ArrayBuffer，然后使用 [`WebAssembly.instantiate`](http://webassembly.org/docs/js/#webassemblyinstantiate) 这个一步到位的方法来编译并初始化一个 WebAssembly 的实例。最后一步是从生成的模块中提取出真正的实例对象。

完成了上边的操作，就可以直接使用 `loadWebAssembly` 这个方法加载 wasm 文件了，它相当于是一个 wasm-loader ；返回值是一个 Promise，使用起来和普通的 js 函数没什么区别。从 `instance.exports` 中可以找到 wasm 文件输出的接口。

```js
loadWebAssembly('path/to/math.wasm')
  .then(instance => {
    const { add, square } = instance.exports
    // ...
  })
```

> 返回 Promise 不只是因为 fetch 函数，即使像最开始的例子那样把二进制硬编码，也必须要用 Promise 。因为 `WebAssembly.compile` 和 `WebAssembly.instantiate` 这些接口都是异步的，本身就返回 Promise 。

### 更完整的加载函数

如果你直接使用上边那个 `loadWebAssembly` 函数，有可能会执行失败，因为在 wasm 文件里，可能还会引入一些环境变量，在实例化的同时还需要初始化内存空间和变量映射表，也就是 [`WebAssembly.Memory`](http://webassembly.org/docs/js/#webassemblymemory-objects) 和 [`WebAssembly.Table`](http://webassembly.org/docs/js/#webassemblytable-objects)。

```js
/**
 * @param {String} path wasm 文件路径
 * @param {Object} imports 传递到 wasm 代码中的变量
 */
function loadWebAssembly (path, imports = {}) {
  return fetch(path)
    .then(response => response.arrayBuffer())
    .then(buffer => WebAssembly.compile(buffer))
    .then(module => {
      imports.env = imports.env || {}

      // 开辟内存空间
      imports.env.memoryBase = imports.env.memoryBase || 0
      if (!imports.env.memory) {
        imports.env.memory = new WebAssembly.Memory({ initial: 256 })
      }

      // 创建变量映射表
      imports.env.tableBase = imports.env.tableBase || 0
      if (!imports.env.table) {
        // 在 MVP 版本中 element 只能是 "anyfunc"
        imports.env.table = new WebAssembly.Table({ initial: 0, element: 'anyfunc' })
      }

      // 创建 WebAssembly 实例
      return new WebAssembly.Instance(module, imports)
    })
}
```

这个 `loadWebAssembly` 函数还接受第二个参数，表示要传递给 wasm 的变量，在初始化 WebAssembly 实例的时候，可以把一些接口传递给 wasm 代码。

### 调用 wasm 导出的接口

有了 `loadWebAssembly` 就可以调用 wasm 代码导出的接口了。

```js
loadWebAssembly('./math.wasm')
  .then(instance => {
    const add = instance.exports._add
    const square = instance.exports._square

    console.log('2 + 4 =', add(2, 4))
    console.log('3^2 =', square(3))
    console.log('(2 + 5)^2 =', square(add(2 + 5)))
  })
```

> 比较奇怪的一点是，用 C/C++ 导出的模块，属性名上默认都带了 `_` 前缀，asm.js 转成了 wasm 模块就不带。

### 在浏览器中的运行效果

参考刚才用 C 语言写出来的项目（[代码地址](https://github.com/Hanks10100/wasm-examples/tree/master/cpp)），直接用浏览器打开 index.html 即可。能看到这样的输出（我使用的是 Chrome Canany 浏览器）：

![Preview in Browser](./output)

如果你打开开发者工具的 Source 面板，能够看到 wasm 的源代码，浏览器已经将二进制转换成了对等的[文本指令]((http://webassembly.org/docs/text-format/))。

![View Source](./source)

> 虽然是一个 wasm 文件，浏览器将它解析成了两个（也有可能更多），是因为我们输出了两个接口，每个文件都对应了一个接口的定义。可以理解为 Canary 浏览器为了方便看源码实现的 sourcemap 功能。

## 把 asm.js 编译成 WebAssembly

> [项目代码地址](https://github.com/Hanks10100/wasm-examples/tree/master/simple)

刚才也介绍了 Emscripten 可以将 C/C++ 编译成 asm.js ，这是它的默认功能，加上 flag 才能生成 wasm 。

[asm.js](http://asmjs.org/) 是 javascript 的子集，是一种语法（不是一个前端工具库！），用了很多底层语法来标注数据类型，目的是提高 javascript 的运行效率，本身就是作为 C/C++ 编译的目标设计的（也不是给人写的），是一种中间表示层语法 (IR, Intermediate Representation)。asm.js 出生于 WebAssembly 之前， WebAssembly 借鉴了这个思路，做的更彻底一些，直接跳过 javascript ，设计了一套新的平台指令。

### 编写 asm.js 代码

```js
// math.js

function () {
  "use asm";

  function add (x, y) {
    x = x | 0;
    y = y | 0;
    return x + y | 0;
  }

  function square (x) {
    x = x | 0;
    return x * x | 0;
  }

  return {
    add: add,
    square: square
  };
}
```

上边定义了一个函数，并且声明了 `"use asm"`，这样一来，这个函数就会被视为 asm.js 的模块，里边可以添加方法，通过 `return` 暴露给外部使用。

不过，**只有 asm.js 才能转成 wasm，普通 javascript 是不行的！** 因为 javascript 是弱类型语言，用法也比较灵活，本身就很难编译成强类型的指令。这类脚本语言本身的设计就是 JIT (Just-in-time) 的，也就是在运行时才编译代码。而 wasm 是一个二进制格式，需要提前编译，比较接近于 AOT (Ahead-of-time) 的概念。

### 使用 Binaryen 和 WABT

虽然 Emscripten 能生成 asm.js 和 wasm ，但是却不能把 asm.js 转成 wasm 。因为它是基于 LLVM 的，然而 asm.js 没法编译成 LLVM IR (Intermediate Representation)。想要把 asm.js 编译成 WebAssembly，就要用到他们官方提供的 [Binaryen](https://github.com/WebAssembly/binaryen) 和 [WABT (WebAssembly Binary Toolkit)](https://github.com/WebAssembly/wabt) 工具了。

原理和编译方法参考官方文档，整个过程大概是这样的：

```
        Binaryen             WABT
math.js   --->   math.wast   --->   math.wasm
```

用脚本描述大概是这样：

```bash
asm2wasm math.js > math.wast
wast2wasm math.wast -o math.wasm
```

### wast 是什么格式？

WebAssembly 除了定义了二进制格式以外，还定义了一份对等的[文本描述](http://webassembly.org/docs/text-format/)。官方给出的是线性表示的例子，而 wast 是用 S-表达式([s-expressions](https://en.wikipedia.org/wiki/S-expression)) 描述的另一种文本格式。

上边的 asm.js 代码编译生成的 wast 文件是这样的：

```lisp
(module
  (export "add" (func $add))
  (export "square" (func $square))
  (func $add (param $x i32) (param $y i32) (result i32)
    (return
      (i32.add
        (get_local $x)
        (get_local $y)
      )
    )
  )
  (func $square (param $x i32) (result i32)
    (return
      (i32.mul
        (get_local $x)
        (get_local $x)
      )
    )
  )
)
```

和 lisp 挺像的，反正比二进制宜读多了😂。能看出来最外层声明了是一个模块，然后导出了两个函数，下边紧接着是两个函数的定义，包含了参数列表和返回值的类型声明。如果对这种类似 lisp 的语法比较熟悉，完全可以手写 wast 嘛，只要装个 `wast2wasm` 小工具就可以生成 wasm 了。或者在这个[在线 wast -> wasm 转换工具](https://cdn.rawgit.com/WebAssembly/wabt/e528a622caa77702209bf0c3654ca78456c41a52/demo/index.html) 里写 wast 代码，可以实时预览编译的结果，也可以下载生成的 wasm 文件。

## 在 WebAssembly 中调用 Web API

在 js 里能调用 wasm 里定义的方法，反过来，wasm 里能不能调用 javascript 写的方法呢？能不能调用平台提供的方法（Web API）呢？

当然是可以的。不过在 [MVP (Minimum Viable Product)](http://webassembly.org/docs/mvp/) 版本里实现的功能有限。要想在 wasm 里调用 Web API，需要在创建 WebAssembly 实例的时候把 Web API 传递过去才可以。具体做法可以参考上边写的那个比较复杂的 loader 。

### 向 wasm 中传递 js 变量

在有了 `loadWebAssembly` 这个方法之后，就可以给 wasm 代码传递 js 变量和函数了。

```js
const imports = {
  Math,
  objects: {
    count: 2333
  },
  methods: {
    output (message) {
      console.log(`-----> ${message} <-----`)
      return message
    }
  }
}

loadWebAssembly('path/to/source.wasm', imports)
  .then(instance => {
    // ...
  })
```

上边的代码里给 wasm 模块传递了三个对象： `Math` 、`objects` 、`methods`，分别对应了 Web API 、普通 js 对象、使用了 Web API 的 js 函数。属性名和变量名都并没什么限制，是可以随便起的，把它传递给 `loadWebAssembly` 方法的第二个参数就可以传递到 wasm 模块中了。

真正实现传递的是 `loadWebAssembly` 的这行代码：

```js
new WebAssembly.Instance(module, imports)
```

### 获取并使用从 js 传递的变量

既然 wasm 的代码最外层声明的是一个模块，我们能向外 `export` 接口，当然也可以 `import` 接口。

```lisp
(module
  (import "objects" "count" (global $count f32))
  (import "methods" "output" (func $output (param f32)))
  (import "Math" "sin" (func $sin (param f32) (result f32)))
  (export "test" (func $test))
  (func $test (param $x f32)
    (call $output (f32.const 42))
    (call $output (get_global $count))
    (call $output (get_local $x))
    (call $output
      (call $sin
        (get_local $x)
      )
    )
  )
)
```

这段代码也是在最外层声明了一个 `module`，然后前三行是 `import` 语句。首先从 `objects` 中导入 `count` 属性，并且在代码里声明为全局的 `$count` 变量，格式是 32 位浮点数；然后从 `methods` 中导入 `output` 方法，声明为一个接受 32 位浮点数作为参数的函数 `$output`；最后从 `Math` 中导入 `sin` 方法，声明为一个接受 32 位浮点数作为参数的函数 `$sin`，返回值也是 32 位浮点数。这样一来就把 js 传递的对象转成了自身模块中可以使用变量。

接下来是定义并且导出了一个 `test` 函数，接受一个 32 位浮点数作为参数。在 wast 的语法里 `call` 指令用来调用函数，`get_global` 用来获取全局变量的值，`get_local` 用来获取局部变量的值，只能在函数定义中使用。这样来看，`test` 函数 里执行了四条命令，首先调用 `$output` 输出了一个常量 42；然后调用 `$output` 输出全局变量 `$count` ，这个值是通过 `import` 获取来的；接着又输出了函数的参数 `$x`；最后输出了函数参数 `$x` 调用 Web API `$sin` 计算后的结果。

### 编译执行

通过 `west2wasm source.wast -o source.wasm` 可以生成 wasm 文件，然后使用 `loadWebAssembly` 编译 wasm 文件。

```js
loadWebAssembly('path/to/source.wasm', imports)
  .then(instance => {
    const { test } = instance.exports
    test(2333)
  })
```

会得到如下结果：

```
-----> 42 <-----
-----> 666 <-----
-----> 2333 <-----
-----> 0.9332447648048401 <-----
```

代码虽然简单，但是实现了向 wasm 中传递变量，并且能在 wasm 中调用 `Math` 和 `console` 这种平台接口。如果想要绕过 javascript 直接给 wasm 传参，或者在 wasm 里直接引用 DOM API，就得看他们下一步的计划了。参考 [GC / DOM / Web API Integration](http://webassembly.org/docs/gc/) 。

## 结语

根据这篇《如何画马》的教程，相信你很快就能用 WebAssembly 写出来 [Angry Bots](http://webassembly.org/demo/) 这样的游戏啦~ 💪

![如何画马]()
