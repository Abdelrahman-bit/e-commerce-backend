import jwt from "jsonwebtoken";

function authChecker(req, res, next) {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];

	// Allow access to login and user creation routes without token
	if (
		req.path.includes("login") ||
		req.path.includes("reset-password") ||
		req.path.includes("render-form") ||
		(req.path.includes("products") && req.method === 'GET') ||
		(req.path.includes("users") && req.method === "POST")
	) {
		return next();
	}

	if (!token) {
		return res.status(401).json({ message: "Access Denied" });
	}

	try {
		const verified = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = verified.userId;
		req.role = verified.role;
	} catch (error) {
		return res.status(403).json({ message: "Invalid Token" });
	}
	next();
}

export default authChecker;
