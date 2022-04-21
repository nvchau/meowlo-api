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

const update = async ({ id, data }) => {
  try {
    const updateData = {
      ...data,
      updatedAt: Date.now()
    }
    const updatedCard = await CardModel.update({ id, data: updateData })

    return updatedCard
  } catch (error) {
    throw new Error(error)
  }
}

export const CardService = {
  createNew,
  update
}