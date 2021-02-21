import {Axe} from "@/card-quest/adventure/tools/Axe";

export class PlayerStats {
    health: number;

    activeAxe: Axe;

    constructor(health: number, activeAxe: Axe = Axe.Stone) {
        this.health = health;
        this.activeAxe = activeAxe;
    }

    public attackFor(amount: number) {
        this.health -= amount - this.getDefense();
    }

    public getWoodCuttingDamage() {
        return 1 + this.activeAxe;
    }

    public getAttack() {
        // TODO take tools into account
        return 2;
    }

    public getDefense() {
        // TODO take tools into account
        return 1;
    }
}