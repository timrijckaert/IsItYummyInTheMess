import cheerio from 'cheerio-without-node-native';
import {IsItYummyInTheMessScrapingException, FoodOption} from '../../model/index';
import {IFoodService} from "../IFoodService";

class NetworkService extends IFoodService {

    //Easiest to scrape. However a fallback would be nice.
    URL_TO_SCRAPE = "http://ishetlekkerindemess.be/?theme=dos85";

    _getTitlesFromQuery(foodOptionsQuery) {
        let _getElementByTagName = (tagName, optionsArr) => {
            const optionsArrFromTag = optionsArr.filter((element) => element.name === tagName);
            if (optionsArrFromTag.length === 1) {
                return optionsArrFromTag[0];
            } else {
                throw new IsItYummyInTheMessScrapingException(`No such element found with tagName: ${tagName} in arr: ${optionsArr}`);
            }
        };
        return foodOptionsQuery
            .map((foodOptionChild) => _getElementByTagName("h3", foodOptionChild))
            .filter((h3Element) => h3Element.children.length === 1)
            .map((h3Element) => h3Element.children)
            .map((arr) => arr[0].data);
    };

    _getFoodChoicesFromQuery(foodOptionsQuery) {
        let _getTextData = (foodOptionsQuery) => {
            return foodOptionsQuery
                .filter((element) => element.type === "text")
                .map((element) => element.data)
                .join('')
                .trim()
        };
        return foodOptionsQuery.map((foodOptionChild) => _getTextData(foodOptionChild))
    };

    _getFoodOptionsQueryFromRawHTML(htmlText) {
        let mapQueryToArrayOfElements = (index, value, arr) => arr.push(value);
        let mapElementsArrayToChildElements = (arr) => {
            return arr
                .map((foodOption) => foodOption)
                .filter((foodOption) => foodOption.children.length === 5)
                .map((foodOptions) => foodOptions.children);
        };

        const optionElements = [];
        const $ = cheerio.load(htmlText);
        $('.item').map((index, value) => mapQueryToArrayOfElements(index, value, optionElements));

        const childElements = mapElementsArrayToChildElements(optionElements);
        if (childElements.length > 0) {
            return childElements;
        } else {
            throw new IsItYummyInTheMessScrapingException("No food options were found!");
        }
    };

    _mergeFoodOptionTitlesWithFoodChoices(titles, choices) {
        const foodOptions = [];
        if (titles.length === choices.length) {
            for (let i = 0; i < titles.length; i++) {
                const choice = choices[i].trim();
                if (choice.length > 0) {
                    foodOptions.push(new FoodOption(titles[i], choice));
                }
            }
            return foodOptions;
        } else {
            throw new IsItYummyInTheMessScrapingException(`Can't merge the titles (${titles.length}) and choices (${choices.length}) array, when the arrays have different lengths.`);
        }
    };

    getFoodOptionsOfToday() {
        return new Promise((resolve, _) => {
            fetch(this.URL_TO_SCRAPE)
                .then(data => {
                    resolve(
                        data.text().then((htmlText) => {
                            const foodOptionsQuery = this._getFoodOptionsQueryFromRawHTML(htmlText);

                            const titles = this._getTitlesFromQuery(foodOptionsQuery);
                            const choices = this._getFoodChoicesFromQuery(foodOptionsQuery);
                            return this._mergeFoodOptionTitlesWithFoodChoices(titles, choices);
                        })
                    );
                });
        });
    }
}

export {NetworkService};