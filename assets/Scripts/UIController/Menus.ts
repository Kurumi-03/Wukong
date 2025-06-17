import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Menus')
export class Menus extends Component {
    @property(Node)
    autoBetMenu: Node | null = null;

    @property(Node)
    menu: Node | null = null;

    @property(Node)
    setting: Node | null = null;

    @property(Node)
    help: Node | Node = null;

    @property(Node)
    desk: Node | null = null;

    @property(Node)
    history: Node | null = null;

    @property(Node)
    record: Node | null = null;

    protected start(): void {
        this.autoBetMenu.active = false;
        this.menu.active = false;
        this.setting.active = false;
        this.help.active = false;
        this.desk.active = false;
        this.history.active = false;
        this.record.active = false;
    }

    OpenAutoBetMenu() {
        this.autoBetMenu.active = true;
    }

    CloseAutoBetMenu() {
        this.autoBetMenu.active = false;
    }

    OpenMenu() {
        this.menu.active = true;
    }

    CloseMenu() {
        this.menu.active = false;
    }

    OpenSetting() {
        this.setting.active = true;
        this.CloseMenu();
    }

    CloseSetting() {
        this.setting.active = false;
    }

    OpenHelp() {
        this.help.active = true;
        this.CloseMenu();
    }

    CloseHelp() {
        this.help.active = false;
    }

    OpenDesk() {
        this.desk.active = true;
    }

    CloseDesk() {
        this.desk.active = false;
    }

    OpenHistory() {
        this.history.active = true;
        this.CloseMenu();
    }

    CloseHistory() {
        this.history.active = false
    }

    OpenRecord(){
        this.record.active = true;
        this.CloseHistory();
    }

    BackRecord(){
        this.record.active = false;
        this.OpenHistory();
    }

    CloseRecod(){
        this.record.active = false;
    }
}
