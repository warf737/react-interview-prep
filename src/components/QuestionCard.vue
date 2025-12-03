<template>
  <div class="question-card">
    <div 
      class="question-header" 
      @click="toggleExpanded"
    >
      <span class="question-number">{{ questionNumber }}</span>
      <span class="question-title">{{ question.question }}</span>
      <span 
        class="toggle-icon" 
        :class="{ expanded: isExpanded }"
      >
        ▼
      </span>
    </div>
    
    <div v-if="isExpanded" class="answer-content">
      <div 
        class="answer-text" 
        v-html="question.answer"
      ></div>
      
      <CodeEditor 
        v-if="question.code" 
        :initial-code="question.code"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CodeEditor from './CodeEditor.vue'

const props = defineProps({
  question: {
    type: Object,
    required: true
  },
  questionNumber: {
    type: Number,
    required: true
  }
})

const isExpanded = ref(false)

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}
</script>

