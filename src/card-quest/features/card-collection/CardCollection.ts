import {Feature} from "@/ig-template/features/Feature";
import {CardCollectionSaveData} from "@/card-quest/features/card-collection/CardCollectionSaveData";
import {CardRepository} from "@/card-quest/cards/CardRepository";
import {CardId} from "@/card-quest/cards/CardId";
import {PlayableCard} from "@/card-quest/cards/abstract/PlayableCard";
import {CardPack} from "@/card-quest/features/card-collection/CardPack";
import {CardPackId} from "@/card-quest/features/card-collection/CardPackId";
import {IdDeck} from "@/card-quest/cards/IdDeck";
import {DeckPreset} from "@/card-quest/features/card-collection/DeckPreset";
import {ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";
import {CardType} from "@/card-quest/cards/CardType";


export class CardCollection extends Feature {
    cards: number[] = [];

    cardPacks: CardPack[];

    currentDeck: IdDeck;
    deckPresets: DeckPreset[] = [];

    readonly MAX_DECK_PRESETS = 10;

    private _onCardsGain = new SimpleEventDispatcher<PlayableCard[]>();


    constructor(cardPacks: CardPack[]) {
        super('card-collection');
        const ids = CardRepository.getAllCardsIds();

        for (let i = 0; i < ids.length; i++) {
            this.cards.push(0);
        }

        this.deckPresets.push(new DeckPreset('First Deck', ''));


        this.cardPacks = cardPacks;

        this.currentDeck = new IdDeck();
    }

    openCardPack(id: CardPackId, amount: number = 1) {
        const cardPack = this.getCardPack(id);
        if (cardPack === undefined) {
            console.warn(`Cannot find card pack with if ${id}`);
            return;
        }
        const cardIds = [];
        for (let i = 0; i < amount; i++) {
            cardIds.push(cardPack.draw());
        }
        this.gainCards(cardIds, true);
    }

    getCardPack(id: CardPackId) {
        return this.cardPacks.find(pack => {
            return pack.id === id;
        })
    }

    public gainCard(id: CardId, amount: number, notify: boolean = false) {
        const ids = Array(amount).fill(id);
        this.gainCards(ids, notify)
    }

    public gainCards(ids: CardId[], notify: boolean = false) {
        for (const id of ids) {
            this._gainCard(id)
        }
        const cards = ids.map(id => {
            return CardRepository.getCard(id);
        })

        if (notify) {
            this._onCardsGain.dispatch(cards);
        }
    }

    private _gainCard(id: CardId, amount: number = 1) {
        const current = this.cards[id];
        if (current === undefined) {
            console.warn(`Card with id ${id} does not exist`);
            return;
        }
        const newAmount = this.cards[id] + amount
        this.cards.splice(id, 1, newAmount)
    }

    getCardsWithAmount(): [PlayableCard, number][] {
        return this.cards.map((amount, id) => {
            return [CardRepository.getCard(id as CardId), amount];
        });
    }

    getCardsWithAmountByType(type: CardType): [PlayableCard, number][] {
        return this.cards.map((amount, id) => {
            const card = CardRepository.getCard(id as CardId);
            if (card.cardType === type) {
                return [card, amount];
            }
        }).filter(entry => {
            return entry != null;
        }) as [PlayableCard, number][];
    }

    emptyCurrentDeck(): void {
        this.currentDeck = new IdDeck();
    }

    saveToPreset(index: number): void {
        console.log(index);
        this.deckPresets[index].deckString = this.currentDeck.toDeckString();
    }

    loadFromPreset(index: number): void {
        this.currentDeck = IdDeck.fromDeckString(this.deckPresets[index].deckString);
    }

    initialize() {
        // Empty
    }

    get lowestEmptyPresetIndex() {
        for (let i = this.deckPresets.length - 1; i >= 0; i--) {
            if (this.deckPresets[i].deckString != "") {
                return i;
            }
        }
        return this.deckPresets.length;
    }

    get onCardsGain(): ISimpleEvent<PlayableCard[]> {
        return this._onCardsGain.asEvent();
    }

    load(data: CardCollectionSaveData): void {
        const cards = data.cards;
        for (const card of cards) {
            this.cards[card.id] = card.amount;
        }
    }

    save(): CardCollectionSaveData {
        const cards: {
            'id': CardId;
            'amount': number;
        }[] = [];

        this.cards.forEach((amount, id) => {
            cards.push({
                'id': id,
                'amount': amount
            });
        })
        return {
            'cards': cards,
        }
    }

}