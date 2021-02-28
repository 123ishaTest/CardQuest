import {Game} from "./ig-template/Game";
import {Wallet} from "@/ig-template/features/wallet/Wallet";
import {CurrencyType} from "@/ig-template/features/wallet/CurrencyType";
import {Settings} from "@/ig-template/features/settings/Settings";
import {Statistics} from "@/ig-template/features/statistics/Statistics";
import {CardId} from "@/card-quest/cards/CardId";
import {CardCollection} from "@/card-quest/features/card-collection/CardCollection";
import {CardPack} from "@/card-quest/features/card-collection/CardPack";
import {CardPackId} from "@/card-quest/features/card-collection/CardPackId";
import {Outcome} from "@/ig-template/tools/probability/Outcome";
import {EmptyAdventure} from "@/card-quest/adventure/EmptyAdventure";
import {SuperPowers} from "@/card-quest/adventure/super-powers/SuperPowers";
import {Achievements} from "@/ig-template/features/achievements/Achievements";
import {Automation} from "@/card-quest/features/automation/Automation";
import {Currency} from "@/ig-template/features/wallet/Currency";
import {LevelEditor} from "@/card-quest/features/level-editor/LevelEditor";

export class App {

    static game: Game;

    static start(): void {

        this.game = this.getDefaultGame();
        this.game.initialize();
        this.game.load();
        this.game.start();
    }


    public static getDefaultGame(): Game {
        const game = new Game(
            {
                wallet: new Wallet([
                    CurrencyType.Money,
                    CurrencyType.Souls,
                    CurrencyType.Grain,
                    CurrencyType.Wood,
                    CurrencyType.Bronze,
                    CurrencyType.Silver,
                    CurrencyType.Gold,
                ]),
                settings: new Settings(),
                statistics: new Statistics(),
                adventure: new EmptyAdventure(),
                automation: new Automation(),
                collection: new CardCollection([
                    new CardPack(CardPackId.BeginnerPack,
                        new Currency(100, CurrencyType.Money),
                        true,
                        [
                            new Outcome<CardId>(CardId.BronzeAxe, 1),
                            new Outcome<CardId>(CardId.LogCard, 2),
                            new Outcome<CardId>(CardId.SmallGrain, 2),
                            new Outcome<CardId>(CardId.Bread, 2),
                        ]),
                    new CardPack(CardPackId.BronzeTierPack,
                        new Currency(200, CurrencyType.Money),
                        true,
                        [
                            new Outcome<CardId>(CardId.BronzeAxe, 1),
                            new Outcome<CardId>(CardId.InstantDamagePlayerSmall, 1),
                            new Outcome<CardId>(CardId.BronzePickaxe, 1),
                            new Outcome<CardId>(CardId.BronzeScythe, 1),
                            new Outcome<CardId>(CardId.LogCard, 3),
                            new Outcome<CardId>(CardId.BronzeOre, 3),
                            new Outcome<CardId>(CardId.SmallGrain, 3),
                            new Outcome<CardId>(CardId.BasicSword, 3),
                            new Outcome<CardId>(CardId.BronzeSword, 3),
                            new Outcome<CardId>(CardId.Bread, 3),
                        ]),
                    new CardPack(CardPackId.SilverTierPack,
                        new Currency(500, CurrencyType.Money),
                        true,
                        [
                            new Outcome<CardId>(CardId.SilverAxe, 1),
                            new Outcome<CardId>(CardId.SilverPickaxe, 1),
                            new Outcome<CardId>(CardId.InstantDamagePlayerMedium, 1),
                            new Outcome<CardId>(CardId.SilverScythe, 1),
                            new Outcome<CardId>(CardId.TreeCard, 3),
                            new Outcome<CardId>(CardId.FreezeMonstersSmall, 1),
                            new Outcome<CardId>(CardId.SilverOre, 3),
                            new Outcome<CardId>(CardId.MediumGrain, 3),
                            new Outcome<CardId>(CardId.SilverSword, 3),
                            new Outcome<CardId>(CardId.CrackedShield, 1),
                            new Outcome<CardId>(CardId.ChaliceSmall, 1),
                        ]),
                    new CardPack(CardPackId.GoldTierPack,
                        new Currency(800, CurrencyType.Money),
                        true,
                        [
                            new Outcome<CardId>(CardId.GoldAxe, 1),
                            new Outcome<CardId>(CardId.GoldPickaxe, 1),
                            new Outcome<CardId>(CardId.GoldScythe, 1),
                            new Outcome<CardId>(CardId.InstantDamagePlayerLarge, 1),
                            new Outcome<CardId>(CardId.ForestCard, 3),
                            new Outcome<CardId>(CardId.GoldOre, 3),
                            new Outcome<CardId>(CardId.GoldSword, 1),
                            new Outcome<CardId>(CardId.FreezeMonstersMedium, 1),
                            new Outcome<CardId>(CardId.VikingShield, 1),
                            new Outcome<CardId>(CardId.ChaliceMedium, 1),
                        ]),
                    new CardPack(CardPackId.ActionCardPack,
                        new Currency(300, CurrencyType.Money),
                        true,
                        [
                            new Outcome<CardId>(CardId.MagicTouch, 1),
                            new Outcome<CardId>(CardId.SacrificeHand, 0.5),
                            new Outcome<CardId>(CardId.Draw3Card, 1),
                            new Outcome<CardId>(CardId.LoseTurnsSmall, 0.6),
                            new Outcome<CardId>(CardId.LoseTurnsMedium, 0.3),
                            new Outcome<CardId>(CardId.LoseTurnsLarge, 0.2),
                            new Outcome<CardId>(CardId.FreezeMonstersSmall, 0.2),
                            new Outcome<CardId>(CardId.InstantDamagePlayerSmall, 0.4),
                            new Outcome<CardId>(CardId.InstantDamagePlayerMedium, 0.4),
                        ]),
                    new CardPack(CardPackId.FarmPack,
                        new Currency(150, CurrencyType.Money),
                        true,
                        [
                            new Outcome<CardId>(CardId.Pig, 1),
                            new Outcome<CardId>(CardId.Chicken, 1),
                            new Outcome<CardId>(CardId.Cow, 1),
                            new Outcome<CardId>(CardId.Farmer, 1),
                        ]),
                    new CardPack(CardPackId.MonsterPack,
                        new Currency(200, CurrencyType.Money),
                        true,
                        [
                            new Outcome<CardId>(CardId.Skeleton, 1),
                            new Outcome<CardId>(CardId.LandMine, 0.5),
                            new Outcome<CardId>(CardId.Farmer, 1),
                            new Outcome<CardId>(CardId.Chicken, 1),
                            new Outcome<CardId>(CardId.Dragon, 1),
                        ]),
                    new CardPack(CardPackId.CursePack,
                        new Currency(125, CurrencyType.Money),
                        true,
                        [
                            new Outcome<CardId>(CardId.InstantDamageSmall, 1),
                            new Outcome<CardId>(CardId.InstantDamageMedium, 1),
                            new Outcome<CardId>(CardId.InstantDamageLarge, 1),
                            new Outcome<CardId>(CardId.DiscardHand, 1),
                            new Outcome<CardId>(CardId.ForestFire, 1),
                            new Outcome<CardId>(CardId.RodOfAsclepius, 1),
                        ]),
                    new CardPack(CardPackId.Legendary,
                        new Currency(1000, CurrencyType.Money),
                        true,
                        [
                            new Outcome<CardId>(CardId.VikingShield, 1),
                            new Outcome<CardId>(CardId.SacrificeHand, 1),
                            new Outcome<CardId>(CardId.ChaliceMedium, 1),
                            new Outcome<CardId>(CardId.ChaliceLarge, 1),
                            new Outcome<CardId>(CardId.InstantDamagePlayerLarge, 1),
                        ]),
                ]),
                editor: new LevelEditor(),
                superPowers: new SuperPowers(),
                achievements: new Achievements(),
            }
        );

        game.features.collection.gainCard(CardId.LogCard, 5);
        game.features.collection.gainCard(CardId.BronzeOre, 5);
        game.features.collection.gainCard(CardId.SmallGrain, 4);
        game.features.collection.gainCard(CardId.BasicSword, 1);
        game.features.collection.gainCard(CardId.BronzeSword, 1);
        game.features.collection.gainCard(CardId.Chicken, 1);
        game.features.collection.gainCard(CardId.FreezeMonstersSmall, 1);
        game.features.collection.gainCard(CardId.Draw3Card, 3);
        game.features.collection.gainCard(CardId.MagicTouch, 3);
        game.features.collection.gainCard(CardId.Bread, 2);

        game.features.collection.selectAllCards();

        return game;
    }
}
