<template>
  <div :class="['select', { 'select--disabled': isDisabled, 'select--focused': isShowOptions }]" ref="select" @click="toggleOptionsVisible">
    <p :class="['select__value', { 'select__value--placeholder': !label }]">{{ label || placeholder}}</p>

    <div class="select__icon-wrapper">
      <CustomIcon icon="chevron-down" :deg="isShowOptions ? 'down' : ''" />
    </div>

    <teleport to="body">
      <Transition>
        <div class="select__body" ref="selectOutside" :style="styleObject" v-if="isShowOptions">
          <CustomInput
              placeholder="Поиск"
              @input="filterOptions(searchValue)"
              v-model="searchValue"
              icon="search"
          />

          <template v-if="copiedOptions.length">

            <TransitionGroup name="group">
              <p
                  v-for="option in copiedOptions"
                  :key="option?.[keys[0]]"
                  :class="['select__option', { 'select__option--selected': checkIsSelected(option?.[keys[0]]) }]"
                  @click="changeValue(option?.[keys[0]])"
              >
                {{ option?.[keys[1]] }}
                <CustomIcon :icon="checkIsSelected(option?.[keys[0]]) ? 'check' : ''" />
              </p>
            </TransitionGroup>
          </template>

          <p class="select__empty" v-else>
              Ничего не найдено...
          </p>
        </div>
      </Transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { CustomInput, CustomIcon } from '@ui';
import { ref, computed, onMounted, watch } from 'vue'
import { onClickOutside, useMouseInElement, watchDebounced } from '@vueuse/core'

const modelValue = defineModel<number | string | string[] | number[] | null | undefined>({ default: undefined })
const emit = defineEmits(['change'])

const props = defineProps<{
  placeholder?: string

  options: Array<Record<string, any>>
  keys: string[]
  isMulti?: boolean

  isDisabled?: boolean
}>()

const select = ref<HTMLDivElement | null>(null)
const selectOutside = ref<HTMLDivElement | null>(null)
const isShowOptions = ref<boolean>(false)
const isTimer = ref<boolean>(true)

const label = ref<string | undefined>('')
const searchValue = ref<string | undefined>(undefined)
const copiedOptions = ref<Array<Record<string, any>>>([])

const { elementPositionX, elementPositionY, elementHeight } = useMouseInElement(select)

const styleObject = computed<{top: string, left: string}>(() => {
  return {
    top: elementPositionY.value + elementHeight.value + 5 + 'px',
    left: elementPositionX.value + 'px'
  }
})

const filterOptions = (searchValue: string | undefined) => {
  if(!searchValue) {
    resetFilter()

    return
  }

  copiedOptions.value = props.options.filter((option: Record<string, any>) => String(option?.[props.keys[1]]).toLowerCase().includes(searchValue.toLowerCase()))
}

const resetFilter = () => {
  copiedOptions.value = [ ...props.options ]
  searchValue.value = undefined
}

const getValue = (value: string | number | string[] | number[] | undefined | null) => {
  if(!value) return ''

  const getLabelByValue = (key: string | number) => {
    const idx = props.options.findIndex((option: Record<string, any>) => option?.[props.keys[0]] === key)

    if(idx !== -1) return props.options[idx]?.[props.keys[1]]
  }

  if(!Array.isArray(value))
    return String(getLabelByValue(value))
  else {
    const list = []

    for(const item of value) list.push(getLabelByValue(item))

    return list.join(', ')
  }
}

const changeValue = (optionKey: string | number) => {
  if (!props.isMulti) {
    modelValue.value = modelValue.value === optionKey ? undefined : optionKey as typeof modelValue.value
    isShowOptions.value = isTimer.value = false
    resetFilter()

    return
  }

  if (!Array.isArray(modelValue.value) || !modelValue.value.length) {
    modelValue.value = [optionKey] as unknown as typeof modelValue.value
    return
  }

  const list = modelValue.value as (string | number)[]

  if (list.includes(optionKey))
    modelValue.value = list.filter((key) => key !== optionKey) as typeof modelValue.value
  else
    modelValue.value = [...list, optionKey] as typeof modelValue.value
}

const checkIsSelected = (optionKey: string | number) => {
  if(!modelValue.value) return false

  if(props.isMulti && Array.isArray(modelValue.value))
    return (modelValue.value as Array<string | number>).includes(optionKey)
  else
    return modelValue.value === optionKey
}

const toggleOptionsVisible = () => {
  if(props.isDisabled) return

  if(isTimer.value) isShowOptions.value = !isShowOptions.value

  isTimer.value = false
}

onClickOutside(selectOutside, () => {
  if (isShowOptions.value) {
    isShowOptions.value = isTimer.value = false
    resetFilter()
    searchValue.value = undefined
  }
})

watchDebounced(isTimer,() => isTimer.value = true, { debounce: 100, maxWait: 100 })

watch(() => modelValue.value, () => {
  label.value = getValue(modelValue.value)
  emit('change', modelValue.value)
})

watch(() => props.options, () => resetFilter())

onMounted(() => {
  label.value = getValue(modelValue.value)
  resetFilter()
})
</script>

<style scoped lang="scss">
.select {
  position: relative;
  min-width: 100%;
  height: 40px;
  border: 1px solid $gray-300;
  border-radius: 6px;
  padding: 6px;
  display: flex;
  align-items: center;
  transition: .2s;

  &:hover, &--focused {
    border-color: $blue-200;
    box-shadow: 0 0 3px $blue-200;
    cursor: pointer;
  }

  &--disabled {
    background-color: $gray-200;

    &:hover {
      border-color: $gray-300;
      box-shadow: none;
      cursor: no-drop;
    }
  }

  &__empty {
    color: $gray-500;
    text-align: center;
    padding-bottom: 10px;
  }

  &__icon-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    display: flex;
    align-items: center;
    color: $gray-400;
    padding: 0 4px;
  }

  &--focused {
    border-color: $blue-200;
    box-shadow: 0 0 3px $blue-200;
  }

  &__value {
    font-size: 14px;
    color: $gray-700;

    &--placeholder {
      font-size: 12px;
      color: $gray-500;
    }
  }

  &__body {
    position: absolute;
    background-color: $white;
    border: 1px solid $gray-300;
    border-radius: 6px;
    box-shadow: 0 0px 10px $gray-300;

    .field {
      padding: 10px;
    }

    display: flex;
    flex-direction: column;
  }

  &__option {
    padding: 10px;
    color: $gray-700;
    font-size: 14px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    transition: .2s;

    &:hover {
      cursor: pointer;
    }

    &--selected {
      background-color: $blue-600;
      color: $white;
    }
  }
}
</style>