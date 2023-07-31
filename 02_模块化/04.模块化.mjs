/* 
默认情况下，node中的模块化标准是CommonJS
    要想使用ES的模块化，可以采用以下两种方案
        1.使用mjs作为扩展名
        2.修改package.json将模块化规范设置为ES模块
            当设置"type": "module" 当前项目下的所有的js文件都默认为es module
*/

// console.log(module)

// 导入m4模块,es模块不能省略扩展名（官方标准）
// import { a, b, c } from "./m4.mjs"
// console.log(a,b,c);

// 通过as来指定别名
// import { a as hello, b, c } from "./m4.mjs"
// console.log(hello)

// 开发时尽量避免import * 的情况
// import * as m4 from "./m4.mjs"
// console.log(m4.a)

// 导入模块的默认导出
// 默认导出的内容可以随意命名
import sum, { a, b, c } from "./m4.mjs"

console.log(sum, a)

// import { a, b, c } from "./m4.mjs"
// 通过ES模块化导入的内容都是常量
// ES模块都是运行在严格模式下的
// ES模块化在浏览器中一样支持，通常会结合打包工具使用
