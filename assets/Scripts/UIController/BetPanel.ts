import { _decorator, Button, CCFloat, CCInteger, Component, instantiate, Node, Prefab, Tween, tween, Vec2, Vec3 } from 'cc';
import { Icon } from '../Prefab/Icon';
import { DataManager } from '../Manager/DataManager';
import { ConstManager } from '../Manager/ConstManager';
import { EventManager } from '../Manager/EventManager';
import { DoubleIcon } from '../Prefab/DoubleIcon';
import { GameManager } from '../Manager/GameManager';
const { ccclass, property } = _decorator;

//存储消除数据
interface RepeatResult {
    value: number;//序号
    count: number;//数量
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

    private createPos: Vec2 = new Vec2();
    private createCall: number = 0;//用以标记图标是否全部创建完成
    private quickDropFlag: boolean = false;//用以标记快速下落次数避免多次点击

    private grid: number[][] = [];//用以存储图标id  1-11
    private icons: Node[][] = [];//用以存储新建的图标

    private gameCount: number = 0;//记录一局游戏消除次数
    private gameWin: number = 0;//一局游戏总得分
    private freeWin: number = 0;//免费游戏模式的总得分
    private freeMultple: number = 0;//免费游戏模式的总倍率
    private isFree: boolean = false;//是否是免费游戏模式
    private isAuto: boolean = false;//是否是自动游戏模式

    protected onLoad(): void {
        EventManager.Register("AutoPlay", this.AutoPlay.bind(this));
    }


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
                    }, DataManager.Instance(DataManager).dropWaitTime * y);
                }
            }, DataManager.Instance(DataManager).dropWaitTime * x * this.arrayHeight);
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
                            }, DataManager.Instance(DataManager).dropWaitTime * y);
                        }
                    }
                }, DataManager.Instance(DataManager).dropWaitTime * all);
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
            count: number,
            positions: {
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
        let temp = { value: 10, count: 0, positions: [] };
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
                //查询序号11的加倍图标都存储在一个结果里
                if (num >= 10) {
                    temp.positions.push(data.positions);
                }
            }
        );
        if (temp.positions.length > 0) {
            temp.count = temp.positions.length;
            results.push(temp);
        }

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
            // 未找到加倍图标时 在此处进行普通游戏的最终结算
            this.AutoJudge();
            return;
        }
        else if (results.length == 1 && results[0].value == 10 && this.gameWin > 0) {
            //加倍图标出现且有赢分的情况下才有效果
            let allMultiple = 0;
            //此处的position是由于上面temp的positons也填入了positions所有需要二维数组获取
            for (let i = 0; i < results[0].positions.length; i++) {
                const node = this.icons[results[0].positions[i][0].x][results[0].positions[i][0].y]?.getComponent(DoubleIcon);
                allMultiple += node.double;//单局游戏的总倍数
                node.getComponent(DoubleIcon).DoubleEffect(() => {
                    if (i >= results[0].positions.length - 1) {
                        this.freeMultple += allMultiple;
                        this.gameWin *= this.freeMultple;
                        EventManager.Send("ChangeFreeWild", this.freeMultple);
                        EventManager.Send("ShowMultiplier", allMultiple, () => {
                            EventManager.Send("UpdateWinScore", this.gameWin);
                            this.AutoJudge();
                        });//加倍效果
                    }
                })
            }
            return;
        }
        let isClear = false;
        let isOpen = false;
        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            //序号1-9的普通消除
            if (result.value >= 0 && result.value <= 8) {
                for (let j = 0; j < result.positions.length; j++) {
                    const index: number = this.grid[result.positions[j].x][result.positions[j].y];
                    let temp: Node = this.icons[result.positions[j].x][result.positions[j].y];
                    this.grid[result.positions[j].x][result.positions[j].y] = -1;
                    this.icons[result.positions[j].x][result.positions[j].y] = null;
                    temp.getComponent(Icon)?.ClearEffect(index, () => {
                        // 此处是消除效果只执行一次
                        if (isClear == false) {
                            isClear = true;
                            let score = DataManager.Instance(DataManager).winScore[this.gameCount];
                            this.gameWin += score;
                            EventManager.Send("AddWinItem", result.value, result.count, score);
                            EventManager.Send("UpdateWinScore", this.gameWin);
                            EventManager.Send("ShowWinScore", this.gameWin);
                            this.Drop();
                        }
                    });
                }
            }
            //免费游戏
            if (result.value == 9) {
                for (let j = 0; j < result.positions.length; j++) {
                    let temp: Node = this.icons[result.positions[j].x][result.positions[j].y];
                    temp.getComponent(Icon)?.FreeEffect(() => {
                        if (isOpen == false) {
                            isOpen = true;
                            let score = DataManager.Instance(DataManager).winScore[this.gameCount];
                            this.gameWin += score;
                            EventManager.Send("AddWinItem", result.value, result.count, score);
                            EventManager.Send("UpdateWinScore", this.gameWin);
                            EventManager.Send("ShowWinScore", this.gameWin);
                            this.scheduleOnce(() => { this.FreeGame() }, 1);
                        }
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
                    let index = this.grid[y + emptyCount][x];
                    tween(temp).by(this.dropTime, {
                        position: new Vec3(0, - emptyCount * this.yOffset)
                    }).call(() => {
                        temp.getComponent(Icon)?.DropEffect(index, () => { });
                        temp.getComponent(DoubleIcon)?.DoubleDrop(() => { });
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
        }, this.dropTime + 0.05);//此处偏差时间可自调
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
                    temp.getComponent(Icon).DropEffect(this.grid[x][y], () => {
                        num++;
                        if (num >= this.arrayHeight * this.arrayWidth) {
                            this.OnClickClear();
                        }
                    });
                }).start();
            }
        }
    }

    FreeJudge() {
        GameManager.Instance(GameManager).bigWin.ShowPanel(this.gameWin);//大奖是所有都会触发
        if (this.isFree == false) return;
        if (DataManager.Instance(DataManager).freeCount > 0) {
            this.freeWin += this.gameWin;
            this.OnClickCreate();
        }
        else {
            this.freeWin += this.gameWin;
            GameManager.Instance(GameManager).freeResult.ShowResult(this.freeWin, this.gameWin, () => {
                this.isFree = false;
                EventManager.Send("EnableAllBtn", true);//结算时解禁所有按钮
                if (DataManager.Instance(DataManager).isAutoToFree == true) {
                    this.isAuto = false;
                    DataManager.Instance(DataManager).autoCount = 0;
                    EventManager.Send("PlayBtnAutoMode", false);
                }
                else {
                    EventManager.Send("EnableAutoBtn", false);
                    this.AutoJudge();
                }
            });//免费游戏结算界面
            EventManager.Send("ChangeBg", 0);
            EventManager.Send("ShowNode", 0);
        }
    }

    AutoJudge() {
        EventManager.Send("UpdatePlayerScore", this.gameWin);
        EventManager.Send("EnableAllBtn", true);//结算时解禁所有按钮
        this.FreeJudge();
        //不在自动模式或是在免费模式下不执行
        if (this.isAuto == false || this.isFree == true) return;
        if (DataManager.Instance(DataManager).autoCount > 0) {
            this.OnClickCreate();
        }
        else {
            this.isAuto = false;
            EventManager.Send("EnableAutoBtn", true);
            EventManager.Send("AutoFastMode", false);
            EventManager.Send("PlayBtnAutoMode", false);
            EventManager.Send("EnableAllBtn", true);//结算时解禁所有按钮
        }
    }

    private OnClickClear() {
        const results = this.FindMatches();
        this.Clear(results);
    }

    //主要操作函数
    OnClickCreate() {
        if (this.isAuto == false) {
            EventManager.Send("EnableAllBtn", false);//非自动模式下 开始时禁用所有按钮
        }
        else {
            EventManager.Send("EnableAutoBtn", false);
        }
        EventManager.Send("PlayBtnEffect");
        EventManager.Send("UpdateWinScore", 0);//初始时将得分置为0
        EventManager.Send("ClearWinItem");//初始时需要清空记录
        EventManager.Send("ShowLoopText");//初始展示广播
        EventManager.Send("UpdatePlayerScore", 0);//刷新玩家得分数值
        this.gameCount = 0;//需要将计数恢复原始值
        this.gameWin = 0;
        this.CreateBefore();
        //免费游戏进入时就检测
        if (this.isFree == true) {
            DataManager.Instance(DataManager).freeCount--;
            EventManager.Send("ChangeFreeNum");
        }

        if (this.isAuto == true && this.isFree == false) {
            DataManager.Instance(DataManager).autoCount--;
            EventManager.Send("PlayBtnAutoMode", true);
        }
    }


    OnClickQuickDrop() {
        if (this.quickDropFlag == false) {
            this.quickDropFlag = true;
            this.QuickDrop();
        }
    }

    //免费游戏
    FreeGame() {
        //转场特效
        EventManager.Send("ChangeBg", 1);//背景切换
        EventManager.Send("ShowNode", 1);//计数面板
        this.isFree = true;
        this.freeWin = 0;
        this.OnClickCreate();
    }

    //购买免费游戏
    BuyFreeGame() {
        //先下落一个free面板数据再进入免费游戏
        this.OnClickCreate();
    }

    //自动游戏  
    AutoPlay() {
        this.isAuto = true;
        this.AutoJudge();
    }

    protected onDestroy(): void {
        EventManager.UnRegister("AutoPlay", this.AutoPlay.bind(this));
    }
}


