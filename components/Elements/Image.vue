<template>
  <div class="w-full p-4 bg-white">
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-2">
        <URadioGroup
          v-model="uploadType"
          color="neutral"
          variant="card"
          orientation="horizontal"
          :items="types"
          :ui="{
            item: 'w-full'
          }"
          class="w-full"
        />
      </div>
      
      <div v-if="uploadType === 'url'" class="flex items-center gap-3">
        <UInput
          v-model="localSrc"
          placeholder="Image URL"
          class="flex-1"
          @blur="updateImage"
        />
      </div>
      
      <div v-else class="flex items-center gap-3">
        <UInput
          type="file"
          accept="image/*"
          class="flex-1"
          @change="handleFileUpload"
        />
      </div>
      
      <div class="flex flex-col gap-3">
        <div v-if="localSrc" class="relative">
          <img 
            :src="localSrc" 
            :alt="localAlt"
            class="max-w-full rounded-xl border border-gray-200"
            @error="handleImageError"
          >
          <div class="absolute top-2 right-2 bg-white rounded-md shadow p-1">
            <UButton
              icon="i-hugeicons-delete-01"
              size="xs"
              variant="ghost"
              color="error"
              @click="clearImage"
            />
          </div>
        </div>
        
        <div v-else class="border-2 border-dashed border-gray-200 rounded-md p-8 text-center">
          <div class="flex flex-col items-center gap-2">
            <UIcon name="i-hugeicons-image-01" class="text-gray-400 text-4xl" />
            <p class="text-gray-500">
              {{ uploadType === 'url' ? 'Enter image URL above' : 'Upload an image' }}
            </p>
          </div>
        </div>
        
        <UInput
          v-model="localAlt"
          placeholder="Image description (alt text)"
          class="mt-2"
          @blur="updateImage"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { ImageContent, UploadType } from '~/types/elements';

  const props = defineProps<{
    content: ImageContent
  }>()

  const emit = defineEmits<{
    (e: 'contentUpdate', value: ImageContent): void
  }>()

  const { uploadFile, deleteFile } = useUpload()

  const localSrc = ref(props.content.src || '')
  const localAlt = ref(props.content.alt || '')
  const types = ref([{
    label: 'URL',
    value: 'url'
  }, {
    label: 'Upload',
    value: 'upload'
  }])
  const uploadType = ref<UploadType>(props.content.uploadType || 'url')
  const imageError = ref(false)

  watch(() => props.content.src, (newValue) => {
    if (newValue !== undefined && newValue !== localSrc.value) {
      localSrc.value = newValue
      imageError.value = false
    }
  })

  watch(() => props.content.alt, (newValue) => {
    if (newValue !== undefined && newValue !== localAlt.value) {
      localAlt.value = newValue
    }
  })

  watch(() => props.content.uploadType, (newValue) => {
    if (newValue !== undefined) {
      uploadType.value = newValue
    }
  })

  function handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement
    
    if (input.files && input.files.length > 0) {
      const file = input.files[0]
      
      if (file.type.startsWith('image/')) {
        localSrc.value = URL.createObjectURL(file)
        
        uploadFile(file).then((publicUrl) => {
          localSrc.value = publicUrl

          emitUpdate()
        })
      }
    }
  }

  function handleImageError() {
    imageError.value = true
  }

  function clearImage() {
    deleteFile(localSrc.value)

    localSrc.value = ''
    imageError.value = false

    emitUpdate()
  }

  function updateImage() {
    emitUpdate()
  }

  function emitUpdate() {
    emit('contentUpdate', {
      src: localSrc.value,
      alt: localAlt.value,
      uploadType: uploadType.value
    })
  }
</script>