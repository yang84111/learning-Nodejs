/* 
    所有的CommonJS的模块都会被包装到一个函数中

    (function(exports, require, module, __filename, __dirname){
        // 模块代码会放在这里
    });
*/

    let a = 10
    let b = 20

    // console.log(arguments)
    // console.log(__filename)  //当前模块的绝对路径
    // console.log(__dirname)   // 当前模块所在目录的路径