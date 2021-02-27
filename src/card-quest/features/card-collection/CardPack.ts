import {WeightedDistribution} from "@/ig-template/tools/probability/WeightedDistribution";
import {Outcome} from "@/ig-template/tools/probability/Outcome";
import {CardId} from "@/card-quest/cards/CardId";
import {CardPackId} from "@/card-quest/features/card-collection/CardPackId";
import {Currency} from "@/ig-template/features/wallet/Currency";

export class CardPack extends WeightedDistribution<CardId> {
    id: CardPackId;
    cost: Currency;
    buyable: boolean;

    constructor(id: CardPackId, cost: Currency, buyable: boolean = false, outcomes: Outcome<CardId>[] = []) {
        super(outcomes);
        this.id = id;
        this.cost = cost
        this.buyable = buyable
    }
}