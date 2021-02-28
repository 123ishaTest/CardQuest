import {ActionCard} from "@/card-quest/cards/abstract/ActionCard";
import {Adventure} from "@/card-quest/adventure/Adventure";
import {CardId} from "@/card-quest/cards/CardId";
import {CardType} from "@/card-quest/cards/CardType";
import {EnemyCard} from "@/card-quest/cards/content/monster/EnemyCard";

export class InstantDamagePlayerCard extends ActionCard {
    damage: number

    constructor(id: CardId, title: string, image: string, damage: number) {
        super(id, title, `Instantly deal ${damage} damage to each monster, ignoring defense`, CardType.Action, image);
        this.damage = damage;
    }

    play(adventure: Adventure): void {
        for (const card of adventure.field) {
            if (card instanceof EnemyCard) {
                card.takeDamage(this.damage);
            }
        }
    }

}