import { CardModel } from '*/models/card.model'

const createNew = async ({ data }) => {
  try {
    const createdCard = await CardModel.createNew({ data })
    const getNewCard = await CardModel.findOneById({ id: createdCard.insertedId })

    return getNewCard
  } catch (error) {
    throw new Error(error)
  }
}
export const CardService = {
  createNew
}