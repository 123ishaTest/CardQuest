import {Game} from "./ig-template/Game";
import {Wallet} from "@/ig-template/features/wallet/Wallet";
import {CurrencyType} from "@/ig-template/features/wallet/CurrencyType";
import {Settings} from "@/ig-template/features/settings/Settings";
import {Statistics} from "@/ig-template/features/statistics/Statistics";
import {Adventure} from "@/card-quest/adventure/Adventure";
import {Deck} from "@/card-quest/cards/Deck";
import {Level} from "@/card-quest/adventure/Level";
import {WoodCard} from "@/card-quest/cards/WoodCard";
import {Currency} from "@/ig-template/features/wallet/Currency";
import {ExampleMagicCard} from "@/card-quest/cards/ExampleMagicCard";
import {PlayerStats} from "@/card-quest/adventure/PlayerStats";
import {EnemyCard} from "@/card-quest/cards/EnemyCard";
import {CardId} from "@/card-quest/cards/CardId";

export class App {

    static game: Game;

    static start(): void {

        this.game = this.getDefaultGame();
        this.game.initialize();
        this.game.load();
        this.game.start();
    }


    public static getDefaultGame(): Game {
        return new Game(
            {
                wallet: new Wallet([
                    CurrencyType.Money,
                    CurrencyType.Souls,
                    CurrencyType.Wood,
                    CurrencyType.Bronze,
                    CurrencyType.Silver,
                    CurrencyType.Gold,
                ]),
                settings: new Settings(),
                statistics: new Statistics(),
                adventure: new Adventure(new Deck([
                    new ExampleMagicCard().setCosts([new Currency(1, CurrencyType.Souls)]),
                    new ExampleMagicCard().setCosts([new Currency(2, CurrencyType.Souls)]),
                    new EnemyCard(CardId.EnemyCard, 'Enemy card', 'enemy.png', 5, 3, 2, 1, 4),
                    new WoodCard(5),
                    new WoodCard(5),
                    new WoodCard(5),
                ]), new Level([]),
                    new PlayerStats(20)),
            }
        );
    }
}
