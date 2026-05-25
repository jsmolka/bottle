import { Bottle } from '@/modules/bottle';
import { deserialize, serialize } from '@/utils/persist';
import { get, set } from '@/utils/store';
import { watchIgnorable } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBottleStore = defineStore('settings', () => {
  const bottle = ref(new Bottle());

  const toJson = () => {
    return { version: 1, data: serialize(bottle.value) };
  };

  const migrate = (data) => {
    const { version, data: bottle } = data;
    switch (version) {
      case 1:
    }
    return bottle;
  };

  const fromJson = (data) => {
    if (data != null && data.version != null) {
      bottle.value = deserialize(Bottle, migrate(data));
    }
  };

  const storeKey = 'bottle';
  const storeVersion = 1;

  const persist = async () => {
    await set(storeKey, { storeVersion, data: toJson() });
  };

  const { ignoreUpdates } = watchIgnorable(bottle, persist, { deep: true });

  const hydrate = async () => {
    const data = await get(storeKey);
    if (data != null && data.storeVersion === storeVersion) {
      ignoreUpdates(() => fromJson(data.data));
    }
  };

  return { bottle, toJson, fromJson, persist, hydrate };
});
