import { Story } from "../store/story-store";
import { getDataById } from "../api/getDataById";

export const getCommentsQuantityById = async (story: Story) => {

    if (!story.kids) {
        return 0;
    }

    let quantityArray: number[] = await Promise.all(story.kids?.map(
        async (kidId) => {
            let data = await getDataById(kidId);
            return await getCommentsQuantityById(data);
        }
    )
    );

    let overallQuantity: number = story.kids.length + quantityArray.reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0)
    return overallQuantity;
}