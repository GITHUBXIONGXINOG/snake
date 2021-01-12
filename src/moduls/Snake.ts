class Snake{
    //表示蛇头的元素
    head: HTMLElement
    //表示蛇的身体(包括蛇头)
    //HTMLCollection 是一个接口，表示 HTML 元素的集合，它提供了可以遍历列表的方法和属性。
    //               可以实时刷新
    bodies: HTMLCollection
    //蛇的容器
    element: HTMLElement

    constructor() {
        this.element = document.getElementById('snake')!
        //querySelect只选取第一次匹配的,就是头
        //as HTMLElement 类型断言 告诉是HTMLElement类型
        this.head = document.querySelector('#snake > div') as HTMLElement
        this.bodies = this.element.getElementsByTagName('div')
    }

    //获取蛇的坐标(蛇头坐标)
    get X(){
        return this.head.offsetLeft
    }
    //获取蛇的Y轴坐标
    get Y(){
        return this.head.offsetTop
    }
    //设置蛇头的坐标
    set X(value: number){
        //如果新值和旧值相同,则直接返回不再修改
        if (this.X === value){
            return
        }
        //X的合法范围 0-290之间,超出表示撞墙
        if (value < 0 || value > 290){
            //进入判断,说明蛇撞墙了
            throw new Error('蛇撞墙了! ')
        }

        //修改X时,是在修改水平坐标,蛇在左右移动,蛇在向左移动时,不能反向掉头,反之亦然
        if (this.bodies[1]&& (this.bodies[1] as HTMLElement).offsetLeft === value){
            // console.log('水平方向发生掉头')
            //如果发生了掉头,让蛇向反方向继续移动
            if (value > this.X){
                //left的值比当前的X大,说明向右走,此时发生掉头,应该使蛇继续向左走
                value = this.X - 10

            }else {
                //向右走
                value = this.X + 10
            }
        }

        //移动身体
        this.moveBody()

        this.head.style.left = value + 'px'

        //检测蛇头和每一个身体有没有重复
        this.checkHeadBody()
    }

    set Y(value: number){
        if (this.Y === value){
            return
        }

        //Y的合法范围 0-290之间,超出表示撞墙
        if (value < 0 || value > 290){
            //进入判断,说明蛇撞墙了
            throw new Error('蛇撞墙了! ')
        }

        //修改X时,是在修改水平坐标,蛇在左右移动,蛇在向左移动时,不能反向掉头,反之亦然
        if (this.bodies[1]&& (this.bodies[1] as HTMLElement).offsetTop === value){
            //如果发生了掉头,让蛇向反方向继续移动
            if (value > this.Y){
                value = this.Y - 10

            }else {
                value = this.Y + 10
            }
        }




        //移动身体
        this.moveBody()

        this.head.style.top = value + 'px'

        //检测蛇头和每一个身体有没有重复
        this.checkHeadBody()
    }


    //蛇增加身体的方法
    addBody(){
        //向element 中添加一个div
        //insertAdjacentHTML 方法：在指定的地方插入html标签语句
        //beforeend 在结束标签之前插入
        this.element.insertAdjacentHTML('beforeend','<div></div>')
    }

    //神身体移动的方法
    moveBody(){
        /*
        *   将后边的身体设置为前边身体的位置
        *   第4节 = 第3节的位置
        *   第3节 = 第2节的位置
        *   第2节 = 蛇头位置
        * */
        //遍历获取所有的身体
        for (let i = this.bodies.length-1; i >0 ; i--) {
            //获取前边身体的位置
            //类型断言
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;

            //将值设置到当前身体上
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';



        }



    }
    //检查头和身体有没有相撞
    checkHeadBody(){
        //获取所有的身体,检查其是否和蛇头的坐标发生重叠
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop){
                //进入判断说明蛇头撞到身体,游戏结束
                throw new Error('撞到自己了! ')
            }
        }
    }

}

export default Snake
