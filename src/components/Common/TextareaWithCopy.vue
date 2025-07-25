<template>
  <div class="textarea-with-copy">
    <el-input
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      type="textarea"
      :placeholder="placeholder"
      :rows="rows"
      @input="$emit('input')"
      class="textarea-input"
    />
    <el-button
      v-if="modelValue && modelValue.trim()"
      type="info"
      class="copy-button"
      @click="copyToClipboard"
      :loading="copying"
      plain
    >
      <el-icon><CopyDocument /></el-icon>
    </el-button>
    <div v-if="showWordCount" class="word-count" :class="{ 'over-limit': isOverLimit }">
      {{ wordCount }}<span v-if="maxLength"> / {{ maxLength }}</span> 
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { CopyDocument } from '@element-plus/icons-vue'

export default {
  name: 'TextareaWithCopy',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    rows: {
      type: Number,
      default: 4
    },
    showWordCount: {
      type: Boolean,
      default: true
    },
    maxLength: {
      type: Number,
      default: null
    }
  },
  emits: ['update:modelValue', 'input'],
  components: {
    CopyDocument
  },
  setup(props) {
    const copying = ref(false)
    
    const wordCount = computed(() => {
      return props.modelValue ? props.modelValue.length : 0
    })
    
    const isOverLimit = computed(() => {
      return props.maxLength && wordCount.value > props.maxLength
    })

    const copyToClipboard = async () => {
      if (!props.modelValue || !props.modelValue.trim()) {
        ElMessage.warning('沒有內容可以複製')
        return
      }

      copying.value = true
      
      try {
        await navigator.clipboard.writeText(props.modelValue)
        ElMessage.success('內容已複製到剪貼簿')
      } catch (error) {
        // 備用方案：使用傳統的複製方法
        try {
          const textArea = document.createElement('textarea')
          textArea.value = props.modelValue
          textArea.style.position = 'fixed'
          textArea.style.left = '-999999px'
          textArea.style.top = '-999999px'
          document.body.appendChild(textArea)
          textArea.focus()
          textArea.select()
          
          const successful = document.execCommand('copy')
          document.body.removeChild(textArea)
          
          if (successful) {
            ElMessage.success('內容已複製到剪貼簿')
          } else {
            throw new Error('複製失敗')
          }
        } catch (fallbackError) {
          console.error('複製失敗:', fallbackError)
          ElMessage.error('複製失敗，請手動選取文字複製')
        }
      } finally {
        copying.value = false
      }
    }

    return {
      copying,
      copyToClipboard,
      wordCount,
      isOverLimit
    }
  }
}
</script>

<style scoped>
.textarea-with-copy {
  position: relative;
  width: 100%;
}

.copy-button {
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 10;
  opacity: 0.7;
  transition: opacity 0.3s;
  min-width: 32px;
  height: 28px;
  padding: 0;
  border-radius: 4px;
}

.copy-button:hover {
  opacity: 1;
}

.textarea-input {
  width: 100%;
}

.textarea-input :deep(.el-textarea__inner) {
  padding-right: 45px;
  padding-bottom: 30px;
}

.word-count {
  position: absolute;
  bottom: 1px;
  right: 1px;
  font-size: 12px;
  color: #909399;
  background: rgba(255, 255, 255, 0.9);
  padding: 2px 2px;
  border-radius: 3px;
  user-select: none;
  transition: color 0.3s;
}

.word-count.over-limit {
  color: #f56c6c;
  background: rgba(245, 108, 108, 0.1);
}
</style>