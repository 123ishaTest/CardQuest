import {ActionCard} from "@/card-quest/cards/abstract/ActionCard";
import {Adventure} from "@/card-quest/adventure/Adventure";
import {CardId} from "@/card-quest/cards/CardId";
import {CardType} from "@/card-quest/cards/CardType";
import {EnemyCard} from "@/card-quest/cards/content/monster/EnemyCard";

export class FreezeMonstersCard extends ActionCard {
    turns: number

    constructor(id: CardId, title: string, image: string, turns: number) {
        super(id, title, `Freeze all monsters for ${turns} turns`, CardType.Action, image);
        this.turns = turns;
    }

    play(adventure: Adventure): void {
        for (const card of adventure.field) {
            if (card instanceof EnemyCard) {
                card.frozenCooldown += this.turns + 1;
            }
        }
    }

}