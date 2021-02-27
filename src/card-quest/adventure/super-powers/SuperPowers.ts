import {PlayerStats} from "@/card-quest/adventure/PlayerStats";
import {SuperPower} from "@/card-quest/adventure/super-powers/SuperPower";
import {Weapon} from "@/card-quest/adventure/Weapon";
import {Feature} from "@/ig-template/features/Feature";
import {SaveData} from "@/ig-template/tools/saving/SaveData";

export class SuperPowers extends Feature {

    scythe: SuperPower;
    axe: SuperPower;
    pickaxe: SuperPower;
    health: SuperPower;
    startingCards: SuperPower;


    constructor() {
        super('super-powers');
        this.scythe = new SuperPower('Scythe', [0, 100, 500, 1000], [0, 1, 2, 3, 4], ['Stone', 'Bronze', 'Silver', 'Gold']);
        this.axe = new SuperPower('Axe', [0, 100, 500, 1000], [0, 1, 2, 3, 4], ['Stone', 'Bronze', 'Silver', 'Gold']);
        this.pickaxe = new SuperPower('Pick', [0, 100, 500, 1000], [0, 1, 2, 3, 4], ['Stone', 'Bronze', 'Silver', 'Gold']);
        this.health = new SuperPower('Base health', [0, 100, 500, 1000], [30, 40, 50, 60], ['30', '40', '50', '60']);
        this.startingCards = new SuperPower('Starting Cards', [0, 100, 500], [5, 6, 7], ['5', '6', '7']);
    }

    public getPlayerStats(): PlayerStats {
        return new PlayerStats(
            this.startingCards.value,
            this.health.value,
            new Weapon('Training Sword', 1, 0),
            this.axe.value,
            this.pickaxe.value,
            this.scythe.value,
        )
    }

    public getTotalCosts(): number {
        return this.scythe.cost +
            this.pickaxe.cost +
            this.axe.cost +
            this.health.cost +
            this.startingCards.cost;
    }

    load(data: SaveData): void {
        // Empty
    }

    save(): SaveData {
        return {};
    }
}