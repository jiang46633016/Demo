import { EventGamepad, JsonAsset, sys } from "cc";
import Singleton from "../Base/Singleton";
import { EventEnum, ItemStatusEnum, ItemTypeEnum, SceneEnum, TriggerStatusEnum, TriggerTypeEnum } from "../Enum/Index"
import EventManager from "./EventManager";

interface IItem {
    status: ItemStatusEnum,
    type: ItemTypeEnum
}

const STORAGE_KEY = "STORAGE_KEY"

export default class DataManager extends Singleton {

    static get Instance() {
        return super.GetInstance<DataManager>();
    }
    readonly H2AAnswer = [0, 1, 2, 3, 4, 5, null]
    readonly H2AInitData = [1, 0, 3, 2, 5, 4, null]
    private _H2AData = [...this.H2AInitData];
    private _curItemType: ItemTypeEnum | null = null;
    private _items: Array<IItem> = [
        { type: ItemTypeEnum.Key, status: ItemStatusEnum.Scene },
        { type: ItemTypeEnum.Mail, status: ItemStatusEnum.Disable }
    ]
    private _isSelect = false;
    private _mailBoxStutas: TriggerStatusEnum = TriggerStatusEnum.Pengind
    private _grandmoStutas: TriggerStatusEnum = TriggerStatusEnum.Pengind
    private _grandmoDialogIndex = -1;

    private _doorStutas: TriggerStatusEnum = TriggerStatusEnum.Pengind;
    private _curScene: SceneEnum = SceneEnum.H1;

    get curScene() {
        return this._curScene;
    }

    set curScene(newData) {
        this._curScene = newData;
        this.render();
    }

    get doorStutas() {
        return this._doorStutas;
    }

    set doorStutas(newData) {
        this._doorStutas = newData;
        this.render();
    }

    get H2AData() {
        return this._H2AData;
    }

    set H2AData(newData) {
        this._H2AData = newData;
        this.render();
    }

    get mailBoxStutas() {
        return this._mailBoxStutas;
    }

    set mailBoxStutas(newData) {
        this._mailBoxStutas = newData;
        this.render();
    }

    get grandmoStutas() {
        return this._grandmoStutas;
    }

    set grandmoDialogIndex(newData) {
        this._grandmoDialogIndex = newData;
        this.render();
    }

    get grandmoDialogIndex() {
        return this._grandmoDialogIndex;
    }

    set grandmoStutas(newData) {
        this._grandmoStutas = newData;
        this.render();
    }

    get isSelect() {
        return this._isSelect;
    }

    set isSelect(newData) {
        this._isSelect = newData;
        this.render();
    }

    set curItemType(newData) {
        this._curItemType = newData;
        this.render();
    }

    get curItemType() {
        return this._curItemType;
    }

    get items() {
        return this._items;
    }

    set items(newData) {
        this._items = newData;
        this.render();
    }

    render() {
        EventManager.Instance.emit(EventEnum.Render)

        sys.localStorage.setItem(STORAGE_KEY, JSON.stringify({
            H2AData: this.H2AData,
            curItemType: this.curItemType,
            items: this.items,
            isSelect: this.isSelect,
            mailBoxStatus: this.mailBoxStutas,
            grandmoStutas: this.grandmoStutas,
            grandmoDialogIndex: this.grandmoDialogIndex,
            doorStutas: this.doorStutas,
            curScene: this.curScene,
        }))
    }

    restore() {
        const _data = sys.localStorage.getItem(STORAGE_KEY);
        try {
            const data = JSON.parse(_data);
            this.H2AData = data.H2AData;
            this.curItemType = data.curItemType;
            this.items = data.items;
            this.isSelect = data.isSelect;
            this.mailBoxStutas = data.mailBoxStatus;
            this.grandmoStutas = data.grandmoStutas;
            this.grandmoDialogIndex = data.grandmoDialogIndex;
            this.doorStutas = data.doorStutas;
            this.curScene = data.curScene;
        } catch (e) {
            this.reset();
        }
    }

    reset() {
        this.H2AData = [...this.H2AInitData];
        this.curItemType = null;
        this.items = [
            { type: ItemTypeEnum.Key, status: ItemStatusEnum.Scene },
            { type: ItemTypeEnum.Mail, status: ItemStatusEnum.Disable }
        ]
        this.isSelect = false;
        this.mailBoxStutas = TriggerStatusEnum.Pengind
        this.grandmoStutas = TriggerStatusEnum.Pengind
        this.doorStutas = TriggerStatusEnum.Pengind;
        this.grandmoDialogIndex = -1;
        this.curScene = SceneEnum.H1;
    }
}