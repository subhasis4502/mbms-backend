import { Request, Response } from 'express';
import Card from '../models/card.model';
import { ICard } from '../interfaces/card.interface';

// Create a new card
export const createCard = async (req: Request, res: Response) => {
  try {
    const { name, type, totalLimit, billDate } = req.body;

    let card = await Card.findOne({ type });
    let savedCard;
    if (!card) {
      const newCard = new Card({
        name,
        type,
        totalLimit,
        currentLimit: totalLimit,
        billDate
      });

      savedCard = await newCard.save();
    } else {
      card.name.push(name);
      savedCard = await card.save();
    }
    res.status(201).json(savedCard);
  } catch (error) {
    res.status(400).json({ message: 'Error creating card', error });
  }
};

// Get all cards
export const getAllCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find({ isActive: true });
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cards', error });
  }
};

// Get a single card by ID
export const getCardById = async (req: Request, res: Response) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.json(card);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching card', error });
  }
};

// Update a card
export const updateCard = async (req: Request, res: Response) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.json(updatedCard);
  } catch (error) {
    res.status(400).json({ message: 'Error updating card', error });
  }
};

// Delete a card (soft delete by setting isActive to false)
export const deleteCard = async (req: Request, res: Response) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.json({ message: 'Card deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting card', error });
  }
};

// Add a payment to a card
export const addPayment = async (req: Request, res: Response) => {
  try {
    const { cardId, paymentId } = req.body;
    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    card.payments.push(paymentId);
    await card.save();
    res.json(card);
  } catch (error) {
    res.status(400).json({ message: 'Error adding payment to card', error });
  }
};

// Update current limit
export const updateCurrentLimit = async (req: Request, res: Response) => {
  try {
    const { cardId, newLimit } = req.body;
    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    card.currentLimit = newLimit;
    await card.save();
    res.json(card);
  } catch (error) {
    res.status(400).json({ message: 'Error updating current limit', error });
  }
};