/* 
    ES 模块化
*/
// 向外部导出内容

export let a = 10
export let b = "孙悟空"
export const c = { name: "猪八戒" }

// 设置默认导出  一个模块中只有一个默认导出
export default function sum(a, b) {
    return a + b
}