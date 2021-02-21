import {Deck} from "@/card-quest/cards/Deck";
import {Level} from "@/card-quest/adventure/Level";
import {PlayableCard} from "@/card-quest/cards/PlayableCard";

export class Adventure {

    public readonly MAX_CARDS = 7;

    playerDeck: Deck;

    level: Level;

    playerHand: PlayableCard[];


    constructor(playerDeck: Deck, level: Level, playerHand: PlayableCard[]) {
        this.playerDeck = playerDeck;
        this.level = level;
        this.playerHand = playerHand;
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
        return !this.playerDeck.isEmpty() && this.playerHand.length == this.MAX_CARDS;
    }

}