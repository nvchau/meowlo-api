import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '*/config/mongodb'
import { ColumnModel } from '*/models/column.model'
import { CardModel } from '*/models/card.model'

// Define Board collection
const boardCollectionName = 'boards'
const boardCollectionSchema = Joi.object({
  title: Joi.string().min(2).max(50).required().trim(),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false) // show (enable) or hide (disable) this document (record)
})

const validateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async ({ data }) => {
  try {
    const value = await validateSchema(data)
    const result = await getDB().collection(boardCollectionName).insertOne(value)

    return result
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * @param {string} boardId
 * @param {string} columnId
 */
const pushColumnOrder = async ({ boardId, columnId }) => {
  try {
    const result = await getDB().collection(boardCollectionName).findOneAndUpdate(
      { _id: ObjectId(boardId) },
      { $push: { columnOrder: columnId } },
      { returnDocument : 'after' },
      { returnOriginal: false }
    )

    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async ({ id }) => {
  try {
    const result = await getDB().collection(boardCollectionName).findOne({ _id: ObjectId(id) })

    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getFullBoard = async ({ id }) => {
  try {
    const result = await getDB().collection(boardCollectionName).aggregate([
      { $match: { _id: ObjectId(id) } },
      // {
      //   $addFields: {
      //     _id: { $toString: '$_id' } // overwrite the old _id field with the new _id field that has been converted to a string
      //   }
      // },
      { $lookup: {
        from: ColumnModel.columnCollectionName, // collection name - collection to join
        localField: '_id', // field from the input documents
        foreignField: 'boardId', // field from the documents of the "from" collection
        as: 'columns' // key will output - output array field
      } },
      { $lookup: {
        from: CardModel.cardCollectionName,
        localField: '_id',
        foreignField: 'boardId',
        as: 'cards'
      } }
    ]).toArray() // return array

    return result[0] || {}
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardModel = {
  boardCollectionName,
  createNew,
  pushColumnOrder,
  findOneById,
  getFullBoard
}
