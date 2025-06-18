import { _decorator, Button, CCFloat, CCInteger, Component, instantiate, Node, Prefab, Tween, tween, Vec2, Vec3 } from 'cc';
import { Icon } from '../Prefab/Icon';
import { DataManager } from '../Manager/DataManager';
import { ConstManager } from '../Manager/ConstManager';
import { EventManager } from '../Manager/EventManager';
import { DoubleIcon } from '../Prefab/DoubleIcon';
const { ccclass, property } = _decorator;

//存储消除数据
interface RepeatResult {
    value: number;
    count: number;
    positions: {
        x: number;
        y: number
    }[];
}

@ccclass('BetPanel')
export class BetPanel extends Component {
    @property(Node)
    iconParent: Node | null = null;

    @property(Button)
    quickDropBtn: Button | null = null;

    @property(Prefab)
    iconPrefab: Prefab[] = [];

    @property(CCInteger)
    xOffset: number = 0;//x方向图标位置间隔

    @property(CCInteger)
    yOffset: number = 0;//y方向图标位置间隔

    @property(CCInteger)
    createPosOffset: number = 0;//创建图标位置相对于开始游戏位置的偏移

    @property(CCInteger)
    quickPosOffset: number = 0;//快速下落图标位置相对于开始游戏位置的偏移


    @property(Vec2)
    startPos: Vec2 = new Vec2();//游戏开始时左上角图标位置

    @property(CCInteger)
    arrayWidth: number = 0;//创建的图标区域横列数

    @property(CCInteger)
    arrayHeight: number = 0;

    @property(CCFloat)
    dropTime: number = 0;//单个图标从创建位置下落到指定位置的时间

    @property(CCFloat)
    dropWaitTime: number = 0;//每个图标的等待时间

    private createPos: Vec2 = new Vec2();
    private createCall: number = 0;//用以标记图标是否全部创建完成
    private quickDropFlag: boolean = false;//用以标记快速下落次数避免多次点击

    private grid: number[][] = [];//用以存储图标id  1-11
    private icons: Node[][] = [];//用以存储新建的图标

    private gameCount: number = 0;//记录游戏轮次
    private gameWin: number = 0;//一局游戏总得分

    start() {
        this.Init();
        this.InitPanel();
    }

    Init() {
        this.createPos = new Vec2(this.startPos.x, this.startPos.y + this.createPosOffset);
        this.quickDropBtn.interactable = false;//按钮初始不可使用
    }

    // 初始化面板显示和数据
    private InitData() { // 将所有图标进行销毁
        this.iconParent.children.forEach(child => {
            child.destroy();
        });
        // 重置数值
        for (let x = 0; x < this.arrayHeight; x++) {
            this.grid[x] = [];
            for (let y = 0; y < this.arrayWidth; y++) {
                this.grid[x][y] = -1; // 默认值为-1
            }
        }
        for (let x = 0; x < this.arrayHeight; x++) {
            this.icons[x] = [];
            for (let y = 0; y < this.arrayWidth; y++) {
                this.icons[x][y] = null;
            }
        }
        console.log(this.grid);
    }

    // 初始化面板显示
    private InitPanel() {
        this.InitData();
        for (let x = 0; x < this.arrayHeight; x++) {
            for (let y = 0; y < this.arrayWidth; y++) {
                this.grid[x][y] = Math.floor(Math.random() * ConstManager.initPanelCount);
                this.CreateIcon(x, y, 0, false);
                const temp: Node = this.icons[x][y];
                temp.position = new Vec3(this.startPos.x + (y * this.xOffset), this.startPos.y - (x * this.yOffset));
            }
        }
    }

    // 创建新一轮游戏时需要将上一轮的图标下落
    private CreateBefore() {
        this.quickDropBtn.interactable = true;//开始下落时即可快速下落
        this.quickDropFlag = false;
        let count = 0;
        for (let x = 0; x < this.arrayWidth; x++) {
            this.scheduleOnce(() => {
                for (let y = 0; y < this.arrayHeight; y++) {
                    this.scheduleOnce(() => {
                        let temp: Node = this.icons[this.arrayHeight - 1 - y][x];
                        tween(temp).by(this.dropTime, {
                            position: new Vec3(0, -this.createPosOffset)
                        }).call(() => {
                            count++;
                            //全部下落完成
                            if (count >= this.arrayWidth * this.arrayHeight) {
                                this.InitData();
                                //需要在此处进行
                                this.SpawnNewIcon();
                            }
                        }).start();
                    }, this.dropWaitTime * y);
                }
            }, this.dropWaitTime * x * this.arrayHeight);
        }
    }

    private SpawnNewIcon() {
        this.createCall = 0; // 每次创建时需要重置
        let clearNum = 0; // 记录消除的数量
        for (let x = 0; x < this.arrayHeight; x++) {
            for (let y = 0; y < this.arrayWidth; y++) {
                if (this.grid[x][y] == -1) {
                    clearNum++;
                }
            }
        }
        let all = 0; // 总计数用以计算总时间
        for (let x = 0; x < this.arrayWidth; x++) {
            let count = 0; // 记录一列中空位置的数量
            for (let y = 0; y < this.arrayHeight; y++) {
                if (this.grid[this.arrayHeight - 1 - y][x] == -1) {
                    count++;
                    all++;
                }
            }
            if (count != 0) {
                this.scheduleOnce(() => {
                    for (let y = 0; y < this.arrayHeight; y++) {
                        if (this.grid[this.arrayHeight - 1 - y][x] == -1) {
                            this.scheduleOnce(() => {
                                //在此处更改grid的值即可
                                this.grid[this.arrayHeight - 1 - y][x] = DataManager.Instance(DataManager).deskData[this.gameCount][this.arrayHeight - 1 - y][x];
                                this.CreateIcon(this.arrayHeight - 1 - y, x, clearNum);
                                // console.log(`行:${this.arrayHeight - 1 - y},列:${x}`);
                            }, this.dropWaitTime * y);
                        }
                    }
                }, this.dropWaitTime * all);
            }
        }
    }

    private CreateIcon(x: number, y: number, clearNum: number, isMove: boolean = true,) {
        // 创建图标
        let newfruit: Node = null;
        if (this.grid[x][y] >= 10) {
            //加倍图标需要单独处理
            newfruit = instantiate(this.iconPrefab[10]);
            newfruit.getComponent(DoubleIcon).DoubleShow(this.grid[x][y]);
        }
        else {
            newfruit = instantiate(this.iconPrefab[this.grid[x][y]]);
        }
        newfruit.parent = this.iconParent; // 添加进父物体后才能显示
        this.icons[x][y] = newfruit;
        newfruit.position = new Vec3(this.createPos.x + y * this.xOffset, this.createPos.y - (x) * this.yOffset);
        if (isMove) {
            tween(newfruit).by(this.dropTime, {
                position: new Vec3(0, -this.createPosOffset)
            }).call(() => {
                if (this.grid[x][y] >= 10) {
                    newfruit.getComponent(DoubleIcon).DoubleDrop(() => {
                        this.createCall++;
                        if (this.createCall >= clearNum) {
                            this.quickDropBtn.interactable = false;
                            this.OnClickClear();
                        }
                    });
                }
                else {
                    newfruit.getComponent(Icon).DropEffect(this.grid[x][y], () => {
                        this.createCall++;
                        // 到达数量后开始消除
                        if (this.createCall >= clearNum) {
                            this.quickDropBtn.interactable = false;
                            this.OnClickClear();
                        }
                    });
                }
            }).start();
        }
    }

    private FindMatches(): RepeatResult[] {
        const countMap: Map<number, {
            count: number, positions: {
                x: number;
                y: number
            }[]
        }> = new Map();

        for (let x = 0; x < this.arrayHeight; x++) {
            for (let y = 0; y < this.arrayWidth; y++) {
                const num = this.grid[x][y];
                if (!countMap.has(num)) {
                    countMap.set(num, {
                        count: 0,
                        positions: []
                    });
                }
                const entry = countMap.get(num)!;
                entry.count++;
                entry.positions.push({ x, y });
            }
        }

        const results: RepeatResult[] = [];
        countMap.forEach(
            (data, num) => { // 此处还可以继续添加函数进行判断
                //查询序号1-9的图标消除
                if (data.count >= 8) {
                    results.push({ value: num, count: data.count, positions: data.positions });
                }
                //查询序号10的免费游戏图标
                if (num == 9 && data.count >= 4) {
                    results.push({ value: num, count: data.count, positions: data.positions });
                }
                //查询序号11的加倍图标
                if (num >= 10) {
                    results.push({ value: num, count: data.count, positions: data.positions });
                }
            }
        );

        results.forEach(result => {
            console.log(`图标 ${result.value
                } 出现 ${result.count
                } 次，位置：`, result.positions);
        });
        return results;
    }


    private Clear(results: RepeatResult[]) {
        if (results.length == 0) {
            console.log("没有可消除");
            // 在此处进行最终结算
            EventManager.Send("EnableAllBtn", true);//结算时解禁所有按钮
            EventManager.Send("UpdatePlayerScore", DataManager.Instance(DataManager).totalWinScore);
            return;
        }
        let isClear = false;
        let isOpen = false;
        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            if (result.value >= 0 && result.value <= 8) {
                for (let i = 0; i < result.positions.length; i++) {
                    //序号1-9的普通消除
                    const index: number = this.grid[result.positions[i].x][result.positions[i].y];
                    let temp: Node = this.icons[result.positions[i].x][result.positions[i].y];
                    this.grid[result.positions[i].x][result.positions[i].y] = -1;
                    this.icons[result.positions[i].x][result.positions[i].y] = null;
                    temp.getComponent(Icon)?.ClearEffect(index, () => {
                        // 此处是消除效果只执行一次
                        if (isClear == false) {
                            isClear = true;
                            
                            this.Drop();
                            let score = DataManager.Instance(DataManager).winScore[this.gameCount];
                            this.gameWin += score
                            EventManager.Send("AddWinItem", result.value, result.count, score);
                            EventManager.Send("UpdateWinScore", this.gameWin);
                            EventManager.Send("ShowWinScore", score);
                        }
                    });
                }
            }
            //免费游戏
            if (result.value == 9) {
                for (let i = 0; i < result.positions.length; i++) {
                    let temp: Node = this.icons[result.positions[i].x][result.positions[i].y];
                    temp.getComponent(Icon)?.FreeEffect(() => {
                        if (isOpen == false) {
                            isOpen = true;
                            console.log("免费游戏界面打开");
                            let score = DataManager.Instance(DataManager).winScore[this.gameCount];
                            this.gameWin += score;
                            EventManager.Send("AddWinItem", result.value, result.count, score);
                            EventManager.Send("UpdateWinScore", this.gameWin);
                            EventManager.Send("ShowWinScore", score);
                        }
                    });
                }
            }
            //加倍图标出现且有赢分的情况下才有效果
            if (result.value >= 10 && this.gameWin > 0) {
                for (let i = 0; i < result.positions.length; i++) {
                    let temp: Node = this.icons[result.positions[i].x][result.positions[i].y];
                    temp.getComponent(DoubleIcon)?.DoubleEffect(result.value, () => {

                    });
                }
            }
        }
        // console.log(this.grid);
    }

    private Drop() {
        for (let x = 0; x < this.arrayWidth; x++) {
            let emptyCount = 0;
            for (let y = this.arrayHeight - 1; y >= 0; y--) {
                if (this.grid[y][x] === -1) {
                    emptyCount++;
                } else if (emptyCount > 0) { // 下移数据
                    this.grid[y + emptyCount][x] = this.grid[y][x];
                    this.grid[y][x] = -1;
                    // 下移物体
                    let temp: Node = this.icons[y][x];
                    tween(temp).by(this.dropTime, {
                        position: new Vec3(0, - emptyCount * this.yOffset)
                    }).call(() => {
                        temp.getComponent(Icon)?.DropEffect(this.grid[y][x], () => {
                            // 此处可以有下落完成的回调  
                        });
                    }).start();
                    // 移动后更改数据
                    this.icons[y + emptyCount][x] = this.icons[y][x];
                    this.icons[y][x] = null;
                }
            }
        }
        this.scheduleOnce(() => {
            console.log("开始下落新的");
            this.gameCount++;
            this.SpawnNewIcon();
        }, 0.1);
        console.log(this.grid);
    }

    private QuickDrop() {
        this.unscheduleAllCallbacks();
        let num: number = 0;
        this.InitData();
        for (let x = 0; x < this.arrayHeight; x++) {
            for (let y = 0; y < this.arrayWidth; y++) {
                if (this.grid[x][y] == -1) {
                    this.grid[x][y] = DataManager.Instance(DataManager).deskData[this.gameCount][x][y];
                    this.CreateIcon(x, y, 0, false);
                }
                const temp: Node = this.icons[x][y];
                const xPos = this.startPos.x + (y * this.xOffset);
                const yPos = this.startPos.y - (x * this.yOffset) + this.quickPosOffset;

                Tween.stopAllByTarget(temp);
                temp.setPosition(new Vec3(xPos, yPos));

                tween(temp).by(this.dropTime / 2, {
                    position: new Vec3(0, -this.quickPosOffset)
                }).call(() => {
                    temp.getComponent(Icon)?.DropEffect(this.grid[x][y], () => {
                        num++;
                        if (num >= this.arrayHeight * this.arrayWidth) {
                            this.OnClickClear();
                        }
                    });
                }).start();
            }
        }
    }

    //主要操作函数
    OnClickCreate() {
        EventManager.Send("EnableAllBtn", false);//开始时禁用所有按钮
        EventManager.Send("UpdateWinScore", 0);//初始时将得分置为0
        EventManager.Send("ClearWinItem");//初始时需要清空记录
        EventManager.Send("ShowLoopText");//初始展示广播
        this.gameCount = 0;//需要将计数恢复原始值
        this.gameWin = 0;
        this.CreateBefore();
    }

    private OnClickClear() {
        const results = this.FindMatches();
        this.Clear(results);
    }

    OnClickQuickDrop() {
        console.log("快速下落");
        if (this.quickDropFlag == false) {
            this.quickDropFlag = true;
            this.QuickDrop();
        }
    }

}


