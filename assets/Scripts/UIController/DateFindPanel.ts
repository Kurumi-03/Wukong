import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DateFindPanel')
export class DateFindPanel extends Component {
    @property(Label)
    startDate: Label | null = null;

    @property(Label)
    endDate: Label | null = null;

    
}


