import { EntityTypeEnum, InputTypeEnum } from "./Enum"

export interface IVec2 {
    x: number,
    y: number
}

export interface IActor {
    id: number,
    position: IVec2,
    direction: IVec2,
    type: EntityTypeEnum,
    weaponType: EntityTypeEnum,
    bulletType: EntityTypeEnum,
    hp: number
}

export type IClientInput = ActorMove | IWeaponShoot | ITimePast

export interface ActorMove {
    id: number,
    type: InputTypeEnum.ActorMove,
    direction: IVec2,
    deltaTime: number
}

export interface IBullet {
    id: number,
    owner: number,
    position: IVec2,
    direction: IVec2,
    type: EntityTypeEnum
}

export interface IState {
    actors: IActor[],
    bullets: IBullet[],
    nextBulletId: number
}

export interface IWeaponShoot {
    owner: number,
    type: InputTypeEnum.WeaponShoot,
    position: IVec2
    direction: IVec2
}

export interface ITimePast {
    type: InputTypeEnum.TypePast,
    deltaTime: number
}
