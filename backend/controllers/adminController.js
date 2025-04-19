


// //API for adding doctor
// const addDoctor = async (req, res) => {
//     try {
//       const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
//       const imageFile = req.file;


//       console.log({name, email, password, speciality, degree, experience, about, fees, address,},imageFile)
//     } catch (error) {
//     }
//   }

//   export {addDoctor}


import doctorModel from '../models/doctorModel.js';
import { cloudinary } from '../config/cloudinary.js';
import fs from 'fs';

export const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fee,
      address,
      available,
      date
    } = req.body;

    const imageFile = req.file;
    if (!imageFile) {
      return res.status(400).json({ message: 'Image is required' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(imageFile.path, {
      folder: 'doctors'
    });

    // Delete from local folder
    fs.unlinkSync(imageFile.path);

    // Save to MongoDB
    const newDoctor = await doctorModel.create({
      name,
      email,
      password,
      image: result.secure_url,
      speciality,
      degree,
      experience,
      about,
      available: available === 'true', // comes as string from form
      fee: Number(fee),
      address: JSON.parse(address), // send as JSON string from Postman
      date: Number(date)
    });

    res.status(201).json({
      message: 'Doctor saved successfully',
      doctor: newDoctor
    });

  } catch (error) {
    console.error('Error adding doctor:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
