import {ToolTier} from "@/card-quest/adventure/tools/ToolTier";
import {Weapon} from "@/card-quest/adventure/Weapon";

export class PlayerStats {
    startingCards: number;

    health: number;
    activeAxe: ToolTier;
    activePickaxe: ToolTier;
    activeScythe: ToolTier;

    activeWeapon: Weapon;

    constructor(startingCards: number, health: number, activeWeapon: Weapon = new Weapon('Training Sword', 1, 0), activeAxe: ToolTier = ToolTier.Stone, activePickaxe: ToolTier = ToolTier.Stone, activeScythe: ToolTier = ToolTier.Stone) {
        this.startingCards = startingCards;
        this.health = health;
        this.activeAxe = activeAxe;
        this.activePickaxe = activePickaxe;
        this.activeScythe = activeScythe;

        this.activeWeapon = activeWeapon;
    }

    public attackFor(amount: number, ignoreDefense: boolean = false) {
        const actualDefense = ignoreDefense ? 0 : this.getDefense();
        const actualDamage = Math.max(0, amount - actualDefense);
        this.health -= actualDamage;
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
        return this.activeWeapon.attack;
    }

    public getDefense() {
        return this.activeWeapon.defense;
    }
}