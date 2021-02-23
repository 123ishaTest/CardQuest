import {ToolTier} from "@/card-quest/adventure/tools/ToolTier";

export class PlayerStats {
    startingCards: number;

    health: number;
    activeAxe: ToolTier;
    activePickaxe: ToolTier;
    activeScythe: ToolTier;

    constructor(startingCards: number, health: number, activeAxe: ToolTier = ToolTier.Stone, activePickaxe: ToolTier = ToolTier.Stone, activeScythe: ToolTier = ToolTier.Stone) {
        this.startingCards = startingCards;
        this.health = health;
        this.activeAxe = activeAxe;
        this.activePickaxe = activePickaxe;
        this.activeScythe = activeScythe;
    }

    public attackFor(amount: number) {
        this.health -= amount - this.getDefense();
    }

    public getWoodCuttingDamage() {
        return 1 + this.activeAxe;
    }

    public getMiningDamage() {
        return 1 + this.activePickaxe;
    }

    public getForagingDamage() {
        return 1 + this.activeScythe;
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