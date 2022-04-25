import { CardService } from '*/services/card.service'
import { HttpStatusCode } from '*/utilities/constants'

const createNew = async (req, res) => {
  try {
    const result = await CardService.createNew({ data: req.body })

    res.status(HttpStatusCode.CREATED).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

export const CardController = {
  createNew
}