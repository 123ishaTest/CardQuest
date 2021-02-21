import {Deck} from "@/card-quest/cards/Deck";
import {Level} from "@/card-quest/adventure/Level";
import {PlayableCard} from "@/card-quest/cards/PlayableCard";
import {Feature} from "@/ig-template/features/Feature";
import {SaveData} from "@/ig-template/tools/saving/SaveData";
import {AdventureResources} from "@/card-quest/adventure/AdventureResources";

export class Adventure extends Feature {

    public readonly MAX_CARDS = 7;

    playerDeck: Deck;

    level: Level;

    playerHand: PlayableCard[];
    field: PlayableCard[];
    resources: AdventureResources;


    constructor(playerDeck: Deck, level: Level, resources = new AdventureResources()) {
        super('adventure');
        this.playerDeck = playerDeck;
        this.level = level;
        this.playerHand = [];
        this.field = [];
        this.resources = resources;
    }

    play(index: number) {
        const card = this.playerHand[index];
        if (!card) {
            console.warn(`Cannot play card at index ${index}`);
            return;
        }

        this.playerHand.splice(index, 1);
        this.field.push(card);
        card.play();
    }

    tap(index: number) {
        const card = this.field[index];
        if (!card) {
            console.warn(`Cannot tap card at index ${index}`);
            return;
        }

        card.tap();
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