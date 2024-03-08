import { _decorator, Component, Node } from 'cc';
import { TriggerManager } from './TriggerManager';
import { ItemStatusEnum, ItemTypeEnum, TriggerStatusEnum, TriggerTypeEnum } from '../Enum/Index';
import DataManager from '../Runtime/DataManager';
const { ccclass, property } = _decorator;

@ccclass('MailBoxTriggerManager')
export class MailBoxTriggerManager extends TriggerManager {
    type: TriggerTypeEnum = TriggerTypeEnum.MailBox

    @property(Node)
    closeNode: Node = null;

    @property(Node)
    openNode: Node = null;

    render() {
        super.render();
        const open = DataManager.Instance.mailBoxStutas === TriggerStatusEnum.Resolved;
        this.closeNode.active = !open
        this.openNode.active = open;
    }

    handleTrigger() {
        if (DataManager.Instance.curItemType === ItemTypeEnum.Key && DataManager.Instance.isSelect) {
            DataManager.Instance.curItemType = null;
            DataManager.Instance.isSelect = false;
            DataManager.Instance.items.find(i => i.type == ItemTypeEnum.Key).status = ItemStatusEnum.Disable;
            DataManager.Instance.items.find(i => i.type == ItemTypeEnum.Mail).status = ItemStatusEnum.Scene;
            DataManager.Instance.items = [...DataManager.Instance.items];
            DataManager.Instance.mailBoxStutas = TriggerStatusEnum.Resolved;
        }
    }

}

