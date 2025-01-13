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
  const storageVersion = 1;

  const persist = async () => {
    await set(storageKey, { storageVersion, data: toJson() });
  };

  const { ignoreUpdates } = watchIgnorable(bottle, persist, { deep: true });

  const hydrate = async () => {
    const data = await get(storageKey);
    if (data != null && data.storageVersion === storageVersion) {
      ignoreUpdates(() => fromJson(data.data));
    }
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
