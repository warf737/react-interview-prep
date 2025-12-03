<template>
  <div id="app">
    <header class="header">
      <h1>📚 Подготовка к собеседованию</h1>
      <p>Middle Frontend React Developer</p>
    </header>
    
    <div class="container">
      <div class="main-layout">
        <Sidebar
          :categories="questionsData"
          :active-category="activeCategory"
          :active-question-id="activeQuestionId"
          @select-category="handleCategorySelect"
          @select-question="handleQuestionSelect"
        />
        
        <div class="content-area">
          <div v-if="currentQuestion">
            <QuestionCard
              :question="currentQuestion"
              :question-number="currentQuestionIndex + 1"
            />
          </div>
          
          <div v-else class="empty-state">
            <h2>Выберите тему и вопрос</h2>
            <p>Используйте боковую панель для навигации</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Sidebar from './components/Sidebar.vue'
import QuestionCard from './components/QuestionCard.vue'
import { questionsData } from './data/questions.js'

const activeCategory = ref(null)
const activeQuestionId = ref(null)

const currentQuestion = computed(() => {
  if (!activeCategory.value || !activeQuestionId.value) {
    return null
  }
  
  const category = questionsData[activeCategory.value]
  if (!category) return null
  
  return category.questions.find(q => q.id === activeQuestionId.value) || null
})

const currentQuestionIndex = computed(() => {
  if (!activeCategory.value || !activeQuestionId.value) {
    return -1
  }
  
  const category = questionsData[activeCategory.value]
  if (!category) return -1
  
  return category.questions.findIndex(q => q.id === activeQuestionId.value)
})

const handleCategorySelect = (categoryKey) => {
  activeCategory.value = categoryKey
  // Автоматически выбираем первый вопрос категории
  const category = questionsData[categoryKey]
  if (category && category.questions.length > 0) {
    activeQuestionId.value = category.questions[0].id
  }
}

const handleQuestionSelect = (questionId) => {
  activeQuestionId.value = questionId
  // Прокрутка к верху при выборе вопроса
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

