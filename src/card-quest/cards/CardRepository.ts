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
import {OreCard} from "@/card-quest/cards/content/resource/OreCard";
import {WeaponCard} from "@/card-quest/cards/content/weapon/WeaponCard";
import {Weapon} from "@/card-quest/adventure/Weapon";
import {DrawCardsCard} from "@/card-quest/cards/content/action/DrawCardsCard";
import {GrainCard} from "@/card-quest/cards/content/resource/GrainCard";
import {HealingCard} from "@/card-quest/cards/content/action/HealingCard";
import {InstantDamageCard} from "@/card-quest/cards/content/action/InstantDamageCard";
import {LoseTurnsCard} from "@/card-quest/cards/content/action/LoseTurnsCard";
import {ForestFire} from "@/card-quest/cards/content/action/ForestFire";
import {LandMineCard} from "@/card-quest/cards/content/monster/LandMineCard";
import {DiscardHand} from "@/card-quest/cards/content/action/DiscardHand";
import {NecromancerCard} from "@/card-quest/cards/content/monster/NecromancerCard";
import {RodOfAsclepiusCard} from "@/card-quest/cards/content/action/RodOfAsclepiusCard";
import {SacrificeHandCard} from "@/card-quest/cards/content/action/SacrificeHandCard";

export class CardRepository {

    public static getCard(id: CardId): PlayableCard {
        switch (id) {
            case CardId.LogCard:
                return new WoodCard(CardId.LogCard, 'Log', 'log.svg', 3, new Currency(1, CurrencyType.Wood));
            case CardId.TreeCard:
                return new WoodCard(CardId.TreeCard, 'Tree', 'tree.svg', 6, new Currency(2, CurrencyType.Wood));
            case CardId.ForestCard:
                return new WoodCard(CardId.ForestCard, 'Forest', 'forest.svg', 15, new Currency(5, CurrencyType.Wood));

            case CardId.BronzeOre:
                return new OreCard(CardId.BronzeOre, 'Bronze ore', 'ore-bronze.svg', 3, new Currency(1, CurrencyType.Bronze));
            case CardId.SilverOre:
                return new OreCard(CardId.BronzeOre, 'Silver ore', 'ore-silver.svg', 6, new Currency(1, CurrencyType.Silver));
            case CardId.GoldOre:
                return new OreCard(CardId.BronzeOre, 'Gold ore', 'ore-gold.svg', 15, new Currency(1, CurrencyType.Gold));

            case CardId.SmallGrain:
                return new GrainCard(CardId.SmallGrain, 'Grain', 'grain.svg', 3, new Currency(1, CurrencyType.Grain));
            case CardId.MediumGrain:
                return new GrainCard(CardId.MediumGrain, 'Straw', 'straw.svg', 6, new Currency(3, CurrencyType.Grain));


            // Healing
            case CardId.Bread:
                return new HealingCard(CardId.Bread, 'Bread', 'Heal 5 hitpoints', 'bread.svg', 5).setCosts([new Currency(2, CurrencyType.Grain)]);
            case CardId.ChaliceSmall:
                return new HealingCard(CardId.ChaliceSmall, 'Goblet of Energy', 'Heal 5 hitpoints', 'chalice-yellow.svg', 5).setCosts([new Currency(3, CurrencyType.Souls)])
            case CardId.ChaliceMedium:
                return new HealingCard(CardId.ChaliceMedium, 'Goblet of Fire', 'Heal 10 hitpoints', 'chalice-red.svg', 10).setCosts([new Currency(6, CurrencyType.Souls)])
            case CardId.ChaliceLarge:
                return new HealingCard(CardId.ChaliceLarge, 'Goblet of Mystics', 'Heal 15 hitpoints', 'chalice-purple.svg', 15).setCosts([new Currency(9, CurrencyType.Souls)])

            // Actions
            case CardId.MagicTouch:
                return new MagicTouchCard().setCosts([new Currency(2, CurrencyType.Souls)]);
            case CardId.SacrificeHand:
                return new SacrificeHandCard();
            case CardId.Draw3Card:
                return new DrawCardsCard(CardId.Draw3Card, 'draw-card.svg', 3).setCosts([new Currency(1, CurrencyType.Souls)]);


            case CardId.LoseTurnsSmall:
                return new LoseTurnsCard(CardId.LoseTurnsSmall, 'hourglass-yellow.svg', 5).setCosts([new Currency(1, CurrencyType.Souls)])
            case CardId.LoseTurnsMedium:
                return new LoseTurnsCard(CardId.LoseTurnsMedium, 'hourglass-red.svg', 10).setCosts([new Currency(2, CurrencyType.Souls)])
            case CardId.LoseTurnsLarge:
                return new LoseTurnsCard(CardId.LoseTurnsLarge, 'hourglass-purple.svg', 15).setCosts([new Currency(3, CurrencyType.Souls)])

            // Curses
            case CardId.InstantDamageSmall:
                return new InstantDamageCard(CardId.InstantDamageSmall, 'Energy Surge', 'damage-yellow.svg', 3)
            case CardId.InstantDamageMedium:
                return new InstantDamageCard(CardId.InstantDamageMedium, 'Fire Surge', 'damage-red.svg', 5)
            case CardId.InstantDamageLarge:
                return new InstantDamageCard(CardId.InstantDamageLarge, 'Mystic Surge', 'damage-purple.svg', 10)

            case CardId.DiscardHand:
                return new DiscardHand();

            case CardId.ForestFire:
                return new ForestFire();
            case CardId.RodOfAsclepius:
                return new RodOfAsclepiusCard();

            // Weapons
            case CardId.BasicSword:
                return new WeaponCard(CardId.BasicSword, 'Basic Sword', "A bit stronger", 'sword.svg', new Weapon('Basic Sword', 2, 0)).setCosts([new Currency(2, CurrencyType.Wood)])
            case CardId.BronzeSword:
                return new WeaponCard(CardId.BronzeSword, 'Bronze Sword', "Made from the bronzest bronze", 'sword-bronze.svg', new Weapon('Bronze Sword', 3, 1)).setCosts([new Currency(3, CurrencyType.Wood), new Currency(1, CurrencyType.Bronze)])
            case CardId.SilverSword:
                return new WeaponCard(CardId.SilverSword, 'Silver Sword', "It looks nice and shiny", 'sword-silver.svg', new Weapon('Silver Sword', 4, 2)).setCosts([new Currency(3, CurrencyType.Wood), new Currency(2, CurrencyType.Silver)])
            case CardId.GoldSword:
                return new WeaponCard(CardId.GoldSword, 'Gold Sword', "Worth its weight in gold", 'sword-gold.svg', new Weapon('Gold Sword', 6, 2)).setCosts([new Currency(4, CurrencyType.Wood), new Currency(2, CurrencyType.Gold)])
            case CardId.CrackedShield:
                return new WeaponCard(CardId.CrackedShield, 'Cracked Shield', 'Better than nothing', 'shield-cracked.svg', new Weapon('Cracked Shield', 0, 1));
            case CardId.VikingShield:
                return new WeaponCard(CardId.VikingShield, 'Viking Shield', 'Very good at blocking, but renders you unable to attack', 'shield-viking.svg', new Weapon('Viking Shield', 0, 5)).setCosts([new Currency(2, CurrencyType.Wood), new Currency(2, CurrencyType.Silver)])

            // Monsters
            case CardId.Chicken:
                return new EnemyCard(CardId.Chicken, 'Chicken', 'Cluck cluck.', 'chicken.svg', 2, 1, 1, 0, 3);
            case CardId.Cow:
                return new EnemyCard(CardId.Cow, 'Cow', 'Moo?', 'cow.svg', 5, 2, 2, 0, 3);
            case CardId.Pig:
                return new EnemyCard(CardId.Pig, 'Pig', 'Oink oink', 'pig.svg', 3, 1, 2, 0, 2);
            case CardId.Farmer:
                return new EnemyCard(CardId.Farmer, 'Master Farmer', 'Cor blimey mate, what are ye doing in me pockets?', 'farmer.svg', 9, 2, 1, 1, 4);
            case CardId.LandMine:
                return new LandMineCard(CardId.LandMine, 'Land Mine', 'land-mine.svg', 2, 10);
            case CardId.Skeleton:
                return new EnemyCard(CardId.Skeleton, 'Skeleton', 'Very spooky but moderately scary', 'skeleton.svg', 8, 1, 2, 1, 4);
            case CardId.SkeletonKing:
                return new NecromancerCard(CardId.SkeletonKing, 'Skeleton King', 'Has the power to raise skeletons from the dead', 'skeleton-king.svg', 20, 5, 1, 3, CardId.Skeleton);
            case CardId.Troll:
                return new EnemyCard(CardId.Troll, 'Troll', 'It does not smell good', 'troll.svg', 6, 2, 2, 2, 5);

            // Tools
            case CardId.BronzeAxe:
                return new ToolCard(CardId.BronzeAxe, 'Bronze axe', '2 woodcutting damage', 'hatchet-bronze.svg', ToolType.Axe, ToolTier.Bronze).setCosts([new Currency(1, CurrencyType.Wood), new Currency(1, CurrencyType.Bronze)]);
            case CardId.SilverAxe:
                return new ToolCard(CardId.SilverAxe, 'Silver axe', '3 woodcutting damage', 'hatchet-silver.svg', ToolType.Axe, ToolTier.Silver).setCosts([new Currency(2, CurrencyType.Wood), new Currency(1, CurrencyType.Silver)]);
            case CardId.GoldAxe:
                return new ToolCard(CardId.GoldAxe, 'Gold axe', '4 woodcutting damage', 'hatchet-gold.svg', ToolType.Axe, ToolTier.Gold).setCosts([new Currency(3, CurrencyType.Wood), new Currency(1, CurrencyType.Gold)]);

            case CardId.BronzePickaxe:
                return new ToolCard(CardId.BronzePickaxe, 'Bronze Pickaxe', '2 mining damage', 'pickaxe-bronze.svg', ToolType.Pickaxe, ToolTier.Bronze).setCosts([new Currency(1, CurrencyType.Wood), new Currency(1, CurrencyType.Bronze)]);
            case CardId.SilverPickaxe:
                return new ToolCard(CardId.SilverPickaxe, 'Silver Pickaxe', '3 mining damage', 'pickaxe-silver.svg', ToolType.Pickaxe, ToolTier.Silver).setCosts([new Currency(2, CurrencyType.Wood), new Currency(1, CurrencyType.Silver)]);
            case CardId.GoldPickaxe:
                return new ToolCard(CardId.GoldPickaxe, 'Gold Pickaxe', '4 mining damage', 'pickaxe-gold.svg', ToolType.Pickaxe, ToolTier.Gold).setCosts([new Currency(3, CurrencyType.Wood), new Currency(1, CurrencyType.Gold)]);

            case CardId.BronzeScythe:
                return new ToolCard(CardId.BronzeScythe, 'Bronze Scythe', '2 foraging damage', 'scythe-bronze.svg', ToolType.Scythe, ToolTier.Bronze).setCosts([new Currency(1, CurrencyType.Wood), new Currency(1, CurrencyType.Bronze)]);
            case CardId.SilverScythe:
                return new ToolCard(CardId.SilverScythe, 'Silver Scythe', '3 foraging damage', 'scythe-silver.svg', ToolType.Scythe, ToolTier.Silver).setCosts([new Currency(2, CurrencyType.Wood), new Currency(1, CurrencyType.Silver)]);
            case CardId.GoldScythe:
                return new ToolCard(CardId.GoldScythe, 'Gold Scythe', '4 foraging damage', 'scythe-gold.svg', ToolType.Scythe, ToolTier.Gold).setCosts([new Currency(3, CurrencyType.Wood), new Currency(1, CurrencyType.Gold)]);


            default:
                throw new Error(`Card with id ${id} not found.`)
        }
    }

    public static getAllCardsIds(): CardId[] {
        return EnumHelpers.getValues(CardId);
    }

    public static getCardCount(): number {
        return this.getAllCardsIds().length;
    }

    public static getDeckFromString(deckString: string): Deck | null {
        if (deckString === '') {
            return new Deck();
        }
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
        if (deckString === '') {
            return new IdDeck();
        }
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