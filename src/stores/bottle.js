import { Bottle } from '@/modules/bottle';
import { deserialize, serialize } from '@/utils/persist';
import { watchIgnorable } from '@vueuse/core';
import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBottleStore = defineStore('bottle', () => {
  const bottle = ref(new Bottle());

  const toJson = () => {
    return { version: 1, data: serialize(bottle.value) };
  };

  const fromJson = (data) => {
    if (data != null && data.version != null) {
      bottle.value = deserialize(Bottle, convert(data));
    }
  };

  const storageKey = 'bottle';

  const persist = async () => {
    await set(storageKey, toJson());
  };

  const { ignoreUpdates } = watchIgnorable(bottle, persist, { deep: true });

  const hydrate = async () => {
    const data = await get(storageKey);
    ignoreUpdates(() => fromJson(data));
  };

  return { bottle, toJson, fromJson, persist, hydrate };
});

function convert(data) {
  const { version, data: bottle } = data;
  switch (version) {
    case 1:
      break;
  }
  return bottle;
}
