import { _decorator, Component, director, instantiate, IVec2, math, Node } from 'cc';
import DataManager from '../../Global/DataManager';
import { EntityTypeEnum, InputTypeEnum } from '../../Common/Enum';
import { IActor, IBullet } from '../../Common';
import { EntityManager } from '../../Base/EntityManager';
import { EntityStateEnum, EventEnum } from '../../Enum';
import { WeaponManager } from '../Weapon/WeaponManager';
import { rad2Angle } from '../../Utils';
import { BulletStateMacchine } from './BulletStateMacchine';
import EventManager from '../../Global/EventManager';
import { ExplosionManager } from '../Explosion/ExplosionManager';
import { ObjectPoolManager } from '../../Global/ObjectPoolManager';
const { ccclass, property } = _decorator;

@ccclass('BulletManager')
export class BulletManager extends EntityManager {
    type: EntityTypeEnum
    id: number

    init(data: IBullet) {
        this.type = data.type
        this.id = data.id;
        this.fsm = this.addComponent(BulletStateMacchine);
        this.fsm.init(data.type);
        this.state = EntityStateEnum.Idle;
        this.node.active = false;

        EventManager.Instance.on(EventEnum.ExplosionBorn, this.hanleExplosionBorn, this);
    }

    hanleExplosionBorn(id: number, { x, y }: IVec2) {
        if (id !== this.id) {
            return;
        }

        const explosion = ObjectPoolManager.Instance.get(EntityTypeEnum.Explosion)
        const em = explosion.getComponent(ExplosionManager) || explosion.addComponent(ExplosionManager);
        em.init(EntityTypeEnum.Explosion, { x, y });

        EventManager.Instance.off(EventEnum.ExplosionBorn, this.hanleExplosionBorn, this)
        DataManager.Instance.bulletMap.delete(this.id);
        ObjectPoolManager.Instance.ret(this.node);
    }

    render(data: IBullet) {
        this.node.active = true;
        const { direction, position } = data;
        this.node.setPosition(position.x, position.y);


        const side = Math.sqrt(direction.x ** 2 + direction.y ** 2);
        const rad = Math.asin(direction.y / side);

        const angle = direction.x > 0 ? rad2Angle(Math.asin(-direction.y / side)) : rad2Angle(rad)

        this.node.setRotationFromEuler(0, 0, angle);
    }
}

