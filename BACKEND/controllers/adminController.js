import User from "../model/userModel.js";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
    try {
        const userData = await User.findOne({ email: req.body.email });

        if (userData) {
            if (userData.password === req.body.password) {
                if (userData.is_Admin) {
                    const token = jwt.sign(
                        { userId: userData._id },
                        process.env.JWT_SECRET,
                        { expiresIn: "30d" }
                    );
                    res.json({ token, status: true });
                } else {
                    res.json({ status: false, error: "Not a adimin" });
                }
            } else {
                res.json({ status: false, error: "Incorrect password" });
            }
        } else {
            res.json({ status: false, error: "Eamil not found" });
        }
    } catch (error) {
        console.log(error.message);
    }
};

const users = async (req, res) => {
    try {
        const usersData = await User.find({ is_Admin: false });
        if (usersData) {
            res.json({ usersData, status: true });
        } else {
            res.json({ status: false, error: "NO users" });
        }
    } catch (error) {
        console.log(error.message);
    }
};

const delteUser = async (req, res) => {
    try {
        console.log("this is the delete fn");
        console.log(req.body);
        const deletedUser = await User.deleteOne({ _id: req.body.userId });
        console.log(deletedUser);
        if (deletedUser) {
            res.json({ status: true });
        } else {
            return res.json({ status: false, error: "Deletion failled" });
        }
    } catch (error) {
        console.log(error.message);
    }
};

const loadEditUser = async (req, res) => {
    try {
        const userData = await User.findOne({ _id: req.params.id });
        if (userData) {
            res.json({ userData, status: true });
        } else {
            res.json({ status: false, error: "User not found" });
        }
    } catch (error) {
        console.log(error.message);
    }
};

const updateUser = async (req, res) => {
    try {
        const { name, email, id } = req.body;
        const userData = await User.findOneAndUpdate(
            { _id: id },
            {
                $set: { name: name, email: email },
            }
        );
        if (userData) {
            res.json({ status: true });
        } else {
            res.json({ status: false });
        }
    } catch (error) {
        console.log(error.message);
    }
};

const searchUser = async (req, res) => {
    try {
        const users = await User.find({
            $and: [
                {
                    $or: [
                        { name: { $regex: new RegExp(req.body.data, "i") } },
                        { email: { $regex: new RegExp(req.body.data, "i") } },
                    ],
                },
                { is_Admin: { $ne: true } },
            ],
        });

        if (users) {
            res.json({ status: true, usersData: users });
        } else {
            res.json({ status: false, error: "Not found" });
        }
    } catch (error) {
        console.error(error);
    }
};

const addUser = async (req, res) => {
    try {
        const checkExist = await User.findOne({ email: req.body.email });
        if (checkExist) {
            res.json({ status: false, error: "Email already exist" });
        } else {
            const data = new User({
                fullName: req.body.fullName,
                email: req.body.email,
                password: req.body.password,
                about: req.body.about,
                is_Admin: false,
            });

            const userData = await data.save();
            res.json({ status: true });
        }
    } catch (error) {
        console.log(error.message);
    }
};

export {
    login,
    users,
    delteUser,
    loadEditUser,
    updateUser,
    searchUser,
    addUser,
};
