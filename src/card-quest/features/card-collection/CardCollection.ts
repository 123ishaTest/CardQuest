import {Feature} from "@/ig-template/features/Feature";
import {CardCollectionSaveData} from "@/card-quest/features/card-collection/CardCollectionSaveData";

export class CardCollection extends Feature {
    load(data: CardCollectionSaveData): void {
        // Empty
    }

    save(): CardCollectionSaveData {
        return new CardCollectionSaveData();
    }

}