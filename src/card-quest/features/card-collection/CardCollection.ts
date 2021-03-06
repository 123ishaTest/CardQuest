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
import {Features} from "@/ig-template/Features";
import {Wallet} from "@/ig-template/features/wallet/Wallet";


export class CardCollection extends Feature {
    cards: number[] = [];

    cardPacks: CardPack[];

    currentDeck: IdDeck;
    deckPresets: DeckPreset[] = [];

    // The max amount you can have of a single card
    public readonly MAX_CARD_AMOUNT = 10;

    // The min amount of cards needed to start
    public readonly MIN_DECK_SIZE = 15;

    private _onCardsGain = new SimpleEventDispatcher<PlayableCard[]>();
    private _wallet: Wallet;

    constructor(cardPacks: CardPack[]) {
        super('card-collection');
        const ids = CardRepository.getAllCardsIds();

        for (let i = 0; i < ids.length; i++) {
            this.cards.push(0);
        }

        this.deckPresets.push(new DeckPreset('First Deck', ''));

        this.cardPacks = cardPacks;

        // Dummy wallet, will be overridden in initialize.
        this._wallet = new Wallet([]);

        this.currentDeck = new IdDeck();
    }

    initialize(features: Features) {
        this._wallet = features.wallet;
    }

    canBuyCardPack(id: CardPackId): boolean {
        const cardPack = this.getCardPack(id);
        if (cardPack === undefined) {
            return false;
        }
        if (!cardPack.buyable) {
            return false;
        }
        if (!this._wallet.hasCurrency(cardPack.cost)) {
            return false;
        }
        return true;
    }

    buyCardPack(id: CardPackId) {
        const cardPack = this.getCardPack(id);
        if (cardPack === undefined) {
            console.warn(`Cannot find card pack with id ${id}`);
            return;
        }
        if (!cardPack.buyable) {
            console.warn(`Card pack with id ${id} is not buyable`);
            return;
        }

        if (this._wallet.payIfPossible(cardPack.cost)) {
            this.openCardPack(id, 3);
        }
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

    public hasEnoughCards(): boolean {
        return this.currentDeck.getSize() >= this.MIN_DECK_SIZE;
    }

    public currentDeckIsValid() {
        for (let i = 0; i < this.cards.length; i++) {
            if (this.currentDeck.cards[i] > this.cards[i]) {
                return false;
            }
        }
        return true;
    }

    public selectAllCards() {
        for (let i = 0; i < this.cards.length; i++) {
            this.currentDeck.cards[i] = this.cards[i];
        }
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
        const newAmount = Math.min(this.cards[id] + amount, this.MAX_CARD_AMOUNT);
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
        this.deckPresets[index].deckString = this.currentDeck.toDeckString();
    }

    loadFromPreset(index: number): void {
        this.currentDeck = IdDeck.fromDeckString(this.deckPresets[index].deckString);
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
        const cards = data.cards ?? [];
        for (const card of cards) {
            this.cards[card.id] = card.amount;
        }

        this.deckPresets = [];
        if (!data.presets || data.presets.length == 0) {
            this.deckPresets.push(new DeckPreset('First Deck', ''));
        } else {
            for (const preset of data.presets) {
                this.deckPresets.push(new DeckPreset(preset.displayName, preset.deckString));
            }
        }

        this.currentDeck = CardRepository.getIdDeckFromString(data.currentDeck) ?? new IdDeck();
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

        const presets: {
            'displayName': string;
            'deckString': string;
        }[] = [];


        this.deckPresets.forEach(preset => {
            presets.push({
                'displayName': preset.displayName,
                'deckString': preset.deckString,
            })
        })

        return {
            'cards': cards,
            'currentDeck': this.currentDeck.toDeckString(),
            'presets': presets,
        }
    }

}