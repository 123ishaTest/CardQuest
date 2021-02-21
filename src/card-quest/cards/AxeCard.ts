import {PlayableCard} from "@/card-quest/cards/PlayableCard";
import {Adventure} from "@/card-quest/adventure/Adventure";
import {Axe} from "@/card-quest/adventure/tools/Axe";
import {CardId} from "@/card-quest/cards/CardId";

export class AxeCard extends PlayableCard {
    axe: Axe;


    constructor(id: CardId, description: string, image: string, axe: Axe) {
        super(id, description, image);
        this.goesToField = false;
        this.axe = axe;
    }

    canPlay(): boolean {
        return true;
    }

    defeated(): void {
        // Empty
    }

    play(adventure: Adventure): void {
        adventure.playerStats.activeAxe = Math.max(adventure.playerStats.activeAxe, this.axe);
    }

    tap(): void {
        // Empty
    }

    turnHasPassed(): void {
        // Empty
    }

}