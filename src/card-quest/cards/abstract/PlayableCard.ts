import {CardId} from "@/card-quest/cards/CardId";
import {ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";
import {Adventure} from "@/card-quest/adventure/Adventure";
import {Currency} from "@/ig-template/features/wallet/Currency";
import {Wallet} from "@/ig-template/features/wallet/Wallet";
import {CardType} from "@/card-quest/cards/CardType";

export abstract class PlayableCard {
    private _onDefeated = new SimpleEventDispatcher<PlayableCard>();

    id: CardId;
    title: string;
    description: string;
    image: string;
    costs: Currency[];
    goesToField: boolean;
    cardType: CardType;

    protected constructor(id: CardId, title: string, description: string, cardType: CardType, image: string, costs: Currency[] = [], goesToField: boolean = false) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.cardType = cardType;
        this.image = image;
        this.costs = costs;
        this.goesToField = goesToField
    }


    setCosts(costs: Currency[]): this {
        this.costs = costs;
        return this;
    }

    abstract canPlay(adventure: Adventure): boolean;

    public canAfford(wallet: Wallet): boolean {
        return wallet.hasCurrencies(this.costs);
    }

    abstract turnHasPassed(adventure: Adventure): void;

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