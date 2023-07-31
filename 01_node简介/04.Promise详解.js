// 对Promise进行链式调用时
//     后边的方法（then和catch）读取的是上一步的执行结果
//     如果上一步的执行结果不是当前想要的结果，则跳过当前的方法
/* 
    当Promise出现异常时，而整个调用链中没有出现catch，则异常会向外抛出
*/
const promise = new Promise((resolve, reject) => {
    resolve("每天都要看")
    // reject("每天都要看")
})

promise
    .then(r => console.log("第一个then", r))
    .catch(r => {
        console.log("异常处理", r)
        return "嘻嘻"
    })
    .then(r => console.log("第二个then", r))


/* 
    promise中的then，catch，finally这三个方法都会返回一个新的promise
    Promise中会存储回调函数的返回值
        finally
            -finally的返回值不会存储到新的promise中
*/

// promise
//     .then(result => {
//         console.log(result);
//         return "123123123"
//     })
//     .then(result => {
//         console.log(result);
//         return "456456456"
//     })


// promise.then((result) => {
//     console.log(result);
// }, (reason) => {
//     console.log(("出错了", reason));
// })

// function sum(a, b, cb) {
//     setTimeout(() => {
//         cb(a + b)
//     }, 1000)
// }

function sum(a, b) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 1000)
    })
}

// sum(123,456).then(result=>{
//     console.log(result);
// })

// sum(123, 456)
//     .then(result => result + 7)
//     .then(result => result + 8)
//     .then(result => console.log(result))