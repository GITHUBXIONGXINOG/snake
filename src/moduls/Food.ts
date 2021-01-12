//定义食物类food
class Food{
    //定义一个属性表示食物所对应的元素
    element: HTMLElement

    constructor() {
        //获取页面中的food元素,并且赋值给element
        //!表示不为空
        this.element=document.getElementById('food')!

    }

    //定义一个获取食物x轴坐标的方法
    get X(){
        return this.element.offsetLeft
    }
    //定义一个获取食物y轴坐标的方法
    get Y(){
        return this.element.offsetTop
    }
    //修改食物位置
    change(){
        //生成一个随机的位置
        //食物的位置最小是0,最大时290
        //蛇移动一次就是1格,一格大小是10,食物坐标是整10
        //Math.random()-->0-1
        //Math.random() * 29 --> 0-29
        //Math.round 四舍五入取整
        let top = Math.round(Math.random() * 29) * 10
        let left = Math.round(Math.random() * 29) * 10
        this.element.style.left = left + 'px'
        this.element.style.top = top + 'px'

    }

}
//测试代码
// const food = new Food()
// console.log(food.X,food.Y)
// food.change()
// console.log(food.X,food.Y)


//把Food作为默认模块暴露出去
export default Food
