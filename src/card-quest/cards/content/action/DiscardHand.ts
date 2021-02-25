import {ActionCard} from "@/card-quest/cards/abstract/ActionCard";
import {Adventure} from "@/card-quest/adventure/Adventure";
import {CardType} from "@/card-quest/cards/CardType";
import {CardId} from "@/card-quest/cards/CardId";

export class DiscardHand extends ActionCard {

    constructor() {
        super(CardId.DiscardHand, 'Discard hand', 'The player is forced to discard their entire hand', CardType.Curse, 'discard-hand.svg');
    }

    play(adventure: Adventure): void {
        for (let i = 0; i < adventure.playerHand.length; i++) {
            adventure.discard(i);
        }
    }

}