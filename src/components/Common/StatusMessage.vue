<template>
  <div v-if="message" class="status-message" :class="messageType">
    <i :class="iconClass"></i>
    <span>{{ message }}</span>
    <el-button type="text" @click="clearMessage" class="close-btn">
      ✕
    </el-button>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'StatusMessage',
  setup() {
    const message = ref('')
    const type = ref('info')

    const messageType = computed(() => `message-${type.value}`)
    
    const iconClass = computed(() => {
      const icons = {
        success: 'el-icon-success',
        error: 'el-icon-error',
        warning: 'el-icon-warning',
        info: 'el-icon-info'
      }
      return icons[type.value] || icons.info
    })

    const clearMessage = () => {
      message.value = ''
    }

    const showMessage = (text, messageType = 'info') => {
      message.value = text
      type.value = messageType
    }

    return {
      message,
      messageType,
      iconClass,
      clearMessage,
      showMessage
    }
  }
}
</script>

<style scoped>
.status-message {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  margin-bottom: 20px;
  border-radius: 8px;
  font-size: 14px;
}

.message-success {
  background: #f0f9ff;
  border: 1px solid #67c23a;
  color: #67c23a;
}

.message-error {
  background: #fef0f0;
  border: 1px solid #f56c6c;
  color: #f56c6c;
}

.message-warning {
  background: #fdf6ec;
  border: 1px solid #e6a23c;
  color: #e6a23c;
}

.message-info {
  background: #f4f4f5;
  border: 1px solid #909399;
  color: #909399;
}

.close-btn {
  margin-left: auto;
  padding: 0 5px;
  color: inherit;
}
</style>