<template>
  <div class="flex flex-col w-full h-screen overflow-hidden">
    <TopBar exclude-project-selector />

    <div class="border-l border-neutral-200 w-full mt-[63px] overflow-auto">
      <slot />
    </div>
  </div>
</template>