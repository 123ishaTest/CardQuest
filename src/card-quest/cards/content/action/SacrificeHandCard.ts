import {ActionCard} from "@/card-quest/cards/abstract/ActionCard";
import {Adventure} from "@/card-quest/adventure/Adventure";
import {CardType} from "@/card-quest/cards/CardType";
import {CardId} from "@/card-quest/cards/CardId";
import {CurrencyType} from "@/ig-template/features/wallet/CurrencyType";
import {Currency} from "@/ig-template/features/wallet/Currency";

export class SacrificeHandCard extends ActionCard {

    constructor() {
        super(CardId.SacrificeHand, 'Sacrifice hand', 'Discard entire hand.\nGain 3 souls', CardType.Action, 'sacrifice-hand.svg');
    }

    play(adventure: Adventure): void {
        for (let i = 0; i < adventure.playerHand.length; i++) {
            adventure.discard(i);
        }
        adventure.wallet.gainCurrency(new Currency(3, CurrencyType.Souls));
    }

}