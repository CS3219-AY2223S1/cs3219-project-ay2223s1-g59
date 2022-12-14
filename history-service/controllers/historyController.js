import History from "../models/history.js"

export const createHistory = async (req, res) => {
    try {
        const response = await History.findOne(req.body)
        if (response) {
            return res.status(200).json({ message: `history already created previously for ${history.username}` })
        } else {
            const history = await History.create(req.body)
            return res.status(200).json({ message: `interview history saved for ${history.username}` })
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}

export const getHistory = async (req, res) => {
    try {
        const username = req.params.username
        const histories = await History.find({ username: username })
        return res.status(200).json(histories)
    } catch (err) {
        return res.status(500).json(err)
    }
}

export const deleteHistory = async (req, res) => {
    try {
        const username = req.params.username
        const response = await History.deleteMany({ username: username })
        return res.status(200).json(response)
    } catch (err) {
        res.status(500).json(err)
    }
}