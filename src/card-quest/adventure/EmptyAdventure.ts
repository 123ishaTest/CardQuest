import {Adventure} from "@/card-quest/adventure/Adventure";
import {Deck} from "@/card-quest/cards/Deck";
import {Level} from "@/card-quest/adventure/Level";
import {PlayerStats} from "@/card-quest/adventure/PlayerStats";
import {LevelId} from "@/card-quest/adventure/LevelId";
import {CardPackId} from "@/card-quest/features/card-collection/CardPackId";
import {ImpossibleRequirement} from "@/ig-template/tools/requirements/ImpossibleRequirement";

export class EmptyAdventure extends Adventure {

    constructor() {
        super(new Deck(), new Level(-1 as LevelId, '', '', '' as CardPackId, 0, [], new ImpossibleRequirement()), new PlayerStats(5, 10));
    }
}