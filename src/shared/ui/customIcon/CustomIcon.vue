<template>
  <i :class="[icon, deg]" class="icon" :style="styleObject" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { StyleValue } from 'vue'
import type { TIcons } from './types.ts'

const props = defineProps<{
  icon: TIcons
  deg?: string
  size?: string
  color?: string
}>()

const styleObject = computed<StyleValue | undefined>(() => {
  const data: StyleValue = {
    '-webkit-mask-image': `url(/icons/${props.icon}.svg)`,
    'mask-image': `url(/icons/${props.icon}.svg)`,
    color: props.color ?? ''
  }

  if (props.size) data.width = data.height = props.size

  return data
})
</script>

<style scoped lang="scss">
i.icon, img.icon {
  display: inline-block;
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;

  transition: .2s;

  &.up {
    transform: rotate(-180deg);
  }

  &.down {
    transform: rotate(180deg);
  }

  &.left {
    transform: rotate(-90deg);
  }

  &.right {
    transform: rotate(90deg);
  }
}

i.icon {
  background: currentColor;
}

.icon {
  height: 20px;
  width: 20px;
}
</style>
