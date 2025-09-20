<template>
  <div class="border-b border-gray-100 pb-6">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <SectionHeading
        title="Theme Settings"
        description="Configure the visual appearance of your changelog"
      />
      
      <div class="col-span-2 space-y-4">
        <UFormField label="Theme">
          <UTabs
            v-model="selectedTheme"
            :items="themes"
            :content="false"
            size="sm"
            color="neutral"
            variant="pill"
            :ui="{
              list: 'bg-white border border-neutral-200',
            }"
          />
        </UFormField>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const emits = defineEmits(['update:theme'])

  const themes = ref([
    { label: 'Light', value: 'LIGHT' },
    { label: 'Dark', value: 'DARK' },
    { label: 'System', value: 'SYSTEM' },
  ])
  const selectedTheme = ref(themes.value[0].value)

  watch(selectedTheme, (newTheme) => {
    emits('update:theme', newTheme)
  })
</script>