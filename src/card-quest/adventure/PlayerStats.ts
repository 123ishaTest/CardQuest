export class PlayerStats {
    health: number;

    constructor(health: number) {
        this.health = health;
    }

    public attackFor(amount: number) {
        this.health -= amount - this.getDefense();
    }

    public getAttack() {
        // TODO take tools into account
        return 2;
    }

    public getDefense() {
        // TODO take tools into account
        return 1;
    }
}