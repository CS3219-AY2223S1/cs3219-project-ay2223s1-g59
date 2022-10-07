import History from "../models/history.js"

export const createHistory = async (req, res) => {
    try {
        const history = await History.create(req.body)
        return res.status(200).json({ message: `interview history save for ${history.username} ` })
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