import {Deck} from "@/card-quest/cards/Deck";
import {Level} from "@/card-quest/adventure/Level";
import {PlayableCard} from "@/card-quest/cards/PlayableCard";
import {Feature} from "@/ig-template/features/Feature";
import {SaveData} from "@/ig-template/tools/saving/SaveData";

export class Adventure extends Feature {

    public readonly MAX_CARDS = 7;

    playerDeck: Deck;

    level: Level;

    playerHand: PlayableCard[];


    constructor(playerDeck: Deck, level: Level) {
        super('adventure');
        this.playerDeck = playerDeck;
        this.level = level;
        this.playerHand = [];
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