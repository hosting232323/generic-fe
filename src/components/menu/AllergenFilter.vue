<template>
  <h3 class="text-h6 font-weight-bold mb-2">Filtra per allergeni</h3>
  <v-checkbox
    v-for="allergen in allergens"
    :key="allergen"
    :model-value="modelValue"
    :label="formatAllergenName(allergen)"
    :value="allergen"
    density="compact"
    @update:modelValue="val => emit('update:modelValue', val)"
  >
    <template #prepend>
      <v-avatar size="24" class="me-2">
        <v-img :src="allergenIcons[allergen].src" alt="Icona allergene" cover />
      </v-avatar>
    </template>
  </v-checkbox>
</template>

<script setup>
import { allergenIcons, formatAllergenName } from '@/utils/allergens';

const props = defineProps({
  allergens: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue']);
</script>
