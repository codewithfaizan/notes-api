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
        const noteData = new notesModel(req.body);
        noteData.createdBy = req.payload.user_id;
        noteData.save();

        await userModel.updateOne({ _id: req.payload.user_id }, { $push: { notes: noteData._id } })
        const userData = await userModel.find({ _id: req.payload.user_id })
        res.status(201).json({ success: true, message: "Note Created Successfully", userData, noteData })
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
    const user = req.payload;
    console.log(user);
    try {
        let notesData = await notesModel.find({ createdBy: req.payload.user_id })
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

        const userData = await userModel.findOne({ _id: req.payload.user_id })
        const noteData = await notesModel.findById(id)
        if (!noteData) {
            return res.status(404).json({ success: false, error: "Note Not Found" })
        };
        if (!noteData.createdBy.equals(req.payload.user_id)) {
            return res.status(403).json({ success: false, error: 'You are not the owner of this note' });
        }
        res.status(200).json({ success: true, message: "Note Data", noteData, userData });
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
        if (!noteData.createdBy.equals(req.payload.user_id)) {
            return res.status(403).json({ success: false, error: 'You are not the owner of this note' });
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

        if (!noteData.createdBy.equals(req.payload.user_id)) {
            return res.status(403).json({ success: false, error: 'You are not the owner of this note' });
        }
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
        const noteData = await notesModel.find({ createdBy: req.payload.user_id });
        const result = noteData.filter(data => data.title.includes(query) || data.description.includes(query))
        if (!result) return res.json({ message: "Invalid Query Search" })

        res.json(result);

    } catch (error) {
        console.error(error.message)
        res.status(500).json({ success: false, error: "this Internal Server Error" })
    }
});

/*
METHOD : DELETE
PUBLIC
API Endpoint : /api/search?q=:query
desc : delete notes of any user(by admin for Test) based on keywords for the authenticated user
*/
// router.delete('/search', async (req, res) => {
//     try {
//         const { q: query } = req.query;
//         if (!query) {
//             return res.status(400).json({ error: 'Query parameter "q" is required.' });
//         }
//         const results = await notesModel.findOneAndDelete({ $text: { $search: query } });
//         res.json(results);

//     } catch (error) {
//         console.error(error.message)
//         res.status(500).json({ success: false, error: "this Internal Server Error" })
//     }
// });



/*
METHOD : POST
PRIVATE
API Endpoint : /api/notes/:id/share
desc : share a note with another user for the authenticated user
*/
router.post(`/notes/:id/share`, async (req, res) => {
    const { id } = req.params; // Note ID
    const { userId } = req.body; // ID of the user to share the note with

    try {
        const note = await notesModel.findById(id);
        if (!note) {
            return res.status(404).json({ success: false, error: "Note not found" });
        }
        const shareUser = await userModel.findById(userId);
        if (!shareUser) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        if (!note.createdBy || !req.payload.user_id || !note.createdBy.equals(req.payload.user_id)) {
            return res.status(403).json({ success: false, error: "You are not the owner of this note" });
        }
        await shareUser.sharednotes.push(note);
        await shareUser.save();
        res.status(200).json({ success: true, message: "Note shared successfully" });

    } catch (error) {
        console.error(error.message)
        res.status(500).json({ success: false, error: "Internal Server Error" })
    }
})


export default router;