import { useBottleStore } from '@/stores/bottle';
import { defineStore } from 'pinia';

export const useStores = defineStore('stores', () => {
  const stores = {
    bottle: useBottleStore(),
  };

  const hydrate = async () => {
    for (const store of Object.values(stores)) {
      try {
        await store.hydrate();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return { hydrate };
});
