import User from '../model/userModel.js'
import jwt from 'jsonwebtoken'

const sample = async (req, res) => {
    try {
        res.status(200).json({ message: 'in smaple funcion' })
    } catch (error) {

    }
}


const signup = async (req, res) => {
    try {
        const checkExist = await User.findOne({ email: req.body.email })
        if (checkExist) {
            res.json({ status: false, error: 'User is already exist' })
        } else {
            const data = new User({
                fullName: req.body.name,
                email: req.body.email,
                password: req.body.password,
                about: req.body?.about ?? "",
                is_Admin: false
              });

            const userData = await data.save()
            res.json({ userData, status: true })
        }

    } catch (error) {
        console.log(error.message);
    }
}


const login = async (req, res) => {
    console.log('login function');
    try {
        const userData = await User.findOne({ email: req.body.email });
        console.log('here the fetched data');
        console.log(userData);
        if (userData) {
            if (userData.password === req.body.password) {
                const token = jwt.sign({ userId: userData._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
                res.json({ userData, token, status: true, userData: userData })
            } else {
                res.json({ status: false, error: "Incorrect password" })
            }
        } else {
            res.json({ status: false, error: "Eamil not found" })
        }

    } catch (error) {
        console.log(error.message);
    }
}

const verifyUser = async (req, res) => {
    try {
        const token = req.header('token');
        if (!token) return res.json({ status: false })
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = User.findOne({ _id: decoded.userId });
        if (user) {
            res.json({ status: true })
        } else {
            res.json({ status: false })
        }
    } catch {

    }
}

const updateprofile = async (req, res) => {
    console.log('this is the update function');
    try {
        console.log(req.body);
        const { id, fullName, email, about } = req.body
        const oldData = await User.findOne({ _id: id })
        const file = req.file ? req.file.filename : oldData.image
        console.log('here the file' + file);
        const userData = await User.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    fullName: fullName,
                    about: about,
                    email: email,
                    image: file,
                }
            },
            { new: true }
        )
        console.log('updated data');
        console.log(userData);
        res.json({ userData, status: true })
    } catch (error) {
        console.log(error.message);
    }
}
export {
    sample,
    signup,
    login,
    updateprofile,
    verifyUser
}