const User = require('../models/userModel');

createUser = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an user',
        });
    }

    const user = new User(body);

    if (!user) {
        return res.status(400).json({ success: false, error: err });
    }

    user.save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'User created!',
            });
        })
        .catch((error) => {
            return res.status(400).json({
                error,
                message: 'User couldnt be created!',
            });
        });
};

updateUser = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update!',
        });
    }

    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            });
        }

        user.name = body.name;
        user.accountType = body.accountType;

        user.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'User updated!',
                });
            })
            .catch((error) => {
                return res.status(404).json({
                    error,
                    message: 'User couldnt be updated!',
                });
            });
    });
};

deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` });
        }

        return res.status(200).json({ success: true, data: user });
    }).catch((err) => console.log(err));
};

getUsers = async (req, res) => {
    await User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `Users couldnt be found` });
        }
        return res.status(200).json({ success: true, data: users });
    }).catch((err) => console.log(err));
};

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
};
