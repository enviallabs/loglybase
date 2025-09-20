<template>
  <ClientOnly>
    <div class="flex items-center justify-center px-6 py-6">
      <div class="container mx-auto max-w-4xl 2xl:max-w-[70%] space-y-8">
        <SettingsNavigation class="overflow-auto" />

        <div class="space-y-12">
          <PageHeading
            title="Project Settings"
            description="Manage your project details and configuration"
          />
          
          <div v-if="!accessLoaded" class="space-y-6">
            <SkeletonLoader 
              :items="[
                { type: 'input', labelWidth: 'w-24' },
                { type: 'textarea', labelWidth: 'w-20' },
                { type: 'image-upload' }
              ]"
              :show-save-button="true"
            />
            
            <SkeletonLoader 
              :items="[
                { type: 'input-button', labelWidth: 'w-24', buttonWidth: 'w-12', hasDescription: true, descriptionWidth: 'w-3/4' },
                { type: 'input-button', labelWidth: 'w-28', buttonWidth: 'w-20', hasDescription: true, descriptionWidth: 'w-4/5' },
                { type: 'info-box' }
              ]"
            />
            
            <SkeletonLoader 
              :items="[
                { type: 'danger-zone' }
              ]"
            />
          </div>
          
          <div v-else class="space-y-6">
            <ProjectInformation />
            <ProjectUrl />
            <ProjectDangerZone />
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
  definePageMeta({
    middleware: ['auth']
  })

  const projectStore = useProjectStore()
  const { getOne } = useProject()
  
  const accessLoaded = ref(false)

  onMounted(async () => {
    accessLoaded.value = true
  })

  getOne(projectStore.project?.code || '')
</script>