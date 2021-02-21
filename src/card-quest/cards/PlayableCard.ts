import {CardId} from "@/card-quest/cards/CardId";

export class PlayableCard {
    id: CardId;
    description: string;
    image: string;


    constructor(id: CardId, description: string, image: string) {
        this.id = id;
        this.description = description;
        this.image = image;
    }
}