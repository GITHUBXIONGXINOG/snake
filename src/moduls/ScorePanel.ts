//定义表示积分牌的类
class ScorePanel{
    //score和level用来记录分数和等级
    score = 0
    level = 1
    //分数和等级所在的元素,在构造函数中进行初始化
    scoreEle: HTMLElement
    levelEle: HTMLElement

    //设置变量限制等级
    maxLevel: number
    //设置一个变量表示多少分升级
    upScore: number
    //maxLevel 默认等于10
    constructor(maxLevel: number = 10, upScore: number = 10) {
        //!表示不为空
        this.scoreEle = document.getElementById('score')!
        this.levelEle = document.getElementById('level')!
        this.maxLevel = maxLevel
        this.upScore = upScore
    }

    //设置一个加分的方法
    addScore(){
        //使分数自增
        //+'' 转字符串
        this.scoreEle.innerHTML = ++this.score + ''
        //判断等级多少
        if (this.score % this.upScore === 0){
            this.levelUp()
        }

    }

    //提升等级的方法
    levelUp(){
        if (this.level < this.maxLevel){
            this.levelEle.innerHTML = ++this.level + ''
        }
    }
}

const scorePanel = new ScorePanel(100,2)
// for (let i = 0; i < 80; i++) {
//     scorePanel.addScore()
// }

//把ScorePanel作为默认模块暴露出去
export default ScorePanel
