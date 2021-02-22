import {WeightedDistribution} from "@/ig-template/tools/probability/WeightedDistribution";
import {Outcome} from "@/ig-template/tools/probability/Outcome";
import {CardId} from "@/card-quest/cards/CardId";
import {CardPackId} from "@/card-quest/features/card-collection/CardPackId";

export class CardPack extends WeightedDistribution<CardId> {
    id: CardPackId;

    constructor(id: CardPackId, outcomes: Outcome<CardId>[] = []) {
        super(outcomes);
        this.id = id;
    }
}