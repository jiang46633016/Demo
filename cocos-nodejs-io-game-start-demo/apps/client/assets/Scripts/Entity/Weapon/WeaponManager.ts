import { _decorator, Component, instantiate, Node, UITransform, Vec2 } from 'cc';
import DataManager from '../../Global/DataManager';
import { EntityTypeEnum, InputTypeEnum } from '../../Common/Enum';
import { IActor } from '../../Common';
import { EntityManager } from '../../Base/EntityManager';
import { EntityStateEnum, EventEnum } from '../../Enum';
import { WeaponStateMachine } from './WeaponStateMachine';
import EventManager from '../../Global/EventManager';
const { ccclass, property } = _decorator;

@ccclass('WeaponManager')
export class WeaponManager extends EntityManager {
    owner: number
    private body: Node
    private anchor: Node
    private point: Node
    init(data: IActor) {
        this.owner = data.id;
        this.body = this.node.getChildByName("Body");
        this.anchor = this.body.getChildByName("Anchor");
        this.point = this.anchor.getChildByName("Point");

        this.fsm = this.body.addComponent(WeaponStateMachine);
        this.fsm.init(data.weaponType);
        this.state = EntityStateEnum.Idle;

        EventManager.Instance.on(EventEnum.BulletBorn, this.handleBulletBorn, this);
        EventManager.Instance.on(EventEnum.WeaponShoot, this.handleWeaponShoot, this);
    }

    handleBulletBorn(owner: number) {
        if (this.owner !== owner) {
            return;
        }

        this.state = EntityStateEnum.Attack;
    }

    handleWeaponShoot() {
        if (this.owner !== DataManager.Instance.myPlayId) {
            return;
        }
        const pointWorldPos = this.point.getWorldPosition();
        const pointStagePos = DataManager.Instance.stage.getComponent(UITransform).convertToNodeSpaceAR(pointWorldPos);
        const anchorWorldPos = this.anchor.getWorldPosition();
        const direction = new Vec2(pointWorldPos.x - anchorWorldPos.x, pointWorldPos.y - anchorWorldPos.y).normalize();

        DataManager.Instance.applyInput({
            owner: this.owner,
            type: InputTypeEnum.WeaponShoot,
            position: {
                x: pointStagePos.x,
                y: pointStagePos.y
            },
            direction: {
                x: direction.x,
                y: direction.y
            },
        })
    }
}

