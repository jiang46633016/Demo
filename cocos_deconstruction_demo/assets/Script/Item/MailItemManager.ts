import { _decorator, Component, Node } from 'cc';
import { ItemManager } from './ItemManager';
import { ItemTypeEnum } from '../Enum/Index';
const { ccclass, property } = _decorator;

@ccclass('MailItemManager')
export class MailItemManager extends ItemManager {
    label = "船票"
    type: ItemTypeEnum = ItemTypeEnum.Mail


    update(deltaTime: number) {

    }
}

