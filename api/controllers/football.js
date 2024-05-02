const Football = require("../model/football");
const Admin = require("../model/admin");
const { NotAuthorizedError, BadRequestError, NotFoundError } = require("../errors");
const path = require("path");
const { deleteFile } = require("../middleware/deleteFile");
const fs = require("fs");


const createFootball = async (req, res) => {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
        throw new NotAuthorizedError(`No admin was found with id: ${req.admin.id}`)
    }
    const allowedCategories = ['news', 'EPL', 'Laliga', 'Serie A', 'Bundesliga', 'NPFL', 'Others'];
    const { title, news, category, date } = req.body;


    if (!title || !news || !category || !allowedCategories.includes(category)) {
        if (req.files.length > 0) {
            for (const image of req.files) {
                const filepath = path.join(__dirname, "..", "upload", image.filename);
                if (fs.existsSync(filepath)) {
                    deleteFile(filepath)
                }
            }
        }
        throw new BadRequestError("All fields are required, make sure you entering the correct value for category")
    }

    if (req.files.length === 0) {
        throw new BadRequestError("a file is required")
    }

    const fileToSave = req.files.map((image) => {
        const { filename, originalname } = image;
        return { filename, originalname }
    })


    const existingNews = await Football.findOne({ title, category });
    if (existingNews) {
        for (const image of fileToSave) {
            const filepath = path.join(__dirname, "..", "upload", image.filename);
            if (fs.existsSync(filepath)) {
                deleteFile(filepath)
            }
        }
        throw new BadRequestError("the news already exists...")
    }
    if (admin) {
        const createdFootball = new Football({
            title,
            news,
            file: fileToSave,
            category,
            date: date ? new Date(date) : Date.now(),
            createdBy: req.admin.id
        })

        if (createdFootball) {
            await createdFootball.save();
        }
        res.status(201).json({ msg: `created successfully....` })
    }
}

const getAllFootball = async (req, res) => {
    const getFootball = await Football.find({}).select("-__v").sort({ createdAt: -1 });
    if (getFootball) {
        const dataToSend = getFootball.map((data) => ({
            id: data._id,
            title: data.title,
            news: data.news,
            file: data.file,
            category: data.category,
            date: data.date.toDateString()
        }))
        res.status(200).json(dataToSend);
    }
}


const getSingleFootball = async (req, res) => {
    const { footballID } = req.params;
    const getSingle = await Football.findById(footballID).select("-__v");
    if (getSingle) {
        const dataToSend = {
            id: getSingle._id,
            title: getSingle.title,
            news: getSingle.news,
            file: getSingle.file,
            category: getSingle.category,
            date: getSingle.date.toDateString()
        }
        res.status(200).json(dataToSend)
    }
}

const adminDeleteFootball = async (req, res) =>{
    const { footballID } = req.params;
    const football = await Football.findById(footballID)
    const admin = await Admin.findById(req.admin.id);
    if (!admin){
        throw new NotFoundError("No admin was found with the supplied id...")
    }

    if(!football){
        throw new NotFoundError("No football was found with the supplied id...")
    }
    if(admin){
        const deleteFootball = await Football.findByIdAndDelete(footballID);
        if (deleteFootball){
            for (const image of football.file) {
                const filepath = path.join(__dirname, "..", "upload", image.filename);
                if (fs.existsSync(filepath)) {
                    deleteFile(filepath)
                }
            }
        }
        res.status(200).json({msg:`deleted football with id: ${football._id}`});
    }

}

const adminUpdateFootball = async (req, res) =>{
    res.send("update football...")
}


module.exports = {
    createFootball,
    getAllFootball,
    getSingleFootball,
    adminDeleteFootball,
    adminUpdateFootball
}