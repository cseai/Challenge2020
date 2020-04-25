exports.getAllUsers = (req, res) => {
	try {
		res.status(200).json({
			success: true,
            msg: 'Got All User',
            data: {
                users: [
                    {
                        userId: 1,
                        name: 'Belal'
                    },
                    {
                        userId: 2,
                        name: 'Helal'
                    },
                    {
                        userId: 3,
                        name: 'Jahurul'
                    }
                ]
            }
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			msg: 'Server Error',
			err: err,
		});
	}
};

exports.getUser = (req, res) => {
	try {
		res.status(200).json({
			success: true,
            msg: 'Get User',
            data: {
                user: {
                    userId: req.params.id * 1,
                    name: 'Belal'
                }
            }
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			msg: 'Server Error',
			err: err,
		});
	}
};


exports.createUser = (req, res) => {
	try {
        console.log(req.body);
		res.status(201).json({
			success: true,
            msg: 'New User Created',
            data: {
                user: req.body
            }
        });
	} catch (err) {
		return res.status(500).json({
			success: false,
			msg: 'Server Error',
			err: err,
		});
	}
};


exports.updateUser = (req, res) => {
	try {
		res.status(200).json({
			success: true,
            msg: 'Update User',
            data: {
                user: req.body
            }
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			msg: 'Server Error',
			err: err,
		});
	}
};


exports.deleteUser = (req, res) => {
	try {
		res.status(204).json({
			success: true,
            msg: 'Delete User',
            data: null
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			msg: 'Server Error',
			err: err,
		});
	}
};

