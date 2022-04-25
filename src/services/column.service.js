import { ColumnModel } from '*/models/column.model'
import { BoardModel } from '*/models/board.model'

const createNew = async ({ data }) => {
  try {
    const newColumn = await ColumnModel.createNew({ data })
    const getNewColumn = await ColumnModel.findOneById({ id: newColumn.insertedId })

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
    const updatedColumn = await ColumnModel.update({ id, data: updateData })

    return updatedColumn
  } catch (error) {
    throw new Error(error)
  }
}

export const ColumnService = {
  createNew,
  update
}