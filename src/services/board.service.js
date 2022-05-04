import { BoardModel } from '*/models/board.model'
import { cloneDeep } from 'lodash'

const createNew = async ({ data }) => {
  try {
    const createdBoard = await BoardModel.createNew({ data })
    const getNewBoard = await BoardModel.findOneById({ id: createdBoard.insertedId })

    return getNewBoard
  } catch (error) {
    throw new Error(error)
  }
}

const getFullBoard = async ({ id }) => {
  try {
    const board = await BoardModel.getFullBoard({ id })
    if (!board || !board.columns) throw new Error('Board not found')

    const tranformBoard = cloneDeep(board)
    // Filter deleted columns
    tranformBoard.columns = tranformBoard.columns.filter(column => !column._destroy)

    // Add card to each column
    tranformBoard.columns.forEach(column => {
      column.cards = tranformBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })
    // Sort column by columnOrder, sort card by cardOrder: This step will implement by FE
    // Remove cards data from tranformBoard
    delete tranformBoard.cards

    return tranformBoard
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
    if (updateData.columns) delete updateData.columns

    const updatedBoard = await BoardModel.update({ id, data: updateData })

    return updatedBoard
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardService = {
  createNew,
  getFullBoard,
  update
}