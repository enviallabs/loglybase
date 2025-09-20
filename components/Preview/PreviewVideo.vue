<template>
  <div class="aspect-video">
    <iframe 
      :src="embedUrl(props.src)" 
      class="w-full h-full rounded-2xl outline outline-offset-2 outline-neutral-300 dark:outline-zinc-800"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    props: {
      src: string
    }
  }>()

  function embedUrl(url: string) {
    if (!url) return ''
    
    const youtubeMatch = url
      .match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/)
      
    if (youtubeMatch && youtubeMatch[1]) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`
    }
    
    const vimeoMatch = url.match(/vimeo\.com\/(?:.*\/)?(?:videos\/)?([0-9]+)/)
    
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`
    }
    
    return url
  }
</script>
