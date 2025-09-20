<template>
  <div class="border-b border-gray-100 pb-6">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <SectionHeading
        title="Typography"
        description="Customize fonts and text appearance"
      />
      
      <div class="col-span-2 space-y-4">
        <UFormField label="Font Family">
          <USelectMenu
            v-model="selectedFontFamily"
            :items="fontFamilies"
            size="lg"
            color="neutral"
            class="w-full"
          />
        </UFormField>
        
        <UFormField label="Font Size">
          <UTabs
            v-model="selectedFontSize"
            :items="fontSizes"
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
  const emits = defineEmits(['update:font-family', 'update:font-size'])

  const projectStore = useProjectStore()

  const project = computed(() => {
    return projectStore.project
  })

  const fontFamilies = ref([
    { label: 'Inter', value: 'inter' },
    { label: 'Roboto', value: 'roboto' },
    { label: 'Open Sans', value: 'open-sans' },
    { label: 'Lato', value: 'lato' },
    { label: 'Montserrat', value: 'montserrat' }
  ])
  const selectedFontFamily = ref(fontFamilies.value[0])
  const fontSizes = ref([
    { label: 'Small', value: 'SMALL' },
    { label: 'Medium', value: 'MEDIUM' },
    { label: 'Large', value: 'LARGE' },
  ])
  const selectedFontSize = ref(fontSizes.value[0].value)

  onMounted(() => {
    const fontFamily = fontFamilies.value.find(fontFamily => fontFamily.value === project.value?.fontFamily)
    
    selectedFontFamily.value = fontFamily || fontFamilies.value[0]
    selectedFontSize.value = project.value?.fontSize || fontSizes.value[0].value
  })

  watch(selectedFontFamily, (newFontFamily) => {
    emits('update:font-family', newFontFamily)
  })

  watch(selectedFontSize, (newFontSize) => {
    emits('update:font-size', newFontSize)
  })
</script>