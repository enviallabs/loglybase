<template>
  <ClientOnly>
    <div class="flex items-center justify-center px-6 py-6">
      <div class="container mx-auto max-w-4xl 2xl:max-w-[70%] space-y-8">
        <SettingsNavigation class="overflow-auto" />

        <div class="space-y-12">
          <PageHeading
            title="API Settings"
            description="Manage your API keys and access tokens"
          />
          
          <div class="space-y-6">
            <APIManage />
            <APIDocumentation />
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
</script>