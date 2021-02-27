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
                    new CardPack(CardPackId.ExamplePack, [
                        new Outcome<CardId>(CardId.LogCard, 1),
                        new Outcome<CardId>(CardId.MagicTouch, 1),
                        new Outcome<CardId>(CardId.BronzeAxe, 1),
                    ]),
                    new CardPack(CardPackId.BronzeToolPack, [
                        new Outcome<CardId>(CardId.BronzeAxe, 1),
                        new Outcome<CardId>(CardId.BronzePickaxe, 1),
                        new Outcome<CardId>(CardId.BronzeScythe, 1),
                    ]),
                    new CardPack(CardPackId.SilverToolPack, [
                        new Outcome<CardId>(CardId.SilverAxe, 1),
                        new Outcome<CardId>(CardId.SilverPickaxe, 1),
                        new Outcome<CardId>(CardId.SilverScythe, 1),
                    ]),
                    new CardPack(CardPackId.GoldToolPack, [
                        new Outcome<CardId>(CardId.GoldAxe, 1),
                        new Outcome<CardId>(CardId.GoldPickaxe, 1),
                        new Outcome<CardId>(CardId.GoldScythe, 1),
                    ]),
                    new CardPack(CardPackId.AllToolPack, [
                        new Outcome<CardId>(CardId.BronzeAxe, 1),
                        new Outcome<CardId>(CardId.BronzePickaxe, 1),
                        new Outcome<CardId>(CardId.BronzeScythe, 1),
                        new Outcome<CardId>(CardId.SilverAxe, 1),
                        new Outcome<CardId>(CardId.SilverPickaxe, 1),
                        new Outcome<CardId>(CardId.SilverScythe, 1),
                        new Outcome<CardId>(CardId.GoldAxe, 1),
                        new Outcome<CardId>(CardId.GoldPickaxe, 1),
                        new Outcome<CardId>(CardId.GoldScythe, 1),
                    ]),
                    new CardPack(CardPackId.VarietyPack, [
                        new Outcome<CardId>(CardId.LogCard, 1),
                        new Outcome<CardId>(CardId.ForestCard, 1),
                        new Outcome<CardId>(CardId.SilverOre, 1),
                        new Outcome<CardId>(CardId.MagicTouch, 1),
                        new Outcome<CardId>(CardId.Draw3Card, 1),
                        new Outcome<CardId>(CardId.Pig, 1),
                        new Outcome<CardId>(CardId.Chicken, 1),
                        new Outcome<CardId>(CardId.Cow, 1),
                        new Outcome<CardId>(CardId.BronzeAxe, 1),
                        new Outcome<CardId>(CardId.SilverScythe, 1),
                        new Outcome<CardId>(CardId.GoldPickaxe, 1),
                    ])
                ]),
                superPowers: new SuperPowers(),
                achievements: new Achievements(),
            }
        );

        game.features.collection.gainCard(CardId.LogCard, 5);
        game.features.collection.gainCard(CardId.BronzeOre, 5);
        game.features.collection.gainCard(CardId.SmallGrain, 5);
        game.features.collection.gainCard(CardId.BasicSword, 2);
        game.features.collection.gainCard(CardId.Chicken, 5);
        game.features.collection.gainCard(CardId.Draw3Card, 3);
        game.features.collection.gainCard(CardId.MagicTouch, 3);
        game.features.collection.gainCard(CardId.Bread, 5);
        game.features.collection.gainCard(CardId.LoseTurnsSmall, 3);

        return game;
    }
}
