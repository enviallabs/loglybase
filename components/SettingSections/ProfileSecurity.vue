<template>
  <div class="border-b border-gray-100 pb-6">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div>
        <h2 class="text-lg font-medium">Security</h2>
        <p class="text-sm text-gray-400 mt-1">Manage your account security</p>
      </div>
      
      <div class="col-span-2 space-y-3">
        <UFormField label="Old password">
          <UInput
            v-model="password.old"
            type="password"
            size="lg"
            color="neutral"
            placeholder="Enter your old password"
            class="w-full"
          />
        </UFormField>
        
        <UFormField label="New password">
          <UInput
            v-model="password.new"
            type="password"
            size="lg"
            color="neutral"
            placeholder="Enter your new password"
            class="w-full"
          />
        </UFormField>

        <UFormField label="New password again">
          <UInput
            v-model="password.newAgain"
            type="password"
            size="lg"
            color="neutral"
            placeholder="Enter new password again"
            class="w-full"
          />
        </UFormField>
      </div>
    </div>

    <div class="flex justify-end space-x-2 pt-4">
      <UButton color="neutral" :loading="isSaving" @click="saveProfile">
        Change password
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  const toast = useToast()
  const { authClient } = useAuthClient()

  const isSaving = ref(false)
  const password = ref({
    old: "",
    new: "",
    newAgain: "",
  })

  async function saveProfile() {
    isSaving.value = true

    if (password.value.old && password.value.new && password.value.newAgain) {
      if (password.value.new !== password.value.newAgain) {
        toast.add({
          title: "Error",
          description: "New password and new password confirmation must be the same",
          color: "error",
          icon: 'i-hugeicons-cancel-circle',
          duration: 1500
        })

        return
      }

      await authClient.changePassword({
        currentPassword: password.value.old,
        newPassword: password.value.new,
      })
    }
    
    setTimeout(() => {
      isSaving.value = false
      
      toast.add({
        title: "Success",
        description: "Profile settings saved successfully",
        color: "success",
        icon: 'i-hugeicons-checkmark-circle-02',
        duration: 1500
      })
    }, 1000)
  }
</script>