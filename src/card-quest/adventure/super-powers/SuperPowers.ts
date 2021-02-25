import {PlayerStats} from "@/card-quest/adventure/PlayerStats";
import {SuperPower} from "@/card-quest/adventure/super-powers/SuperPower";
import {Weapon} from "@/card-quest/adventure/Weapon";
import {ToolTier} from "@/card-quest/adventure/tools/ToolTier";
import {Feature} from "@/ig-template/features/Feature";
import {SaveData} from "@/ig-template/tools/saving/SaveData";

export class SuperPowers extends Feature {

    scythe: SuperPower;
    axe: SuperPower;


    constructor() {
        super('super-powers');
        this.scythe = new SuperPower('Scythe', [0, 100, 500, 1000], [0, 1, 2, 3, 4], ['Stone', 'Bronze', 'Silver', 'Gold']);
        this.axe = new SuperPower('Axe', [0, 100, 500, 1000], [0, 1, 2, 3, 4], ['Stone', 'Bronze', 'Silver', 'Gold']);
    }

    public getPlayerStats(): PlayerStats {
        return new PlayerStats(
            7,
            20,
            new Weapon('Training Sword', 1, 0),
            this.axe.value,
            ToolTier.Stone,
            this.scythe.value,
        )
    }

    public getTotalCosts(): number {
        return this.scythe.cost + this.axe.cost;
    }

    load(data: SaveData): void {
        // Empty
    }

    save(): SaveData {
        return {};
    }
}