import { _decorator, Component, Label, Node } from 'cc';
import { TriggerManager } from './TriggerManager';
import { ItemStatusEnum, ItemTypeEnum, TriggerStatusEnum, TriggerTypeEnum } from '../Enum/Index';
import DataManager from '../Runtime/DataManager';
const { ccclass, property } = _decorator;

@ccclass('GrandmoTriggerManager')
export class GrandmoTriggerManager extends TriggerManager {
    type: TriggerTypeEnum = TriggerTypeEnum.Grandmo

    private readonly pendingDialogList = [
        "老奶奶的话A",
        "我年纪大了，很多事情想不起来了。",
        "你是谁？算了，我也不在乎你是谁。你能帮我找到信箱的钥匙吗？",
        "老头子说最近会给我寄船票过来，叫我和他一起出去看看。虽然我没有什么兴趣...",
        "他折腾了一辈子，不是躲在楼上捣鼓什么时间机器，就是出海找点什么东西。",
        "这些古怪的电视节目真没有什么意思。",
        "老头子说这个岛上有很多秘密，其实我知道，不过是岛上的日子太孤独，他找点事情做罢了。",
        "人嘛，谁没有年轻过。年轻的时候...算了，不说这些往事了。",
        "老了才明白，万物静默如迷。",
    ]

    private readonly resolvedDialogList = [
        "没想到老头子的船票寄过来了，谢谢你。"
    ]

    @property(Node)
    dialogNode: Node = null;

    @property(Label)
    label: Label = null;

    render() {
        super.render();
        if (DataManager.Instance.grandmoDialogIndex == -1) {
            this.dialogNode.active = false;
            return;
        }

        this.dialogNode.active = true;

        if (DataManager.Instance.grandmoStutas === TriggerStatusEnum.Pengind) {
            this.label.string = this.pendingDialogList[DataManager.Instance.grandmoDialogIndex]
        } else if (DataManager.Instance.grandmoStutas === TriggerStatusEnum.Resolved) {
            this.label.string = this.resolvedDialogList[DataManager.Instance.grandmoDialogIndex]
        }
    }

    handleTrigger() {
        if (DataManager.Instance.grandmoStutas === TriggerStatusEnum.Pengind) {
            if (DataManager.Instance.curItemType === ItemTypeEnum.Mail && DataManager.Instance.isSelect) {
                DataManager.Instance.curItemType = null;
                DataManager.Instance.isSelect = false;
                DataManager.Instance.items.find(i => i.type == ItemTypeEnum.Mail).status = ItemStatusEnum.Disable;
                DataManager.Instance.items = [...DataManager.Instance.items];
                DataManager.Instance.grandmoStutas = TriggerStatusEnum.Resolved;
                DataManager.Instance.grandmoDialogIndex = 0;
            } else {
                if (DataManager.Instance.grandmoDialogIndex >= this.pendingDialogList.length - 1) {
                    DataManager.Instance.grandmoDialogIndex = -1;
                } else {
                    DataManager.Instance.grandmoDialogIndex++;
                }
            }
        } else {
            if (DataManager.Instance.grandmoDialogIndex >= this.resolvedDialogList.length - 1) {
                DataManager.Instance.grandmoDialogIndex = -1;
            } else {

                DataManager.Instance.grandmoDialogIndex++;
            }
        }
    }

}

