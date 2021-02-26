export class DeckPreset {
    displayName: string;
    deckString: string;


    constructor(displayName: string, deckString: string) {
        this.displayName = displayName;
        this.deckString = deckString;
    }

    get cardCount(): number {
        const count = this.deckString.match(/\./g)?.length;
        if (!count) {
            return 0;
        }
        return (count + 1);
    }
}