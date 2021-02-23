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
import {EnumHelpers} from "@/ig-template/tools/EnumHelpers";
import {IdDeck} from "@/card-quest/cards/IdDeck";

export class CardRepository {
    public static getCard(id: CardId): PlayableCard {
        switch (id) {
            case CardId.WoodCard:
                return new WoodCard(2);
            case CardId.MagicTouch:
                return new MagicTouchCard().setCosts([new Currency(2, CurrencyType.Souls)]);
            case CardId.EnemyCard:
                return new EnemyCard(CardId.EnemyCard, 'Goblin', '', 'goblin.svg', 5, 3, 2, 1, 4);


            // Tools
            case CardId.BronzeAxe:
                return new ToolCard(CardId.BronzeAxe, 'Bronze axe', '+1 woodcutting damage', 'hatchet-bronze.svg', ToolType.Axe, ToolTier.Bronze).setCosts([new Currency(4, CurrencyType.Wood)]);
            case CardId.SilverAxe:
                return new ToolCard(CardId.SilverAxe, 'Silver axe', '+2 woodcutting damage', 'hatchet-silver.svg', ToolType.Axe, ToolTier.Silver).setCosts([new Currency(4, CurrencyType.Wood)]);
            case CardId.GoldAxe:
                return new ToolCard(CardId.GoldAxe, 'Gold axe', '+4 woodcutting damage', 'hatchet-gold.svg', ToolType.Axe, ToolTier.Gold).setCosts([new Currency(4, CurrencyType.Wood)]);

            case CardId.BronzePickaxe:
                return new ToolCard(CardId.BronzePickaxe, 'Bronze Pickaxe', '+1 mining damage', 'pickaxe-bronze.svg', ToolType.Pickaxe, ToolTier.Bronze).setCosts([new Currency(4, CurrencyType.Wood)]);
            case CardId.SilverPickaxe:
                return new ToolCard(CardId.SilverPickaxe, 'Silver Pickaxe', '+2 mining damage', 'pickaxe-silver.svg', ToolType.Pickaxe, ToolTier.Silver).setCosts([new Currency(4, CurrencyType.Wood)]);
            case CardId.GoldPickaxe:
                return new ToolCard(CardId.GoldPickaxe, 'Gold Pickaxe', '+4 mining damage', 'pickaxe-gold.svg', ToolType.Pickaxe, ToolTier.Gold).setCosts([new Currency(4, CurrencyType.Wood)]);

            case CardId.BronzeScythe:
                return new ToolCard(CardId.BronzeScythe, 'Bronze Scythe', '+1 foraging damage', 'scythe-bronze.svg', ToolType.Scythe, ToolTier.Bronze).setCosts([new Currency(4, CurrencyType.Wood)]);
            case CardId.SilverScythe:
                return new ToolCard(CardId.SilverScythe, 'Silver Scythe', '+2 foraging damage', 'scythe-silver.svg', ToolType.Scythe, ToolTier.Silver).setCosts([new Currency(4, CurrencyType.Wood)]);
            case CardId.GoldScythe:
                return new ToolCard(CardId.GoldScythe, 'Gold Scythe', '+4 foraging damage', 'scythe-gold.svg', ToolType.Scythe, ToolTier.Gold).setCosts([new Currency(4, CurrencyType.Wood)]);


            default:
                throw new Error(`Card with id ${id} not found.`)
        }
    }

    public static getAllCardsIds(): CardId[] {
        return EnumHelpers.getValues(CardId);
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

    public static getDeckFromIdDeck(idDeck: IdDeck): Deck {
        // TODO Ugly but it works
        return this.getDeckFromString(idDeck.toDeckString()) ?? new Deck();
    }

    public static getIdDeckFromString(deckString: string): IdDeck | null {
        try {
            const ids = deckString.split('.').map(string => {
                return parseInt(string);
            });
            const idDeck = new IdDeck();
            for (const id of ids) {
                idDeck.addCard(id);
            }
            return idDeck;
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