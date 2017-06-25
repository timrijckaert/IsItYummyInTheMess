export class DateHelper {
    today() {
        const today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        const yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        return `${dd}/${mm}/${yyyy}`;
    }

    isMidday = () => {
        const now = new Date();
        const isAfterEndOfMorning = now >= new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 45, 0, 0);
        const isBeforeEndOfMidday = now <= new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 45, 0, 0);
        return isAfterEndOfMorning && isBeforeEndOfMidday;
    };
}