<template>
  <div class="home">
    <CustomSelect
        :options="options"
        :keys="['id', 'label']"
        @change="console.log('changed')"
        v-model="optionsValue"
        isMulti
        placeholder="Выберите элемент"
    />

    <CustomSelect
        :options="options2"
        :keys="['id', 'label']"
        @change="console.log('changed')"
        v-model="optionsValue2"
        placeholder="Выберите элемент"
        is-disabled
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { CustomSelect } from '@ui'

const optionsValue = ref<string[] | number[]>(['apple'])
const options = ref<Array<Record<string, any>>>([
  {
    id: 'apple',
    label: 'Apple'
  },

  {
    id: 'orange',
    label: 'Orange'
  },

  {
    id: 'banana',
    label: 'Banana'
  }
])


const optionsValue2= ref<string | number | undefined>(undefined)
const options2 = ref<Array<Record<string, any>>>([
  {
    id: 'apple',
    label: 'Apple'
  },

  {
    id: 'orange',
    label: 'Orange'
  },

  {
    id: 'banana',
    label: 'Banana'
  }
])
</script>

<style scoped lang="scss">
.home {
  padding: 100px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>