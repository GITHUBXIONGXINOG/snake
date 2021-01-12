//引入其它类
import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";

//游戏控制器,控制其它所有类
class GameControl{
    //定义三个属性
    //蛇
    snake: Snake
    //食物
    food: Food
    //积分牌
    scorePanel: ScorePanel

    //创建一个属性来存储蛇的移动方向(按键的方向)
    direction: string = ''

    //创建一个属性来记录游戏是否结束
    isLive = true

    //创建完对象,执行构造器方法体
    constructor() {
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel(10,2)
        this.init()
    }

    //游戏的初始化方法,调用后游戏开始
    init(){
        //绑定键盘按键按下的事件
        //bind 绑定this为当前对象
        document.addEventListener('keydown', this.keydownHandler.bind(this))
        //调用run方法,使蛇移动
        this.run()
    }

    /*event.key
    *   chrome     ie
    *   ArrowUp    up
    *   ArrowDown  down
    *   ArrowLeft  left
    *   ArrowRight right
    *
    * */
    //创建一个键盘按下的事件
    keydownHandler (event: KeyboardEvent) {
        //获取当前用户点击的按键的名字
        // console.log(event.key)
        //修改direction的值
        //需要检查event.key的值是否合法(用户是否按了上下左右)
        this.direction  = event.key
    }


    //创建一个控制蛇移动的方法
    run(){
        /*
        *   根据方向(this.direction)使蛇的位置改变
        *      上  top减少
        *      下  top增加
        *      左  left减少
        *      右  left增加
        * */
        //获取蛇现在的坐标
        let X = this.snake.X
        let Y = this.snake.Y

        //根据按键方向修改X值和Y值
        switch (this.direction){
            //上
            case "ArrowUp":
            case "Up":
                //向上移动 top 减少
                Y -= 10
                break
            //下
            case "ArrowDown":
            case "Down":
                //向下移动 top 增加
                Y += 10
                break
            //左
            case "ArrowLeft":
            case "Left":
                X -= 10
                break
            //右
            case "ArrowRight":
            case "Right":
                X += 10
                break
        }

        //检查蛇是否吃到食物
        this.checkEat(X, Y)
        //修改蛇的X和Y值
        //使用try,catch对异常进行捕获
        try{
            this.snake.X = X
            this.snake.Y = Y
        }catch (e){
            //进入catch,说明出现异常,游戏结束,弹出提示信息
            alert(e.message)
            //将isLive 设置为false
            this.isLive = false
        }


        //开启一个定时调用
        //每隔300ms调用一次run
        //通过bind绑定this,使得this永远是GameControl这个对象
        //run函数执行完后开启一个定时器,定时器调用run函数,里面又开启一个定时器,不断重复
        //根据等级this.scorePanel.level来确定移动速度
        //isLive 游戏是否结束,为true时表示游戏正在进行,才开启定时器
        this.isLive && setTimeout(this.run.bind(this),300 - (this.scorePanel.level-1)*30)

    }


    //定义一个方法,用来检测蛇是否吃到食物
    checkEat(X: number,Y: number){
        if (X === this.food.X && Y === this.food.Y){
            console.log('吃到食物')
            //食物的位置要进行重置
            this.food.change()
            //分数增加
            this.scorePanel.addScore()
            //蛇要增加一节
            this.snake.addBody()
        }
    }

}

export default GameControl
