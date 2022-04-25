import { BoardModel } from '*/models/board.model'

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

    // Add card to each column
    board.columns.forEach(column => {
      column.cards = board.cards.filter(card => card.columnId.toString() === column._id.toString())
    })
    // Sort column by columnOrder, sort card by cardOrder: This step will implement by FE
    // Remove cards data from board
    delete board.cards

    return board
  } catch (error) {
    throw new Error(error)
  }
}


export const BoardService = {
  createNew,
  getFullBoard
}