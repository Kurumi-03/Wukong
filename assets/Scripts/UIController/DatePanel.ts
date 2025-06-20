import { _decorator, Component, EventTouch, find, Label, Node, SpriteFrame, utils } from 'cc';
import { DataManager } from '../Manager/DataManager';
import { Utils } from '../Use/Utils';
const { ccclass, property } = _decorator;

@ccclass('DatePanel')
export class DatePanel extends Component {
    @property(Label)
    dayLabel: Label | null = null;

    @property(Label)
    hourLabel: Label | null = null;

    @property(Label)
    minsLabel: Label | null = null;

    currentDate: Date = new Date();

    findData: string = "";

    protected start(): void {
        this.GetValue();
        this.UpdateDayLabel();
        this.UpdateHourLabel();
        this.UpdateMinsLabel();
    }

    GetValue() {
        let array = Utils.StringToDateArray(DataManager.Instance(DataManager).date);
        this.currentDate = new Date(array[0], array[1], array[2], array[3], array[4]);
        this.UpdateFindData();
    }

    //根据flag标识确定是加还是减  0:加  1:减
    ChangeDay(touch: EventTouch, flag: string) {

        if (flag == "0") {
            this.currentDate.setDate(this.currentDate.getDate() + 1);
        }
        else if (flag == "1") {
            this.currentDate.setDate(this.currentDate.getDate() - 1);
        }
        else {
            console.log("标识错误");
        }
        this.UpdateDayLabel();
    }

    UpdateDayLabel() {
        const month = this.currentDate.getMonth() + 1;
        const day = this.currentDate.getDate();
        this.dayLabel.string = Utils.NumberZero(month) + "/" + Utils.NumberZero(day);
        this.UpdateFindData();
    }

    ChangeHour(touch: EventTouch, flag: string) {
        if (flag == "0") {
            this.currentDate.setHours(this.currentDate.getHours() + 1);
        }
        else if (flag == "1") {
            this.currentDate.setHours(this.currentDate.getHours() - 1);
        }
        else {
            console.log("标识错误");
        }
        this.UpdateHourLabel();
    }

    UpdateHourLabel() {
        this.hourLabel.string = this.currentDate.getHours().toString() + "時";
        this.UpdateFindData();
    }

    ChangeMins(touch: EventTouch, flag: string) {
        if (flag == "0") {
            this.currentDate.setMinutes(this.currentDate.getMinutes() + 1);
        }
        else if (flag == "1") {
            this.currentDate.setMinutes(this.currentDate.getMinutes() - 1);
        }
        else {
            console.log("标识错误");
        }
        this.UpdateMinsLabel();
    }

    UpdateMinsLabel() {
        this.minsLabel.string = this.currentDate.getMinutes().toString() + "分";
        this.UpdateFindData();
    }

    UpdateFindData() {
        this.findData = this.dayLabel.string + " " + Utils.NumberZero(this.currentDate.getHours()) + ":" + Utils.NumberZero(this.currentDate.getMinutes());
    }
}


