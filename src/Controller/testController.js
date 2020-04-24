exports.getTest = (req, res) => {
	try {
		res.status(200).json({
			success: true,
			msg: 'This is test api',
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			msg: 'Server Error',
			err: err,
		});
	}
};
