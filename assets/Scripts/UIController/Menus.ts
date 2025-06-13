import {_decorator, Component, Node} from 'cc';
const {ccclass, property} = _decorator;

@ccclass('Menus')
export class Menus extends Component {
    @property(Node)
    autoBetMenu : Node | null = null;

    @property(Node)
    menu : Node | null = null;

    @property(Node)
    setting : Node | null = null;

    @property(Node)
    help : Node | Node = null;

    @property(Node)
    desk:Node|null = null;

    protected start(): void {
        this.autoBetMenu.active = false;
        this.menu.active = false;
        this.setting.active = false;
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

    OpenHelp(){
        this.help.active = true;
        this.CloseMenu();
    }

    CloseHelp(){
        this.help.active = false;
    }

    OpenDesk(){
        this.desk.active = true;
    }

    CloseDesk(){
        this.desk.active = false;
    }
}
