import {PlayableCard} from "@/card-quest/cards/abstract/PlayableCard";
import {CardId} from "@/card-quest/cards/CardId";
import {CardType} from "@/card-quest/cards/CardType";

/**
 * Abstract class for action cards.
 * They have an immediate effect and do not go to the resource.
 */
export abstract class ActionCard extends PlayableCard {
    protected constructor(id: CardId, title: string, description: string, cardType: CardType, image: string) {
        super(id, title, description, cardType, image);
        this.goesToField = false;
    }

    canPlay(): boolean {
        return true;
    }

    defeated(): void {
        // Empty
    }

    tap(): void {
        // Empty
    }

    turnHasPassed(): void {
        // Empty
    }

}