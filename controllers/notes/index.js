import express from "express";
import notesModel from "../../models/Notes.js"
import userModel from "../../models/User.js"

const router = express();

/*
METHOD : POST
PRIVATE
API Endpoint : /api/notes
desc : create a new note for the authenticated user
*/
router.post('/notes', async (req, res) => {
    try {
        const notesData = new notesModel(req.body);
        notesData.createdBy = req.payload.user_id;
        await notesData.save();
        res.status(201).json({ success: true, message: "Note Created Successfully", notesData })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ success: false, error: "Internal Server Error" })
    }
});

/*
METHOD : GET
PRIVATE
API Endpoint : /api/notes
desc : get a list of all notes for the authenticated user
*/
router.get("/notes", async (req, res) => {
    try {
        let notesData = await notesModel.find({})
        res.status(200).json({ success: true, message: "All Notes Fetched", notesData })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, error: "Internal Server Error" })
    }
});

/*
METHOD : GET
PRIVATE
API Endpoint : /api/notes/:id
desc : get a note by ID for the authenticated user
*/

router.get("/notes/:id", async (req, res) => {
    try {
        const { id } = req.params

        const noteId = await notesModel.findById(id);
        if (!noteId) {
            return res.status(404).json({ success: false, error: "Note Not Found" })
        };

        const data = noteId
        res.status(200).json({ success: true, message: "Note Data", data });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, error: "Internal Server Error" })
    }
});

/*
METHOD : PUT
PRIVATE
API Endpoint : /api/notes/:id
desc : update an existing note by ID for the authenticated user
*/
router.put("/notes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateNote = req.body;

        const noteData = await notesModel.findByIdAndUpdate(id, updateNote);

        if (!noteData) {
            return res.status(404).json({ error: "Note id not found" })
        }
        return res.status(200).json({ success: true, message: "Note updated Successfully" })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, error: "Internal Server Error" })
    }
});

/*
METHOD : DELETE
PRIVATE
API Endpoint : /api/notes/:id
desc : delete a note by ID for the authenticated user
*/
router.delete('/notes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const noteData = await notesModel.findByIdAndDelete(id);
        if (!noteData) { return res.status(404).json({ error: "Note id not found" }) }
        res.status(200).json({ success: true, message: "Note Deleted Successfully" })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ success: false, error: "Internal Server Error" })
    }
});

/*
METHOD : GET
PRIVATE
API Endpoint : /api/search?q=:query
desc : search for notes based on keywords for the authenticated user
*/
router.get('/search', async (req, res) => {
    try {
        const { q: query } = req.query;
        if (!query) {
            return res.status(400).json({ error: 'Query parameter "q" is required.' });
        }
        const results = await notesModel.find({ $text: { $search: query } });
        res.json(results);

    } catch (error) {
        console.error(error.message)
        res.status(500).json({ success: false, error: "this Internal Server Error" })
    }
});

/*
METHOD : POST
PRIVATE
API Endpoint : /api/notes/:id/share
desc : share a note with another user for the authenticated user
*/
router.post(`/notes/:id/share`, (req, res) => {
    try {
        const { id } = req.params;

    } catch (error) {
        console.error(error.message)
        res.status(500).json({ success: false, error: "this Internal Server Error" })
    }
})


export default router;