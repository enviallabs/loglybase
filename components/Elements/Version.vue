<template>
  <div class="w-full p-4 bg-white space-y-2">
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-3 w-full">
        <UInput
          v-model="localVersion"
          placeholder="Version (eg., v1.0.0)"
          class="w-1/3"
        />

        <UPopover>
          <UButton
            icon="i-hugeicons-calendar-03"
            class="w-1/3 hover:bg-transparent" 
            color="neutral"
            variant="outline"
            :ui="{
              base: localDate ? '' : 'text-neutral-400',
            }"
          >
            {{ localDate ? localDate : 'Date of Release' }}
          </UButton>
      
          <template #content>
            <UCalendar v-model="localDate" class="p-2" />
          </template>
        </UPopover>
        <USelect
          v-model="localType"
          :items="typeOptions"
          placeholder="Type of Release"
          class="w-1/3"
          @update:model-value="updateVersion"
        />
      </div>
    </div>
    
    <div class="flex items-center gap-2 mt-2">
      <UInput
        v-model="localCommitHash"
        placeholder="Commit hash (optional)"
        class="w-full"
      />
    </div>

    <div v-if="isMetaUpdated" class="flex justify-end">
      <UButton
        color="neutral"
        size="sm"
        @click="emitUpdate"
      >
        Update
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { CalendarDate } from '@internationalized/date'
  import type { VersionContent, ReleaseType } from '~/types/elements'

  const props = defineProps<{
    content: VersionContent
  }>()

  const emit = defineEmits<{
    (e: 'contentUpdate', value: VersionContent): void
  }>()

  const isMetaUpdated = ref(false)
  const localVersion = ref(props.content.version || '')
  const localDate = shallowRef<any>(props.content.date ? new CalendarDate(props.content.date?.year, props.content.date?.month, props.content.date?.day) : null)
  const localType = ref<ReleaseType>(props.content.type || 'stable')
  const localDescription = ref(props.content.description || '')
  const localCommitHash = ref(props.content.commitHash || '')

  const typeOptions = [
    { label: 'Stable', value: 'stable' },
    { label: 'Beta', value: 'beta' },
    { label: 'Alpha', value: 'alpha' },
    { label: 'Release-Candidate', value: 'rc' },
    { label: 'Patch', value: 'patch' }
  ]

  watch(() => props.content.version, (newValue) => {
    if (newValue !== undefined && newValue !== localVersion.value) {
      localVersion.value = newValue
    }
  })

  watch(() => localVersion.value, (newValue) => {
    if (newValue === props.content.version) {
      isMetaUpdated.value = false
    }
    
    if (newValue !== undefined && newValue !== props.content.version) {
      updateVersion()
    }
  })

  watch(() => localDate.value, (newValue) => {
    const lDate = new CalendarDate(newValue.year, newValue.month, newValue.day)
    const pDate = new CalendarDate(props.content.date?.year, props.content.date?.month, props.content.date?.day)
    
    if (lDate.compare(pDate) === 0) {
      isMetaUpdated.value = false
    }
    
    if (newValue !== undefined && lDate.compare(pDate) !== 0) {
      updateVersion()
    }
  })

  watch(() => localType.value, (newValue) => {
    if (newValue === props.content.type) {
      isMetaUpdated.value = false
    }
    
    if (newValue !== undefined && newValue !== props.content.type) {
      updateVersion()
    }
  })

  watch(() => localCommitHash.value, (newValue) => {
    if (newValue === props.content.commitHash) {
      isMetaUpdated.value = false
    }
    
    if (newValue !== undefined && newValue !== props.content.commitHash) {
      updateVersion()
    }
  })

  watch(() => props.content.type, (newValue) => {
    if (newValue !== undefined && newValue !== localType.value) {
      localType.value = newValue
    }
  })

  watch(() => props.content.description, (newValue) => {
    if (newValue !== undefined && newValue !== localDescription.value) {
      localDescription.value = newValue
    }
  })

  watch(() => props.content.commitHash, (newValue) => {
    if (newValue !== undefined && newValue !== localCommitHash.value) {
      localCommitHash.value = newValue
    }
  })

  function updateVersion() {
    isMetaUpdated.value = true
  }

  function emitUpdate() {
    if (!localVersion.value || !localDate.value) {
      useToast().add({
        title: 'Oops',
        description: 'Version name and date are required',
        color: 'error',
        icon: 'i-hugeicons-cancel-circle',
        duration: 1500
      })

      return
    }
    
    emit('contentUpdate', {
      version: localVersion.value,
      date: localDate.value,
      type: localType.value,
      description: localDescription.value,
      commitHash: localCommitHash.value
    })
    
    isMetaUpdated.value = false
  }
</script>