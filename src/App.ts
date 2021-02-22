import {Game} from "./ig-template/Game";
import {Wallet} from "@/ig-template/features/wallet/Wallet";
import {CurrencyType} from "@/ig-template/features/wallet/CurrencyType";
import {Settings} from "@/ig-template/features/settings/Settings";
import {Statistics} from "@/ig-template/features/statistics/Statistics";
import {Adventure} from "@/card-quest/adventure/Adventure";
import {Level} from "@/card-quest/adventure/Level";
import {PlayerStats} from "@/card-quest/adventure/PlayerStats";
import {CardId} from "@/card-quest/cards/CardId";
import {CardRepository} from "@/card-quest/cards/CardRepository";

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
                adventure: new Adventure(CardRepository.getDeckFromCardIds([
                        CardId.CardMagicExample,
                        CardId.CardMagicExample,
                        CardId.BronzeAxe,
                        CardId.EnemyCard,
                        CardId.WoodCard,
                        CardId.WoodCard,
                        CardId.WoodCard,
                    ]), new Level([
                        [10, CardRepository.getCard(CardId.EnemyCard)],
                        [15, CardRepository.getCard(CardId.EnemyCard)],
                    ]),
                    new PlayerStats(20)),
            }
        );
    }
}
