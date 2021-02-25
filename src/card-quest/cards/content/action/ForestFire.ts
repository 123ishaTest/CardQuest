import {ActionCard} from "@/card-quest/cards/abstract/ActionCard";
import {Adventure} from "@/card-quest/adventure/Adventure";
import {WoodCard} from "@/card-quest/cards/content/resource/WoodCard";
import {CurrencyType} from "@/ig-template/features/wallet/CurrencyType";
import {Currency} from "@/ig-template/features/wallet/Currency";
import {CardId} from "@/card-quest/cards/CardId";
import {CardType} from "@/card-quest/cards/CardType";

export class ForestFire extends ActionCard {


    constructor() {
        super(CardId.ForestFire, 'Forest Fire', 'Remove all wood resources from the field', CardType.Curse, 'forest-fire.svg');
    }

    play(adventure: Adventure): void {
        for (const card of adventure.field) {
            if (card instanceof WoodCard) {
                card.reward = new Currency(0, CurrencyType.Wood);
                card.takeDamage(Infinity);
            }
        }
    }

}