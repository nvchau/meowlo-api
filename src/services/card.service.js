import { CardModel } from '*/models/card.model'
import { ColumnModel } from '*/models/column.model'

const createNew = async ({ data }) => {
  try {
    const newCard = await CardModel.createNew({ data })
    const getNewCard = await CardModel.findOneById({ id: newCard.insertedId })

    // Update cardOrder Array in column collection
    await ColumnModel.pushCardOrder({ columnId: getNewCard.columnId.toString(), cardId: getNewCard._id.toString() })

    return getNewCard
  } catch (error) {
    throw new Error(error)
  }
}
export const CardService = {
  createNew
}