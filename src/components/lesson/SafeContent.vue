// src/components/SafeContent.vue
<template>
  <div>
    <p v-for="(paragraph, index) in paragraphs" :key="index" v-html="paragraph"></p>
    <section v-for="(section, index) in sections" :key="index">
      <h2>{{ section.title }}</h2>
      <p v-for="(content, idx) in section.contents" :key="idx" v-html="content"></p>
      <ul v-if="section.list">
        <li v-for="(item, idx) in section.list" :key="idx">{{ item }}</li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  computed: {
    paragraphs() {
      return this.content.paragraphs || [];
    },
    sections() {
      return this.content.sections || [];
    }
  }
}
</script>