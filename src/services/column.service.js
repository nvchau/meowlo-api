import { ColumnModel } from '*/models/column.model'

const createNew = async ({ data }) => {
  try {
    const createdColumn = await ColumnModel.createNew({ data })
    const getNewColumn = await ColumnModel.findOneById({ id: createdColumn.insertedId })

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