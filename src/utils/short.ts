import {http} from "./http";
import qs from 'qs';

const createShortUrl = "https://goo.gs/api/v1/links"

export const Short = {
    create: async (url: string) => {
        const data = {'url': url};
        const result = await http.post(createShortUrl,
            qs.stringify(data), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Bearer gSod7JPeVjN0G4lOxGVqvmsNt7RxvcdhM9eVA7mpzSIqD9mgtRg4jQn2rNwM"
                }
            }
        )
        console.log("create", result)
    }
}
