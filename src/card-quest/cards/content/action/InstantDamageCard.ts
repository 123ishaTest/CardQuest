import {ActionCard} from "@/card-quest/cards/abstract/ActionCard";
import {Adventure} from "@/card-quest/adventure/Adventure";
import {CardId} from "@/card-quest/cards/CardId";
import {CardType} from "@/card-quest/cards/CardType";

export class InstantDamageCard extends ActionCard {
    damage: number

    constructor(id: CardId, title: string, image: string, damage: number) {
        super(id, title, `Instantly deal ${damage} damage, ignoring defense`, CardType.Curse, image);
        this.damage = damage;
    }

    play(adventure: Adventure): void {
        adventure.playerStats.attackFor(this.damage, true);
    }

}