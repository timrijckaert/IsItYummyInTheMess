const INVALID_DATE = "INVALID_DATE";
export class FoodOption {
    constructor(title, option, date = INVALID_DATE) {
        this.title = title;
        this.option = option;
        this.date = date
    }
}