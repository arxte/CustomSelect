<template>
  <div class="home">
    <!-- typeof id === string -------------- -->
    <!-- Множественный выбор -->
    <CustomSelect
        :options="options"
        :keys="['id', 'label']"
        @change="console.log('changed')"
        v-model="optionsValue"
        isMulti
        placeholder="Выберите элемент"
    />

    <pre>{{ optionsValue }}</pre>

    <!--  Одиночный выбор -->
    <CustomSelect
        :options="options2"
        :keys="['id', 'label']"
        @change="console.log('changed')"
        v-model="optionsValue2"
        placeholder="Выберите элемент"
    />

    <pre>{{ optionsValue2 }}</pre>

    <!--    disabled -->
    <CustomSelect
        :options="options3"
        :keys="['id', 'label']"
        @change="console.log('changed')"
        v-model="optionsValue3"
        placeholder="Выберите элемент"
        is-disabled
    />

    <pre>{{ optionsValue3 }}</pre>

    <!-- typeof id === number --------------  -->
    <!-- Множественный выбор -->
    <CustomSelect
        :options="options4"
        :keys="['id', 'label']"
        @change="console.log('changed')"
        v-model="optionsValue4"
        placeholder="Выберите элемент"
        is-multi
    />

    <pre>{{ optionsValue4 }}</pre>

    <!-- Одиночный выбор -->
    <CustomSelect
        :options="options5"
        :keys="['id', 'label']"
        @change="console.log('changed')"
        v-model="optionsValue5"
        placeholder="Выберите элемент"
    />

    <pre>{{ optionsValue5 }}</pre>
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
  },
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

const optionsValue3= ref<string | number | undefined>(undefined)
const options3 = ref<Array<Record<string, any>>>([
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

const optionsValue4= ref<string | number | undefined>(undefined)
const options4 = ref<Array<Record<string, any>>>([
  {
    id: 1,
    label: 'Apple'
  },

  {
    id: 2,
    label: 'Orange'
  },

  {
    id: 3,
    label: 'Banana'
  }
])

const optionsValue5= ref<string | number | undefined>(undefined)
const options5 = ref<Array<Record<string, any>>>([
  {
    id: 1,
    label: 'Apple'
  },

  {
    id: 2,
    label: 'Orange'
  },

  {
    id: 3,
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