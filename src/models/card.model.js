import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '*/config/mongodb'

// Define Card collection
const cardCollectionName = 'cards'
const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().min(2).max(100).required().trim(),
  cover: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, { abortEarly: false })
}
const createNew = async (data) => {
  try {
    const value = await validateSchema(data)
    const result = await getDB().collection(cardCollectionName).insertOne(value)

    return result
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

const update = async ({ id, data }) => {
  try {
    const result = await getDB().collection(cardCollectionName).findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: data },
      { returnDocument : 'after' },
      { returnOriginal: false }
    )

    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

export const CardModel = {
  createNew,
  findOneById,
  update
}
