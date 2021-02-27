import {CardId} from "@/card-quest/cards/CardId";
import {SaveData} from "@/ig-template/tools/saving/SaveData";

export interface CardCollectionSaveData extends SaveData {
    cards: {
        'id': CardId;
        'amount': number;
    }[];
    currentDeck: string;
    presets: {
        'displayName': string;
        'deckString': string;
    }[];}