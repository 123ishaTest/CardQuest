import {Deck} from "@/card-quest/cards/Deck";
import {Level} from "@/card-quest/adventure/Level";
import {PlayableCard} from "@/card-quest/cards/abstract/PlayableCard";
import {Feature} from "@/ig-template/features/Feature";
import {SaveData} from "@/ig-template/tools/saving/SaveData";
import {Wallet} from "@/ig-template/features/wallet/Wallet";
import {Features} from "@/ig-template/Features";
import {PlayerStats} from "@/card-quest/adventure/PlayerStats";
import {ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";
import {CardType} from "@/card-quest/cards/CardType";
import {KeyBind} from "@/ig-template/tools/hotkeys/KeyBind";
import {HotKeys} from "@/ig-template/tools/hotkeys/HotKeys";
import {EmptyCard} from "@/card-quest/cards/EmptyCard";

export class Adventure extends Feature {

    public readonly MAX_CARDS = 7;
    isActive: boolean;
    playerDeck: Deck;

    level: Level;

    playerHand: PlayableCard[] = [];
    field: PlayableCard[] = [];

    wallet: Wallet;
    playerStats: PlayerStats

    deletionQueue: PlayableCard[] = [];

    currentTurn: number = 0;

    private _onWin = new SimpleEventDispatcher<Level>();
    private _onLose = new SimpleEventDispatcher<Level>();

    /**
     * Emitted whenever the game is won
     */
    public get onWin(): ISimpleEvent<Level> {
        return this._onWin.asEvent();
    }

    /**
     * Emitted whenever the game is lost
     */
    public get onLose(): ISimpleEvent<Level> {
        return this._onLose.asEvent();
    }


    constructor(playerDeck: Deck, level: Level, playerStats: PlayerStats) {
        super('adventure');
        this.playerDeck = playerDeck;
        this.level = level;
        this.playerStats = playerStats;

        // Dummy wallet, will be overridden in initialize.
        this.wallet = new Wallet([]);
        this.isActive = false;

        this.playerHand = Array(this.MAX_CARDS).fill(new EmptyCard())

    }

    startAdventure() {
        if (this.isActive) {
            console.warn("Tried to activate adventure that was already active");
        }
        this.isActive = true;

        for (let i = 0; i < this.playerStats.startingCards; i++) {
            this.draw(true);
        }
    }

    initialize(features: Features) {
        this.wallet = features.wallet;

        const draw = new KeyBind("d",
            "Draw a card", () => {
                if (this.isActive) {
                    this.draw();
                }
            },
        );
        const wait = new KeyBind("w",
            "Wait a turn", () => {
                if (this.isActive) {
                    this.wait();
                }
            },
        );
        const forfeit = new KeyBind("q",
            "Forfeit the adventure", () => {
                if (this.isActive) {
                    this.forfeit();
                }
            },
        );

        for (let i = 1; i < 10; i++) {
            HotKeys.addKeyBind(new KeyBind(i.toString(), `Play card ${i}`, () => {
                if (this.isActive) {
                    this.play(i - 1);
                }
            }));
            HotKeys.addKeyBind(new KeyBind(`ctrl+${i}`, `Tap card ${i}`, () => {
                if (this.isActive) {
                    this.tap(i - 1);
                }
            }));
            HotKeys.addKeyBind(new KeyBind(`shift+${i}`, `Discard card ${i}`, () => {
                if (this.isActive) {
                    this.discard(i - 1);
                }
            }));
        }
        HotKeys.addKeyBind(draw);
        HotKeys.addKeyBind(wait);
        HotKeys.addKeyBind(forfeit);

    }

    play(index: number) {
        const card = this.playerHand[index];
        if (!card || !card.canPlay(this)) {
            console.warn(`Cannot play card at index ${index}`);
            return;
        }

        if (!this.wallet.payMultipleIfPossible(card.costs)) {
            return;
        }


        this.playerHand.splice(index, 1, new EmptyCard());

        this._play(card);

        this.turnHasPassed();
    }


    discard(index: number) {
        const card = this.playerHand[index];
        if (!card) {
            return;
        }
        this.playerHand.splice(index, 1);
    }


    private _play(card: PlayableCard) {
        if (card.goesToField) {
            this.field.push(card);
            card.onDefeated.subscribe(() => {
                card.defeated(this);
                this.queueDeletion(card);
            })
        }

        card.play(this);
    }

    tap(index: number) {
        const card = this.field[index];
        if (!card) {
            console.warn(`Cannot tap card at index ${index}`);
            return;
        }

        card.tap(this);

        this.turnHasPassed();
    }

    /**
     * Draw a card
     * @param free if the card was free, a turn won't pass afterwards.
     */
    draw(free: boolean = false) {
        if (!this.canDraw()) {
            console.warn('Cannot draw');
            return;
        }
        const card = this.playerDeck.draw()
        if (card != undefined) {
            for (let i = 0; i < this.playerHand.length; i++) {
                if (this.playerHand[i].id === -1) {
                    this.playerHand.splice(i, 1, card);
                    break;
                }
            }
        }

        if (!free) {
            this.turnHasPassed();
        }
    }

    wait() {
        this.turnHasPassed();
    }

    forfeit() {
        this.playerStats.health = 0;
        this.turnHasPassed();
    }

    private turnHasPassed() {
        for (const card of this.field) {
            card.turnHasPassed(this);
        }

        // Remove cards queued for deletion
        for (const card of this.deletionQueue) {
            const index = this.field.indexOf(card, 0);
            if (index > -1) {
                this.field.splice(index, 1);
            }
        }

        this.currentTurn++;
        this.checkForLevelCard();
        this.checkWinLoseConditions();
    }

    private checkWinLoseConditions() {
        if (this.isWon()) {
            this.isActive = false;

            this._onWin.dispatch(this.level);
        }

        if (this.isLost()) {
            this.isActive = false;

            this._onLose.dispatch(this.level);
        }
    }


    private isWon(): boolean {
        if (this.level.getCardsLeftCount() > 0) {
            return false;
        }
        for (const card of this.field) {
            if (card.cardType === CardType.Monster) {
                return false;
            }
        }
        return true;
    }

    private isLost(): boolean {
        return this.playerStats.health <= 0;
    }

    private checkForLevelCard() {
        const card = this.level.getCardAtTurn(this.currentTurn);
        if (!card) {
            return;
        }
        this._play(card);
        this.checkWinLoseConditions();
    }

    public canDraw() {
        return !this.playerDeck.isEmpty() && this.playerHand.length <= this.MAX_CARDS;
    }

    load(): void {
        // Empty
    }

    save(): SaveData {
        return [];
    }

    private queueDeletion(card: PlayableCard) {
        this.deletionQueue.push(card);
    }
}