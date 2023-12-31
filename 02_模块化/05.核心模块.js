/* 
    核心模块是node中自带的模块，可以直接在node中使用
        -window是浏览器的宿主对象，node中没有
        -global是node中的全局对象，作用类似于window
        -ES标准下，全局对象的标准名应该是 globalThis

*/
// console.log(globalThis === global)  //true
// console.log(globalThis)

/* 
    核心模块
        process
            -表示当前的node的进程
            -通过该对象可以获取进程的信息或对进程做各种操作
            -如何使用
                1.process是一个全局变量，可以直接使用
                2.有哪些属性和方法：
                    process.exit()
                        -结束当前进程，终止node
                    process.nextTick(callback[,...args])
                        -将函数插入到tick队列中
                        -tick队列中的代码会在下一次事件循环之前执行
                            会在微任务队列和宏任务队列之前执行

                调用栈
                tick队列
                微任务队列
                宏任务队列
*/
// console.log(11111)
// process.exit(0)
// console.log(22222)
// console.log(33333)

setTimeout(() => {
    console.log(1)     // 宏任务队列
})

queueMicrotask(() => {
    console.log(2)
})  // 微任务队列

process.nextTick(() => {
    console.log(3)
})  // tick队列

console.log(4)  //调用栈