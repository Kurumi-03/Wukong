import { _decorator, Component, EventTouch, Label, Node } from 'cc';
import { Utils } from '../Use/Utils';
import { DataManager } from '../Manager/DataManager';
const { ccclass, property } = _decorator;

@ccclass('DateFindPanel')
export class DateFindPanel extends Component {
    @property(Label)
    startDateLabel: Label | null = null;

    @property(Label)
    endDateLabel: Label | null = null;

    startDate: Date = new Date();

    endDate: Date = new Date();

    protected start(): void {
        this.GetValue();
    }

    GetValue() {
        let array = Utils.StringToDateArray(DataManager.Instance(DataManager).date);
        this.startDate = new Date(array[0], array[1], array[2]);//初始时将开始时间和结束时间都设定为当前时间
        this.endDate = new Date(array[0], array[1], array[2]);
        this.startDateLabel.string = this.startDate.getFullYear().toString() + "/" + Utils.NumberZero(this.startDate.getMonth() + 1) + "/" + Utils.NumberZero(this.startDate.getDate());
        this.endDateLabel.string = this.endDate.getFullYear().toString() + "/" + Utils.NumberZero(this.endDate.getMonth() + 1) + "/" + Utils.NumberZero(this.endDate.getDate());
    }

    ChangeStartDate(touch: EventTouch, flag: string) {
        if (flag == "0") {
            this.startDate.setDate(this.startDate.getDate() + 1);
        }
        else if (flag == "1") {
            this.startDate.setDate(this.startDate.getDate() - 1);
        }
        else {
            console.log("标识错误");
        }
        this.startDateLabel.string = this.startDate.getFullYear().toString() + "/" + Utils.NumberZero(this.startDate.getMonth() + 1) + "/" + Utils.NumberZero(this.startDate.getDate());
    }

    ChangeEndDate(touch: EventTouch, flag: string) {
        if (flag == "0") {
            this.endDate.setDate(this.endDate.getDate() + 1);
        }
        else if (flag == "1") {
            this.endDate.setDate(this.endDate.getDate() - 1);
        }
        else {
            console.log("标识错误");
        }
        this.endDateLabel.string = this.endDate.getFullYear().toString() + "/" + Utils.NumberZero(this.endDate.getMonth() + 1) + "/" + Utils.NumberZero(this.endDate.getDate());
    }
}


