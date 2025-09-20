export const useGlobalStore = defineStore('global', () => {
  const onboardingCompleted = ref(false)
  const projectStore = useProjectStore()

  function setOnboardingCompleted(payload: boolean): void {
    onboardingCompleted.value = payload
  }

  function clearStores() {
    projectStore.clearState()
  }

  return {
    onboardingCompleted,
    setOnboardingCompleted,
    clearStores,
  }
})
