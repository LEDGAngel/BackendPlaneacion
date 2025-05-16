import db from '../utils/firebase.js';

const itemsCollection = db.collection('items'); // Define the Firestore collection name for items

export const getItems = async (req, res) => {
  try {
    const snapshot = await itemsCollection.get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(items);
    res.json(items);
  } catch (error) {
    console.error("Error getting items:", error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};

export const getItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const doc = await itemsCollection.doc(itemId).get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const item = { id: doc.id, ...doc.data() };
    console.log(item);
    res.json([item]); // Firestore get returns a single document, so we wrap it in an array for consistency with the SQL version
  } catch (error) {
    console.error("Error getting item:", error);
    res.status(500).json({ error: 'Failed to fetch item' });
  }
};

export const postItem = async (req, res) => {
  try {
    const { name, price } = req.body;
    const newItem = { name, price };
    const docRef = await itemsCollection.add(newItem);
    const docSnapshot = await docRef.get();
    const createdItem = { id: docSnapshot.id, ...docSnapshot.data() };
    res.status(200).json({ operation: true, item: [createdItem] });
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ operation: false, error: 'Failed to add item' });
  }
};

export const putItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { name, price } = req.body;
    const updatedItem = { name, price };
    await itemsCollection.doc(itemId).update(updatedItem);
    res.status(200).json({ operation: true });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ operation: false, error: 'Failed to update item' });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    await itemsCollection.doc(itemId).delete();
    console.log(`Item with ID ${itemId} deleted`);
    res.json([{ id: itemId }]); // Sending back an array with the deleted item's ID for consistency
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
};