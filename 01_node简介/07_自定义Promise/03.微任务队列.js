
const PROMISE_STATE = {
    PENDING: 0,
    FULFILLED: 1,
    REJECTED: 2,
}
class MyPromise {
    // 创建一个变量用来存储Promise的结果
    #result
    // 创建一个变量来记录Promise的状态
    #state = PROMISE_STATE.PENDING  //pending 0  fulfilled 1  rejected 2

    // 创建一个变量来存储回调函数
    // 由于回调函数可以有多个，所以使用数组来存储回调函数
    #callbacks = []

    constructor(executor) {
        // 接受一个执行器作为参数
        //使用箭头函数或者bind(this)来固定this
        executor(this.#resolve.bind(this), this.#reject.bind(this)) //调用回调函数
    }
    // 私有方法用来存储数据
    #resolve(value) {
        // 禁止值被重复修改
        if (this.#state !== PROMISE_STATE.PENDING) return

        this.#result = value
        this.#state = PROMISE_STATE.FULFILLED  //数据填充成功

        //当resolve执行时，说明数据已经进来了，需要调用then的回调函数
        queueMicrotask(() => {
            // 调用callbacks中的所有函数
            this.#callbacks.forEach(cb => {
                cb()
            })
        })
    }

    #reject(reason) { }

    // 添加一个用来读取数据的then方法
    then(onFulfilled, onRejected) {
        if (this.#state === PROMISE_STATE.PENDING) {
            // 进入判断说明数据还没有进入Promise，将回调函数设置为callback的值
            // this.#callback = onFulfilled
            this.#callbacks.push(() => {
                onFulfilled(this.#result)
            })
        } else if (this.#state === PROMISE_STATE.FULFILLED) {
            // 目前then只能读取已经存储进Promise的数据，而不能读取异步存储的数据

            // onFulfilled(this.#result)

            /* 
                then的回调函数应该放到微任务队列当中执行，而不是直接调用
            */
            queueMicrotask(() => {
                onFulfilled(this.#result)
            })
        }
    }
}

const mp = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("孙悟空")
    }, 1000)

})

mp.then((result) => {
    console.log("读取数据1", result);
})
mp.then((result) => {
    console.log("读取数据2", result);
})
mp.then((result) => {
    console.log("读取数据3", result);
})



// const p = Promise.resolve("孙悟空")

// p.then(r => console.log("第一次读", r))
// p.then(r => console.log("第二次读", r))
