<template>
  <div class="input-tag">
    <el-tag
      v-for="tag in tags"
      :key="tag"
      closable
      @close="removeTag(tag)"
      class="tag-item"
    >
      {{ tag }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      ref="inputRef"
      v-model="inputValue"
      size="small"
      class="tag-input"
      @keyup.enter="confirmInput"
      @blur="confirmInput"
      @keyup.esc="cancelInput"
      placeholder="輸入標籤"
    />
    <el-button
      v-else
      size="small"
      type="primary"
      plain
      @click="showInput"
      class="add-tag-button"
    >
      + 新增標籤
    </el-button>
  </div>
</template>

<script>
import { ref, computed, nextTick } from 'vue'

export default {
  name: 'InputTag',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '輸入標籤'
    }
  },
  emits: ['update:modelValue', 'input'],
  setup(props, { emit }) {
    const inputVisible = ref(false)
    const inputValue = ref('')
    const inputRef = ref(null)

    const tags = computed(() => {
      if (!props.modelValue || !props.modelValue.trim()) {
        return []
      }
      return props.modelValue.split(',').map(tag => tag.trim()).filter(tag => tag)
    })

    const updateValue = (newTags) => {
      const newValue = newTags.join(', ')
      emit('update:modelValue', newValue)
      emit('input')
    }

    const removeTag = (tagToRemove) => {
      const newTags = tags.value.filter(tag => tag !== tagToRemove)
      updateValue(newTags)
    }

    const showInput = () => {
      inputVisible.value = true
      nextTick(() => {
        inputRef.value?.focus()
      })
    }

    const confirmInput = () => {
      const value = inputValue.value.trim()
      if (value && !tags.value.includes(value)) {
        const newTags = [...tags.value, value]
        updateValue(newTags)
      }
      inputValue.value = ''
      inputVisible.value = false
    }

    const cancelInput = () => {
      inputValue.value = ''
      inputVisible.value = false
    }

    return {
      tags,
      inputVisible,
      inputValue,
      inputRef,
      removeTag,
      showInput,
      confirmInput,
      cancelInput
    }
  }
}
</script>

<style scoped>
.input-tag {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  min-height: 32px;
  padding: 4px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: #fff;
  transition: border-color 0.3s;
}

.input-tag:hover {
  border-color: #c0c4cc;
}

.input-tag:focus-within {
  border-color: #409eff;
}

.tag-item {
  margin: 0;
}

.tag-input {
  width: 120px;
  margin: 0;
}

.tag-input :deep(.el-input__wrapper) {
  box-shadow: none;
  padding: 0 4px;
}

.add-tag-button {
  height: 24px;
  padding: 0 8px;
  font-size: 12px;
}
</style>