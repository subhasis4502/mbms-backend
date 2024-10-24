import { Request, Response } from "express";
import Hisab from "../models/hisab.model";

// Create a new hisab
export const createHisab = async (req: Request, res: Response) => {
  try {
    const { title, details, totalAmount } = req.body;

    const newHisab = new Hisab({
      title,
      details,
      totalAmount
    })

    const savedHisab = await newHisab.save();
    res.status(201).json(savedHisab);
  } catch (error) {
    res.status(400).json({ message: 'Error creating hisab', error });
  }
}

// Get all hisabs
export const getAllHisabs = async (req: Request, res: Response) => {
  try {
    const hisabs = await Hisab.find({ isActive: true }).sort({ _id: -1 });
    res.json(hisabs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hisabs', error });
  }
};

// Get last hisab
export const getLastHisab = async (req: Request, res: Response) => {
  try {
    const hisabs = await Hisab.find({ isActive: true }).sort({ _id: -1 }).limit(1);
    res.json(hisabs[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hisabs', error });
  }
};

// Update a hisab
export const updateHisab = async (req: Request, res: Response) => {
  try {
    const updatedHisab = await Hisab.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedHisab) {
      return res.status(404).json({ message: 'Hisab not found' });
    }
    res.json(updatedHisab);
  } catch (error) {
    res.status(400).json({ message: 'Error updating hisab', error });
  }
};