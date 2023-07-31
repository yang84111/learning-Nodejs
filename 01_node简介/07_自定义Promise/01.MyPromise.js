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
    }


    #reject(reason) { }

    // 添加一个用来读取数据的then方法
    then(onFulfilled, onRejected) {
        if (this.#state === PROMISE_STATE.FULFILLED) {
            onFulfilled(this.#result)
        }
    }
}

const mp = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("孙悟空")
    }, 1000)

})

mp.then((result) => {
    console.log("读取数据", result);
})

