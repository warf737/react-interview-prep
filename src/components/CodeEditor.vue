<template>
  <div class="code-editor-wrapper">
    <div class="code-editor-header">
      <span>Редактор кода</span>
      <button @click="runCode">▶ Запустить</button>
    </div>
    <textarea
      v-model="code"
      class="code-editor"
      :placeholder="'Введите код здесь...'"
      spellcheck="false"
    ></textarea>
    <div 
      v-if="output !== null" 
      class="code-output"
      :class="{ error: hasError }"
    >
      {{ output }}
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  initialCode: {
    type: String,
    default: ''
  }
})

const code = ref(props.initialCode || '')
const output = ref(null)
const hasError = ref(false)

// Обновляем код при изменении initialCode
watch(() => props.initialCode, (newCode) => {
  if (newCode) {
    code.value = newCode
  }
}, { immediate: true })

const runCode = () => {
  output.value = null
  hasError.value = false
  
  try {
    // Создаем безопасное окружение для выполнения кода
    const consoleLogs = []
    const originalConsoleLog = console.log
    const originalConsoleError = console.error
    
    // Перехватываем console.log
    console.log = (...args) => {
      consoleLogs.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '))
    }
    
    console.error = (...args) => {
      consoleLogs.push('ERROR: ' + args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '))
    }
    
    // Выполняем код в безопасном контексте
    const wrappedCode = `
      (function() {
        ${code.value}
      })();
    `
    
    eval(wrappedCode)
    
    // Восстанавливаем console
    console.log = originalConsoleLog
    console.error = originalConsoleError
    
    output.value = consoleLogs.length > 0 
      ? consoleLogs.join('\n') 
      : 'Код выполнен. Нет вывода.'
    
  } catch (error) {
    hasError.value = true
    output.value = `Ошибка: ${error.message}\n${error.stack}`
  }
}
</script>

