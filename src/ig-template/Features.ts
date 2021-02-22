import {Wallet} from "@/ig-template/features/wallet/Wallet";
import {Settings} from "@/ig-template/features/settings/Settings";
import {Statistics} from "@/ig-template/features/statistics/Statistics";
import {Adventure} from "@/card-quest/adventure/Adventure";
import {CardCollection} from "@/card-quest/features/card-collection/CardCollection";

export interface Features {
    wallet: Wallet;
    settings: Settings;
    statistics: Statistics;
    adventure: Adventure;
    collection: CardCollection;
}
