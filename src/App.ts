import {Game} from "./ig-template/Game";
import {Wallet} from "@/ig-template/features/wallet/Wallet";
import {CurrencyType} from "@/ig-template/features/wallet/CurrencyType";
import {Settings} from "@/ig-template/features/settings/Settings";
import {Statistics} from "@/ig-template/features/statistics/Statistics";
import {Adventure} from "@/card-quest/Adventure";
import {Deck} from "@/card-quest/cards/Deck";
import {Level} from "@/card-quest/adventure/Level";
import {ExampleCard} from "@/card-quest/cards/ExampleCard";
import {WoodCard} from "@/card-quest/cards/WoodCard";

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
                wallet: new Wallet([CurrencyType.Money]),
                settings: new Settings(),
                statistics: new Statistics(),
                adventure: new Adventure(new Deck([
                    new ExampleCard(),
                    new ExampleCard(),
                    new ExampleCard(),
                    new ExampleCard(),
                    new ExampleCard(),
                    new ExampleCard(),
                    new WoodCard(5),
                    new WoodCard(5),
                    new WoodCard(5),
                    new WoodCard(5),
                    new WoodCard(5),
                    new WoodCard(5),
                    new WoodCard(5),
                ]), new Level([])),
            }
        );
    }
}
