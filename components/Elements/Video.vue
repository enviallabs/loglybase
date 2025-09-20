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
          placeholder="Video URL (YouTube, Vimeo, etc.)"
          class="flex-1"
          @blur="updateVideo"
        />
      </div>
      
      <div v-else class="flex items-center gap-3">
        <UInput
          type="file"
          accept="video/*"
          class="flex-1"
          @change="handleFileUpload"
        />
      </div>
      
      <div class="flex flex-col gap-3">
        <div v-if="embedUrl" class="relative">
          <div class="aspect-video w-full">
            <iframe 
              v-if="isEmbedService"
              :src="embedUrl" 
              class="w-full h-full rounded-md border border-gray-200"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
            <video 
              v-else
              :src="embedUrl" 
              class="w-full h-full rounded-xl border border-gray-200"
              controls
            />
          </div>
          <div class="absolute top-2 right-2 bg-white rounded-md shadow p-1">
            <UButton
              icon="i-hugeicons-delete-01"
              size="xs"
              variant="ghost"
              color="error"
              @click="clearVideo"
            />
          </div>
        </div>
        
        <div v-else class="border-2 border-dashed border-gray-200 rounded-md p-8 text-center">
          <div class="flex flex-col items-center gap-2">
            <UIcon name="i-hugeicons-video-01" class="text-gray-400 text-4xl" />
            <p class="text-gray-500">
              {{ uploadType === 'url' ? 'Enter video URL above' : 'Upload a video' }}
            </p>
          </div>
        </div>
        
        <UInput
          v-model="localTitle"
          placeholder="Video title"
          class="mt-2"
          @blur="updateVideo"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { VideoContent, UploadType } from '@/types/elements'

  const props = defineProps<{
    content: VideoContent
  }>()

  const emit = defineEmits<{
    (e: 'contentUpdate', value: VideoContent): void
  }>()

  const { uploadFile, deleteFile } = useUpload()

  const localSrc = ref(props.content.src || '')
  const localTitle = ref(props.content.title || '')
  const types = [
    {
      label: 'URL',
      value: 'url'
    },
    {
      label: 'Upload',
      value: 'upload'
    }
  ]
  const uploadType = ref<UploadType>(props.content.uploadType || 'url')

  const isEmbedService = computed(() => {
    if (!localSrc.value) return false
    
    return localSrc.value.includes('youtube.com') || 
          localSrc.value.includes('youtu.be') || 
          localSrc.value.includes('vimeo.com')
  })

  const embedUrl = computed(() => {
    if (!localSrc.value) return ''
    
    if (isEmbedService.value) {
      const youtubeMatch = localSrc.value.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/)
      
      if (youtubeMatch && youtubeMatch[1]) {
        return `https://www.youtube.com/embed/${youtubeMatch[1]}`
      }
      
      const vimeoMatch = localSrc.value.match(/vimeo\.com\/(?:.*\/)?(?:videos\/)?([0-9]+)/)
      
      if (vimeoMatch && vimeoMatch[1]) {
        return `https://player.vimeo.com/video/${vimeoMatch[1]}`
      }
    }
    
    return localSrc.value
  })

  watch(() => props.content.src, (newValue) => {
    if (newValue !== undefined && newValue !== localSrc.value) {
      localSrc.value = newValue
    }
  })

  watch(() => props.content.title, (newValue) => {
    if (newValue !== undefined && newValue !== localTitle.value) {
      localTitle.value = newValue
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
      
      if (file.type.startsWith('video/')) {
        localSrc.value = URL.createObjectURL(file)

        uploadFile(file).then((publicUrl) => {
          localSrc.value = publicUrl

          emitUpdate()
        })
      }
    }
  }

  function clearVideo() {
    deleteFile(localSrc.value)
    
    localSrc.value = ''
    
    emitUpdate()
  }

  function updateVideo() {
    emitUpdate()
  }

  function emitUpdate() {
    emit('contentUpdate', {
      src: localSrc.value,
      title: localTitle.value,
      uploadType: uploadType.value
    })
  }
</script>