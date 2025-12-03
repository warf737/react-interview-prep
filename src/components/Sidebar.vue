<template>
  <div class="sidebar">
    <h2>Темы</h2>
    <input
      v-model="searchQuery"
      type="text"
      class="search-box"
      placeholder="Поиск по вопросам..."
    />
    
    <ul class="category-list">
      <li 
        v-for="category in filteredCategories" 
        :key="category.key"
        class="category-item"
      >
        <a
          href="#"
          class="category-link"
          :class="{ active: activeCategory === category.key }"
          @click.prevent="$emit('select-category', category.key)"
        >
          {{ category.title }}
        </a>
        
        <ul 
          v-if="activeCategory === category.key" 
          class="topic-list"
        >
          <li 
            v-for="(question, index) in category.questions" 
            :key="question.id"
            class="topic-item"
          >
            <a
              href="#"
              class="topic-link"
              :class="{ active: activeQuestionId === question.id }"
              @click.prevent="$emit('select-question', question.id)"
            >
              {{ index + 1 }}. {{ question.question }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  categories: {
    type: Object,
    required: true
  },
  activeCategory: {
    type: String,
    default: null
  },
  activeQuestionId: {
    type: String,
    default: null
  }
})

defineEmits(['select-category', 'select-question'])

const searchQuery = ref('')

const filteredCategories = computed(() => {
  if (!searchQuery.value.trim()) {
    return Object.entries(props.categories).map(([key, data]) => ({
      key,
      ...data
    }))
  }
  
  const query = searchQuery.value.toLowerCase()
  const filtered = {}
  
  Object.entries(props.categories).forEach(([key, data]) => {
    const matchingQuestions = data.questions.filter(q => 
      q.question.toLowerCase().includes(query) ||
      q.answer.toLowerCase().includes(query)
    )
    
    if (matchingQuestions.length > 0) {
      filtered[key] = {
        ...data,
        questions: matchingQuestions
      }
    }
  })
  
  return Object.entries(filtered).map(([key, data]) => ({
    key,
    ...data
  }))
})
</script>

