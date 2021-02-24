import {CardId} from "@/card-quest/cards/CardId";
import {Adventure} from "@/card-quest/adventure/Adventure";
import {ActionCard} from "@/card-quest/cards/abstract/ActionCard";
import {CardType} from "@/card-quest/cards/CardType";

export class MagicTouchCard extends ActionCard {

    constructor() {
        super(CardId.MagicTouch, 'Magic touch', 'Tap every card in the field once', CardType.Action, 'magic-touch.svg');
    }

    play(adventure: Adventure): void {
        for (const card of adventure.field) {
            card.tap(adventure);
        }
    }

}