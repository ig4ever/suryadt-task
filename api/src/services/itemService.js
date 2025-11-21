import redisClient from '../config/redis.js';

const ITEMS_KEY = 'items';
const ITEM_PREFIX = 'item:';

export const getItems = async ({ offset, limit, search }) => {
  const allItemsJson = await redisClient.get(ITEMS_KEY);
  let allItems = allItemsJson ? JSON.parse(allItemsJson) : [];

  if (search) {
    allItems = allItems.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  const total = allItems.length;
  const items = allItems.slice(offset, offset + limit);

  return { items, total };
};

export const getItemById = async (id) => {
  const item = await redisClient.get(`${ITEM_PREFIX}${id}`);
  return item ? JSON.parse(item) : null;
};

export const createItem = async (data) => {
  const id = Date.now().toString();
  const item = {
    id,
    ...data,
    createdAt: new Date().toISOString(),
  };

  await redisClient.set(`${ITEM_PREFIX}${id}`, JSON.stringify(item));

  const allItemsJson = await redisClient.get(ITEMS_KEY);
  const allItems = allItemsJson ? JSON.parse(allItemsJson) : [];
  allItems.push(item);
  await redisClient.set(ITEMS_KEY, JSON.stringify(allItems));

  return item;
};

export const updateItem = async (id, data) => {
  const existingItem = await getItemById(id);
  if (!existingItem) return null;

  const updatedItem = {
    ...existingItem,
    ...data,
    id,
    updatedAt: new Date().toISOString(),
  };

  await redisClient.set(`${ITEM_PREFIX}${id}`, JSON.stringify(updatedItem));

  const allItemsJson = await redisClient.get(ITEMS_KEY);
  const allItems = allItemsJson ? JSON.parse(allItemsJson) : [];
  const itemIndex = allItems.findIndex(item => item.id === id);
  if (itemIndex !== -1) {
    allItems[itemIndex] = updatedItem;
    await redisClient.set(ITEMS_KEY, JSON.stringify(allItems));
  }

  return updatedItem;
};

export const deleteItem = async (id) => {
  await redisClient.del(`${ITEM_PREFIX}${id}`);

  const allItemsJson = await redisClient.get(ITEMS_KEY);
  const allItems = allItemsJson ? JSON.parse(allItemsJson) : [];
  const filteredItems = allItems.filter(item => item.id !== id);
  await redisClient.set(ITEMS_KEY, JSON.stringify(filteredItems));
};
