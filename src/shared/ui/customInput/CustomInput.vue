<template>
  <div class="field" ref="field" @click="isFocused = true">
    <label for="input">{{ label }}</label>

    <div :class="['input', { 'input--focused': isFocused }]">
      <input
          id="input"
          ref="input"
          v-model="modelValue"
          :placeholder="placeholder"
          autocomplete="off"
          @input="emit('input')"
      />

      <div class="input__icon" v-if="icon" @click.stop>
        <CustomIcon :icon="icon" :color="iconColor" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CustomIcon } from '@ui'
import { ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'

const modelValue = defineModel<number | string>({ default: undefined })
const emit = defineEmits(['input'])

const props = defineProps<{
  label?: string
  placeholder?: string

  icon?: string
  iconColor?: string
}>()
void props


const isFocused = ref<boolean>(false)
const field = ref<HTMLDivElement | null | undefined>(null)
const input = ref<HTMLInputElement | null | undefined>(null)

onClickOutside(field, () => {
  if(isFocused.value) isFocused.value = false
})

watch(() => isFocused.value, () => {
  if(isFocused.value) input.value?.focus()
})
</script>

<style scoped lang="scss">
.field {
  min-width: 100%;

  display: flex;
  flex-direction: column;

  &:hover {
    cursor: text;
  }

  label {
    font-size: 16px;
    color: $gray-500;
  }

  .input {
    background: $white;
    display: flex;
    align-items: center;
    gap: 6px;
    height: 40px;
    border: 1px solid $gray-300;
    border-radius: 6px;
    padding: 6px;

    transition: .3s;

    &__icon {
      width: 20px;
      height: 20px;
      transition: .3s;

      &:hover {
        opacity: 0.7;
        cursor: pointer;
      }

      &:active {
        opacity: 1;

        :deep(i) {
          color: $blue-200;
        }
      }

      :deep(i) {
        color: $gray-400;
      }
    }

    &__arrow-icons {

      .input__icon {
        width: 16px;
        height: 16px;

        :deep(i) {
          width: 16px;
          height: 16px;
        }
      }
    }

    input {
      outline: none;
      background: transparent;
      width: 100%;
      color: $gray-700;
      font-size: 14px;
      border: none;

      max-height: 40px;

      &[type="number"]::-webkit-outer-spin-button,
      &[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      &[type="number"] {
        -moz-appearance: textfield;
      }

      &::placeholder {
        font-size: 12px;
        color: $gray-400;
      }
    }

    &:hover {
      border-color: $blue-200;
      box-shadow: 0 0 3px $blue-200;
    }

    &--focused {
      border-color: $blue-200;
      box-shadow: 0 0 3px $blue-200;
    }
  }
}
</style>