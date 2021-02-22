import {CardId} from "@/card-quest/cards/CardId";
import {PlayableCard} from "@/card-quest/cards/abstract/PlayableCard";
import {ToolCard} from "@/card-quest/cards/content/action/ToolCard";
import {ToolType} from "@/card-quest/adventure/tools/ToolType";
import {ToolTier} from "@/card-quest/adventure/tools/ToolTier";
import {Currency} from "@/ig-template/features/wallet/Currency";
import {CurrencyType} from "@/ig-template/features/wallet/CurrencyType";
import {Deck} from "@/card-quest/cards/Deck";
import {EnemyCard} from "@/card-quest/cards/content/monster/EnemyCard";
import {MagicTouchCard} from "@/card-quest/cards/content/action/MagicTouchCard";
import {WoodCard} from "@/card-quest/cards/content/resource/WoodCard";

export class CardRepository {
    public static getCard(id: CardId): PlayableCard {
        switch (id) {
            case CardId.WoodCard:
                return new WoodCard(2);
            case CardId.MagicTouch:
                return new MagicTouchCard().setCosts([new Currency(2, CurrencyType.Souls)]);
            case CardId.EnemyCard:
                return new EnemyCard(CardId.EnemyCard, 'Goblin', '', 'default.svg', 5, 3, 2, 1, 4);
            case CardId.BronzeAxe:
                return new ToolCard(CardId.BronzeAxe, 'Bronze axe', '+1 woodcutting damage', 'hatchet-bronze.svg', ToolType.Axe, ToolTier.Bronze).setCosts([new Currency(4, CurrencyType.Wood)]);
            default:
                throw new Error(`Card with id ${id} not found.`)
        }
    }

    public static getDeckFromString(deckString: string): Deck | null {
        try {
            const ids = deckString.split('.').map(string => {
                return parseInt(string);
            });
            return this.getDeckFromCardIds(ids);
        } catch (e) {
            return null;
        }
    }

    public static getDeckFromCardIds(ids: CardId[]): Deck {
        const cards = ids.map(id => {
            return this.getCard(id);
        })
        return new Deck(cards);
    }
}