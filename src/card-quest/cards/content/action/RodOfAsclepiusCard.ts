import {ActionCard} from "@/card-quest/cards/abstract/ActionCard";
import {Adventure} from "@/card-quest/adventure/Adventure";
import {CardType} from "@/card-quest/cards/CardType";
import {CardId} from "@/card-quest/cards/CardId";
import {EnemyCard} from "@/card-quest/cards/content/monster/EnemyCard";

export class RodOfAsclepiusCard extends ActionCard {

    constructor() {
        super(CardId.RodOfAsclepius, 'Rod of Asclepius', 'All monsters in the field gain 3 health', CardType.Curse, 'asclepius.svg');
    }

    play(adventure: Adventure): void {
        for (const card of adventure.field) {
            if (card instanceof EnemyCard) {
                card.health += 3;
            }
        }
    }

}