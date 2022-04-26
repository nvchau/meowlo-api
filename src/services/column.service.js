import { ColumnModel } from '*/models/column.model'
import { BoardModel } from '*/models/board.model'
import { CardModel } from '*/models/card.model'

const createNew = async ({ data }) => {
  try {
    const newColumn = await ColumnModel.createNew({ data })
    const getNewColumn = await ColumnModel.findOneById({ id: newColumn.insertedId })
    getNewColumn.cards = []

    // Update columnOrder Array in board collection
    await BoardModel.pushColumnOrder({ boardId: getNewColumn.boardId.toString(), columnId: getNewColumn._id.toString() })

    return getNewColumn
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

    if (updateData._id) delete updateData._id
    if (updateData.cards) delete updateData.cards

    const updatedColumn = await ColumnModel.update({ id, data: updateData })

    if (updatedColumn._destroy) {
      // Delete many cards in this column
      CardModel.deleteMany({ ids: updatedColumn.cardOrder })
    }

    return updatedColumn
  } catch (error) {
    throw new Error(error)
  }
}

export const ColumnService = {
  createNew,
  update
}