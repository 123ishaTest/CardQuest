import {ActionCard} from "@/card-quest/cards/abstract/ActionCard";
import {Adventure} from "@/card-quest/adventure/Adventure";
import {Weapon} from "@/card-quest/adventure/Weapon";
import {CardId} from "@/card-quest/cards/CardId";
import {CardType} from "@/card-quest/cards/CardType";

export class WeaponCard extends ActionCard {
    weapon: Weapon;


    constructor(id: CardId, title: string, description: string, image: string, weapon: Weapon) {
        super(id, title, description, CardType.Tool, image);
        this.weapon = weapon;
    }

    play(adventure: Adventure): void {
        adventure.playerStats.activeWeapon = this.weapon;
    }

}