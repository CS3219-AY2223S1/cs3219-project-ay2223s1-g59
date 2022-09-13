import mongoose from "mongoose";
import Match from '../models/match.js'
import Interview from '../models/interview.js'

/**
 * Searches for a match entry with the same difficulty
 */
export const findMatch = async (req, res) => {
    // TODO: check for correct fields

    try {
        const username = req.body.username
        const difficulty = req.body.difficulty
        // TODO: check for valid difficulty

        
        const otherMatch = await Match.findOne({ difficulty: difficulty })

        // if there's a match, and the other user is a different user (in case curr user opens 2 windows)
        // delete the found entry and match the two users together
        if (otherMatch && (otherMatch.username != username)) {
            const otherUsername = otherMatch.username
            await Match.findByIdAndDelete(otherMatch._id)

            const interview = await Interview.create({
                firstUsername: username,
                secondUsername: otherUsername,
                difficulty: difficulty,
                question: "THIS IS A DUMMY QUESTION"
            })
            console.log("Interview found for: " + username)
            res.json({
                message: 'INTERVIEW FOUND',
                interviewId: interview._id,
            })
            
        } else {
            // else if there's no match, create an entry (lasts for 30s by default)
            const newMatch = await Match.create({
                username: username,
                difficulty: difficulty
            })
            // start a timer 30s that checks if an interview with the username was created,
            // since we would not know if our match entry has been deleted
            // https://javascript.info/settimeout-setinterval

            const delay = 1 // delay in terms of seconds between each function call
            const limit = 30 // maximum number of seconds before timeout
            let timer = 1 // timer starts at this second

            const checkInterviewExistsInterval = setInterval(async () => {
                console.log(username + " waiting for match, timer at " + timer + " seconds")
                const interview = await Interview.findOne({
                    $or: [
                        { firstUsername: username },
                        { secondUsername: username }
                    ]
                })
                
                console.log(1)
                // if match request was cancelled, entry would be missing from DB as it was previously removed
                const match = await Match.findOne({username: username})
                console.log(match)
                console.log(2)
                if (!match) {
                    clearInterval(checkInterviewExistsInterval) // this stops the setInterval function
                    console.log(username + " has cancelled match request. No entry exists in match collection anymore.")
                    res.json({
                        message: 'Match request cancelled'
                    })
                }

                // if an interview is found
                if (interview) {
                    // there is a case by which the current user has an existing interview but searches for a match
                    // In that case we bring the current user back to the interview, and ensure entry created in match 
                    // is deleted in case another user matches to the current user.
                    await Match.findByIdAndDelete(newMatch._id)

                    clearInterval(checkInterviewExistsInterval) // this stops the setInterval function
                    console.log("Interview found for: " + username)
                    res.json({
                        message: 'INTERVIEW FOUND',
                        interviewId: interview._id,
                    })
                }

                // if no interview found and timer runs out
                if (timer > limit) {
                    console.log("No interview found for: " + username)
                    clearInterval(checkInterviewExistsInterval)
                    res.json({
                        message: 'NO INTERVIEW FOUND'
                    })
                }

                timer++ // increase timer by 1 second

            }, delay * 1000)
        }

    } catch (err) {
        console.log(err.message)
        res.send(err)
    }
}

/**
 * Removes the created match entry in the database, preventing others from matching with current user.
 * @param {*} req 
 * @param {*} res 
 */
export const cancelFindMatch = async (req, res) => {
    try {
        const match = await Match.findOneAndDelete({username: req.body.username})
        if (!match) {
            console.log("Error 500: Unable to delete match request in DB as no match entry found for user: " 
                + req.body.username)
        }
        res.status(200).json(match)
    } catch (err) {
        res.json({error: err.message})
        console.log(err.message)
    }
}

export const getInterview = async (req, res) => {
    try {
        const interview = Interview.findById(req.body.interviewId)
        res.status(200).json(interview)
    } catch (err) {
        res.status(500).json(err.message)
        console.log(err)
    }
}

export const deleteInterview = async (req, res) => {
    try {
        const interview = Interview.findByIdAndDelete(req.body.interviewId)
        if (!interview) return res.sendStatus(404)
        res.status(200).json(interview)
    } catch (err) {
        res.status(500).json(err.message)
        console.log(err)
    }
}