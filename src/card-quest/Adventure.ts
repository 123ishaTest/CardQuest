import {Deck} from "@/card-quest/cards/Deck";
import {Level} from "@/card-quest/adventure/Level";
import {PlayableCard} from "@/card-quest/cards/PlayableCard";
import {Feature} from "@/ig-template/features/Feature";
import {SaveData} from "@/ig-template/tools/saving/SaveData";
import {Wallet} from "@/ig-template/features/wallet/Wallet";
import {Features} from "@/ig-template/Features";

export class Adventure extends Feature {

    public readonly MAX_CARDS = 7;

    playerDeck: Deck;

    level: Level;

    playerHand: PlayableCard[];
    field: PlayableCard[];

    wallet: Wallet;

    constructor(playerDeck: Deck, level: Level) {
        super('adventure');
        this.playerDeck = playerDeck;
        this.level = level;
        this.playerHand = [];
        this.field = [];

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

        if (!card.canAfford(this.wallet)) {
            return;
        }

        this.playerHand.splice(index, 1);
        this.field.push(card);

        card.onDefeated.subscribe(() => {
            card.defeated(this);
            this.removeFromField(card);
        })
        card.play(this);
    }

    private removeFromField(card: PlayableCard) {
        const index = this.field.indexOf(card, 0);
        if (index > -1) {
            this.field.splice(index, 1);
        }
    }

    tap(index: number) {
        const card = this.field[index];
        if (!card) {
            console.warn(`Cannot tap card at index ${index}`);
            return;
        }

        card.tap(this);
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

}