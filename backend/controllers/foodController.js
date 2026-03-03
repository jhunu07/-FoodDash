import foodModel from '../models/foodModel.js'; // Import the foodModel
import cloudinary from '../config/cloudinary.js';

const addFood = async (req, res) => {
    console.log("Request Body:", req.body); // Debug the request body
    console.log("Uploaded File:", req.file); // Debug the uploaded file

    try {
        const { name, description, price, category } = req.body;

        if (!name || !description || !price || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required",
            });
        }

        // Cloudinary returns the full URL in req.file.path
        let image_url = req.file.path;

        const food = new foodModel({
            name,
            description,
            price,
            category,
            image: image_url,
        });

        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log("Error adding food:", error);
        res.status(500).json({ success: false, message: "Error saving food: " + error.message });
    }
};
//all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })

    }
}
//  remove food item

const removeFood = async(req,res) =>{
     try {
        const food = await foodModel.findById(req.body.id);
        
        if (!food) {
            return res.status(404).json({success: false, message: "Food not found"});
        }
        
        // Extract public_id from Cloudinary URL and delete from Cloudinary
        if (food.image && food.image.includes('cloudinary')) {
            try {
                // Extract public_id: fooddrop/filename from URL
                const urlParts = food.image.split('/');
                const uploadIndex = urlParts.indexOf('upload');
                if (uploadIndex !== -1) {
                    const publicIdWithExt = urlParts.slice(uploadIndex + 2).join('/');
                    const publicId = publicIdWithExt.split('.')[0];
                    console.log('Deleting from Cloudinary:', publicId);
                    await cloudinary.uploader.destroy(publicId);
                }
            } catch (cloudError) {
                console.log('Cloudinary deletion error:', cloudError);
                // Continue with DB deletion even if Cloudinary delete fails
            }
        }

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
     } catch (error) {
        console.log('Delete error:', error);
        res.status(500).json({success:false,message:"Error: " + error.message})
     }
}

export { addFood,listFood ,removeFood};