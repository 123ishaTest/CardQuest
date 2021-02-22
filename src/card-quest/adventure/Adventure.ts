import {Deck} from "@/card-quest/cards/Deck";
import {Level} from "@/card-quest/adventure/Level";
import {PlayableCard} from "@/card-quest/cards/abstract/PlayableCard";
import {Feature} from "@/ig-template/features/Feature";
import {SaveData} from "@/ig-template/tools/saving/SaveData";
import {Wallet} from "@/ig-template/features/wallet/Wallet";
import {Features} from "@/ig-template/Features";
import {PlayerStats} from "@/card-quest/adventure/PlayerStats";

export class Adventure extends Feature {

    public readonly MAX_CARDS = 7;

    playerDeck: Deck;

    level: Level;

    playerHand: PlayableCard[] = [];
    field: PlayableCard[] = [];

    wallet: Wallet;
    playerStats: PlayerStats

    deletionQueue: PlayableCard[] = [];

    currentTurn: number = 0;

    constructor(playerDeck: Deck, level: Level, playerStats: PlayerStats) {
        super('adventure');
        this.playerDeck = playerDeck;
        this.level = level;
        this.playerStats = playerStats;

        // Dummy wallet, will be overridden in initialize.
        this.wallet = new Wallet([]);
    }


    initialize(features: Features) {
        this.wallet = features.wallet;
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

        this.playerHand.splice(index, 1);

        this._play(card);

        this.turnHasPassed();
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

    draw() {
        if (!this.canDraw()) {
            console.warn('Cannot draw');
            return;
        }
        const card = this.playerDeck.draw()
        if (card != undefined) {
            this.playerHand.push(card);
        }

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
    }

    private checkForLevelCard() {
        const card = this.level.getCardAtTurn(this.currentTurn);
        if (!card) {
            return;
        }
        this._play(card);
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