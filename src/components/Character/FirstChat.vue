<template>
  <div class="form-section">
    <h2>💬 第一次聊天場景</h2>
    <el-form :model="character.firstChat" class="responsive-form">
      <el-form-item label="情境腳本">
        <TextareaWithCopy
          v-model="character.firstChat.scenario"
          placeholder="描述第一次對話的場景背景"
          :rows="4"
          :max-length="800"
          @input="updateCharacter"
        />
      </el-form-item>
      
      <el-form-item label="角色對話">
        <TextareaWithCopy
          v-model="character.firstChat.dialogue"
          placeholder="角色在第一次見面時的對話內容"
          :rows="6"
          :max-length="800"
          @input="updateCharacter"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useCharacterStore } from '@/stores/character'
import TextareaWithCopy from '@/components/Common/TextareaWithCopy.vue'

export default {
  name: 'FirstChat',
  components: {
    TextareaWithCopy
  },
  setup() {
    const characterStore = useCharacterStore()
    
    const character = computed(() => characterStore.character)
    
    const updateCharacter = () => {
      characterStore.markAsDirty()
    }

    return {
      character,
      updateCharacter
    }
  }
}
</script>

<style scoped>
.form-section {
  margin-bottom: 40px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.form-section h2 {
  color: #495057;
  margin-bottom: 20px;
  font-size: 1.8em;
  padding-bottom: 10px;
  border-bottom: 3px solid #667eea;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 響應式 label-width */
.responsive-form {
  --label-width: 120px;
}

.responsive-form :deep(.el-form-item__label) {
  width: var(--label-width) !important;
}

@media (max-width: 768px) {
  .responsive-form {
    --label-width: 100px;
  }
}

@media (max-width: 480px) {
  .responsive-form {
    --label-width: 80px;
  }
  
  .responsive-form :deep(.el-form-item__label) {
    font-size: 14px;
  }
}
</style>