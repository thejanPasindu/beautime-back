function adminOnly(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }

    next();
}

function merchantOnly(req, res, next) {
    if (req.user.role !== 'merchant-user') {
        return res.status(403).json({ message: 'Forbidden' });
    }

    next();
}

function consumerOnly(req, res, next) {
    if (req.user.role !== 'consumer-user') {
        return res.status(403).json({ message: 'Forbidden' });
    }

    next();
}

module.exports = { adminOnly, merchantOnly, consumerOnly };
