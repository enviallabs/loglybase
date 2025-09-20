<template>
  <div 
    ref="editorContainer"
    class="editor-container w-full min-h-[400px] p-4 border border-gray-200 rounded-2xl bg-white"
  >
    <draggable
      :list="localElements"
      item-key="id"
      handle=".drag-handle"
      animation="300"
      :group="{ name: 'blocks', put: true }"
      class="w-full space-y-2"
      @update="handleDraggableUpdate"
      @add="handleAdd"
      @end="handleDragEnd"
      @start="handleDragStart"
      @move="handleDragMove"
    >
      <template #item="{ element }">
        <div class="relative flex items-stretch border border-gray-200 rounded-xl overflow-hidden group">
          <div class="flex items-center px-2 bg-gray-50 text-gray-800 cursor-move drag-handle">
            <UIcon name="i-hugeicons-drag-drop-vertical" class="text-lg" />
          </div>
          
          <div class="flex-1">
            <DynamicComponent
              :type="element.type"
              :element-id="element.id"
              :content="element.props"
              @content-update="(newProps) => updateElementProps(element.id, newProps)"
            />
          </div>
          
          <div class="flex items-center px-2 bg-gray-50 sm:opacity-0 group-hover:opacity-100 transition-opacity">
            <UButton
              icon="i-hugeicons-delete-01"
              color="error"
              variant="ghost"
              size="xs"
              @click="removeElement(element.id)"
            />
          </div>
        </div>
      </template>
      
      <template #footer>
        <div
          v-if="localElements.length === 0"
          class="w-full p-8 text-center border-2 border-dashed border-gray-200 rounded-lg"
        >
          <p class="text-gray-400">Drag blocks here</p>
        </div>
      </template>
    </draggable>

    <AddElementMobile @add-element="handleMobileAdd($event)" />
  </div>
</template>

<script setup lang="ts">
  import draggable from 'vuedraggable'

  interface EditorElement {
    id: string
    type: string
    props: Record<string, any>
  }

  const props = defineProps<{
    content: EditorElement[]
  }>()

  const emit = defineEmits<{
    (e: 'contentUpdate', value: EditorElement[]): void
  }>()

  const editorContainer = ref<HTMLElement | null>(null)
  const localElements = ref<EditorElement[]>([])
  const isUpdating = ref(false)
  const lastAddedElementId = ref<string | null>(null)
  const scrollInterval = ref<number | null>(null)
  const isDragging = ref(false)

  watch(() => props.content, (newValue) => {
    if (!isUpdating.value && newValue) {
      localElements.value = JSON.parse(JSON.stringify(newValue))
    }
  }, { immediate: true, deep: true })

  watch(localElements, (newValue) => {
    if (!isUpdating.value && JSON.stringify(newValue) !== JSON.stringify(props.content)) {
      isUpdating.value = true

      nextTick(() => {
        emit('contentUpdate', JSON.parse(JSON.stringify(newValue)))

        setTimeout(() => {
          isUpdating.value = false
        }, 0)
      })
    }
  }, { deep: true })

  function handleDragStart() {
    isDragging.value = true

    document.addEventListener('dragover', handleDocumentDragOver)
  }

  function handleDragMove(event: any) {
    if (!isDragging.value) return
    
    const mouseY = event.originalEvent?.clientY || event.clientY || event.y

    if (mouseY !== undefined) {
      updateAutoScroll(mouseY)
    }
  }
  
  function handleDocumentDragOver(event: DragEvent) {
    if (!isDragging.value) {
      return
    }

    event.preventDefault()

    if (event.clientY !== undefined) {
      updateAutoScroll(event.clientY)
    }
  }
  
  function updateAutoScroll(mouseY: number) {
    const scrollZone = 80
    const maxScrollSpeed = 15
    const windowHeight = window.innerHeight
  
    let scrollSpeed = 0
  
    if (mouseY < scrollZone) {
      const distance = Math.max(0, scrollZone - mouseY)
      const intensity = Math.min(distance / scrollZone, 1)

      scrollSpeed = -Math.ceil(maxScrollSpeed * intensity)
    } else if (mouseY > windowHeight - scrollZone) {
      const distance = Math.max(0, mouseY - (windowHeight - scrollZone))
      const intensity = Math.min(distance / scrollZone, 1)

      scrollSpeed = Math.ceil(maxScrollSpeed * intensity)
    }
  
    if (scrollSpeed !== 0) {
      startAutoScroll(scrollSpeed)
    } else {
      stopAutoScroll()
    }
  }
  
  function startAutoScroll(speed: number) {
    stopAutoScroll()
  
    scrollInterval.value = window.setInterval(() => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      
      if (speed < 0 && currentScroll > 0) {
        window.scrollTo({
          top: Math.max(0, currentScroll + speed),
          behavior: 'auto'
        })
      } else if (speed > 0 && currentScroll < maxScroll) {
        window.scrollTo({
          top: Math.min(maxScroll, currentScroll + speed),
          behavior: 'auto'
        })
      }
    }, 16)
  }

  function stopAutoScroll() {
    if (scrollInterval.value) {
      clearInterval(scrollInterval.value)

      scrollInterval.value = null
    }
  }

  function handleDraggableUpdate() {
    emit('contentUpdate', JSON.parse(JSON.stringify(localElements.value)))
  }
  
  function handleAdd(event: any) {
    if (event.added && event.added.element && event.added.element.id) {
      lastAddedElementId.value = event.added.element.id
    }

    emit(
      'contentUpdate',
      JSON.parse(JSON.stringify(localElements.value))
    )
  }

  function handleDragEnd(event: any) {
    isDragging.value = false
    stopAutoScroll()

    document.removeEventListener('dragover', handleDocumentDragOver)

    if (!event.to.classList.contains('space-y-2')) {
      if (lastAddedElementId.value) {
        removeElement(lastAddedElementId.value)

        lastAddedElementId.value = null
      }
    }
  }

  function handleMobileAdd(element: any) {
    localElements.value.push(element)
    
    emit('contentUpdate', JSON.parse(JSON.stringify(localElements.value)))
  }

  function updateElementProps(id: string, newProps: Record<string, any>) {
    const index = localElements.value.findIndex(el => el.id === id)
    
    if (index !== -1) {
      const updatedElements = [...localElements.value]

      updatedElements[index] = {
        ...updatedElements[index],
        props: {
          ...updatedElements[index].props,
          ...newProps
        }
      }

      localElements.value = updatedElements
    }
  }

  function removeElement(id: string) {
    localElements.value = localElements.value.filter(el => el.id !== id)

    emit(
      'contentUpdate',
      JSON.parse(JSON.stringify(localElements.value))
    )
  }

  onUnmounted(() => {
    stopAutoScroll()

    document.removeEventListener('dragover', handleDocumentDragOver)
  })
</script>
