export const getData = async (req, res) => {
    try {
        // User is already attached by middleware
        const user = req.user;
        
        res.status(200).json({
            success: true,
            userData: {
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Error in getData:", error);
        res.status(500).json({ success: false, message: "Error retrieving data" });
    }
}