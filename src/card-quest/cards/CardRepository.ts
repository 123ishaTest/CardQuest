import {CardId} from "@/card-quest/cards/CardId";
import {PlayableCard} from "@/card-quest/cards/PlayableCard";
import {ToolCard} from "@/card-quest/cards/ToolCard";
import {ToolType} from "@/card-quest/adventure/tools/ToolType";
import {ToolTier} from "@/card-quest/adventure/tools/ToolTier";
import {Currency} from "@/ig-template/features/wallet/Currency";
import {CurrencyType} from "@/ig-template/features/wallet/CurrencyType";

export class CardRepository {
    public static getCard(id: CardId): PlayableCard {
        switch (id) {
            case CardId.CardExample:
                break;
            case CardId.WoodCard:
                break;
            case CardId.CardMagicExample:
                break;
            case CardId.EnemyCard:
                break;
            case CardId.BronzeAxe:
                return new ToolCard(CardId.BronzeAxe, 'Bronze axe', '+1 woodcutting damage', 'bronze-axe.png', ToolType.Axe, ToolTier.Bronze).setCosts([new Currency(4, CurrencyType.Wood)]);
        }
    }
}