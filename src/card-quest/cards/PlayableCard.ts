import {CardId} from "@/card-quest/cards/CardId";

export abstract class PlayableCard {
    id: CardId;
    description: string;
    image: string;


    protected constructor(id: CardId, description: string, image: string) {
        this.id = id;
        this.description = description;
        this.image = image;
    }

    abstract play(): void;

    abstract tap(): void;

    abstract defeated(): void;
}