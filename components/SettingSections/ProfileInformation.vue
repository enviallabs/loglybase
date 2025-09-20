<template>
  <div class="border-b border-gray-100 pb-6">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div>
        <h2 class="text-lg font-medium">Personal Information</h2>
        <p class="text-sm text-gray-400 mt-1">Your basic profile details</p>
      </div>
      
      <div class="col-span-2 space-y-4">
        <div class="flex items-center space-x-4 mb-4">
          <div class="relative">
            <div class="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <UAvatar
                v-if="profile.image"
                :src="profile.image"
                :alt="profile.name"
                :ui="{
                  root: 'size-15 bg-neutral-100',
                }"
              />
              <UIcon v-else name="i-hugeicons-user" class="w-10 h-10 text-gray-400" />
            </div>
            
            <div class="absolute -bottom-1 -right-1">
              <UInput 
                id="logo-upload" 
                type="file" 
                accept="image/*" 
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                @change="handleAvatarUpload"
              />
              <UButton
                icon="i-hugeicons-pencil-edit-01"
                color="neutral"
                size="sm"
                type="button"
                class="rounded-full"
              />
            </div>
          </div>
          
          <div>
            <p class="text-sm font-medium">Avatar image</p>
            <p class="text-xs text-gray-400">Recommended size: 512x512px</p>
          </div>
        </div>

        <UFormField label="Username">
          <UInput
            v-model="profile.name"
            size="lg"
            color="neutral"
            :ui="{ base: 'text-gray-500' }"
            class="w-full"
            disabled
          />
        </UFormField>
        
        <UFormField label="Email">
          <UInput
            v-model="profile.email"
            type="email"
            size="lg"
            color="neutral"
            placeholder="Enter your email"
            :ui="{ base: 'text-gray-500' }"
            class="w-full"
            disabled
          />
        </UFormField>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const toast = useToast()
  const { authClient } = useAuthClient()

  const profile = ref({
    name: '',
    email: '',
    image: '',
  })
  const avatarFile = ref<File | null>(null)

  onMounted(async () => {
    const { data } = await authClient.getSession()
    
    if (data?.user) {
      profile.value.name = data?.user.name
      profile.value.email = data?.user.email
      profile.value.image = data?.user.image as string
    }
  })

  function handleAvatarUpload(event: Event) {
    const target = event.target as HTMLInputElement
    const files = target.files
    
    if (files && files.length > 0) {
      const file = files[0]
      
      if (file.type.startsWith('image/')) {
        avatarFile.value = file
        
        const reader = new FileReader()
        reader.onload = (e) => {
          profile.value.image = e.target?.result as string
        }
        reader.readAsDataURL(file)
      } else {
        toast.add({
          title: 'Oops',
          description: 'Please select an image file',
          color: 'error',
          icon: 'i-hugeicons-cancel-circle',
          duration: 1500
        })
      }
    }
  }

  watch(() => avatarFile.value, async (file) => {
    if (file) {
      try {
        if (profile.value.image) {
          await authClient.updateUser({
            image: profile.value.image,
          })
        }
      } catch (_) {
        toast.add({
          title: 'Oops',
          description: 'Failed to upload avatar',
          color: 'error',
          icon: 'i-hugeicons-cancel-circle',
          duration: 1500
        })
      }
    }
  })
</script>