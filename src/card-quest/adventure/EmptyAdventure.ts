import {Adventure} from "@/card-quest/adventure/Adventure";
import {Deck} from "@/card-quest/cards/Deck";
import {Level} from "@/card-quest/adventure/Level";
import {PlayerStats} from "@/card-quest/adventure/PlayerStats";

export class EmptyAdventure extends Adventure {

    constructor() {
        super(new Deck(), new Level([]), new PlayerStats(10));
    }
}