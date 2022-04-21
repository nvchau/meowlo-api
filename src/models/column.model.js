import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '*/config/mongodb'

// Define Column collection
const columnCollectionName = 'columns'
const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string().min(2).max(50).required().trim(),
  cardOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
  return await columnCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async ({ data }) => {
  try {
    const value = await validateSchema(data)
    const result = await getDB().collection(columnCollectionName).insertOne(value)

    return result
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async ({ id }) => {
  try {
    const result = await getDB().collection(columnCollectionName).findOne({ _id: ObjectId(id) })

    return result
  } catch (error) {
    throw new Error(error)
  }
}

const update = async ({ id, data }) => {
  try {
    const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: data },
      { returnDocument : 'after' }, // return record after update
      { returnOriginal: false } // false: return record after update
    )

    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

export const ColumnModel = {
  createNew,
  findOneById,
  update
}
