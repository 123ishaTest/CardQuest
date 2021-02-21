import {CardId} from "@/card-quest/cards/CardId";
import {ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";
import {Adventure} from "@/card-quest/Adventure";
import {Currency} from "@/ig-template/features/wallet/Currency";
import {Wallet} from "@/ig-template/features/wallet/Wallet";

export abstract class PlayableCard {
    private _onDefeated = new SimpleEventDispatcher<PlayableCard>();

    id: CardId;
    description: string;
    image: string;
    costs: Currency[];

    protected constructor(id: CardId, description: string, image: string, costs: Currency[] = []) {
        this.id = id;
        this.description = description;
        this.image = image;
        this.costs = costs;
    }

    abstract canPlay(adventure: Adventure): boolean;

    public canAfford(wallet: Wallet): boolean {
        return wallet.hasCurrencies(this.costs);
    }

    abstract play(adventure: Adventure): void;

    abstract tap(adventure: Adventure): void;

    abstract defeated(adventure: Adventure): void;

    protected dispatchDefeat() {
        this._onDefeated.dispatch(this);
    }

    /**
     * Whatever that means is up to the card
     * @private
     */
    public get onDefeated(): ISimpleEvent<PlayableCard> {
        return this._onDefeated.asEvent();
    }
}