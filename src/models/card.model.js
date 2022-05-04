import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '*/config/mongodb'

// Define Card collection
const cardCollectionName = 'cards'
const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(), // also ObjectId when create new
  columnId: Joi.string().required(), // also ObjectId when create new
  title: Joi.string().min(2).max(100).required().trim(),
  cover: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async ({ data }) => {
  try {
    const validatedValue = await validateSchema(data)
    const insertValue = {
      ...validatedValue,
      boardId: ObjectId(validatedValue.boardId),
      columnId: ObjectId(validatedValue.columnId)
    }
    const result = await getDB().collection(cardCollectionName).insertOne(insertValue)

    return result
  } catch (error) {
    throw new Error(error)
  }
}

const update = async ({ id, data }) => {
  try {
    const updateData = { ...data }
    if (data.boardId) updateData.boardId = ObjectId(data.boardId)
    if (data.columnId) updateData.columnId = ObjectId(data.columnId)

    const result = await getDB().collection(cardCollectionName).findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: updateData },
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
    const result = await getDB().collection(cardCollectionName).findOne({ _id: ObjectId(id) })

    return result
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * @param {Array of string card id} ids
 */
const deleteMany = async ({ ids }) => {
  try {
    const tranformIds = ids.map(i => ObjectId(i))
    const result = await getDB().collection(cardCollectionName).updateMany(
      { _id: { $in: tranformIds } },
      { $set: { _destroy: true } }
    )

    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const CardModel = {
  cardCollectionName,
  createNew,
  findOneById,
  deleteMany,
  update
}
