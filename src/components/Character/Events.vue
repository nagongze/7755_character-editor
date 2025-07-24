<template>
  <div class="form-section">
    <div class="section-header">
      <h2>🎬 重要事件</h2>      
    </div>
    <el-form :model="character.events" class="responsive-form">
      <div
        v-for="(event, index) in character.events"
        :key="index"
        class="event-item"
      >
        <div class="event-header">
          <h3>事件 {{ index + 1 }}</h3>
          <el-button 
            type="danger" 
            circle
            @click="removeEvent(index)"
            :disabled="character.events.length <= 1"
          >
          <el-icon><Delete /></el-icon>
          </el-button>
        </div>
        <el-row :gutter="20">
          <el-col :xs="24" :lg="12">
            <el-form-item label="事件標題">
              <TextareaWithCopy
                v-model="event.title"
                placeholder="事件的標題"
                :rows="1"
                :max-length="30"
                @input="updateCharacter"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24"  :lg="12">
            <el-form-item label="時間與地點">
              <TextareaWithCopy
                v-model="event.timeAndPlace"
                placeholder="事件發生的時間與地點"
                :rows="1"
                :max-length="30"
                @input="updateCharacter"
              />
            </el-form-item>
          </el-col>
        </el-row>        
        <el-form-item label="事件內容">
          <TextareaWithCopy
            v-model="event.content"
            placeholder="詳細描述這個重要事件"
            :rows="4"
            :max-length="2000"
            @input="updateCharacter"
          />
        </el-form-item>
      </div>
    </el-form>
    <div class="section-footer">
      <el-button 
        type="warning" 
        @click="addEvent"
        :disabled="character.events.length >= 20"
        style="width: 80%; "
      >
        <el-icon><Plus /></el-icon>
        新增事件
    </el-button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useCharacterStore } from '@/stores/character'
import { ElMessage } from 'element-plus'
import { Plus, Delete } from '@element-plus/icons-vue'
import TextareaWithCopy from '@/components/Common/TextareaWithCopy.vue'

export default {
  name: 'CharacterEvents',
  components: {
    TextareaWithCopy,
    Plus,
    Delete
  },
  setup() {
    const characterStore = useCharacterStore()
    
    const character = computed(() => characterStore.character)
    
    const updateCharacter = () => {
      characterStore.markAsDirty()
    }

    const addEvent = () => {
      if (character.value.events.length >= 20) {
        ElMessage.warning('事件最多只能有 20 筆')
        return
      }
      
      character.value.events.push({
        title: '',
        timeAndPlace: '',
        content: ''
      })
      updateCharacter()
      ElMessage.success('已新增事件')
    }

    const removeEvent = (index) => {
      if (character.value.events.length <= 1) {
        ElMessage.warning('至少需要保留一筆事件')
        return
      }
      
      character.value.events.splice(index, 1)
      updateCharacter()
      ElMessage.success('已刪除事件')
    }

    return {
      character,
      updateCharacter,
      addEvent,
      removeEvent
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

.event-item {
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(255, 248, 240, 0.7);
  border-radius: 10px;
  border: 1px solid #ffe4b5;
}

.event-item h3 {
  color: #e6a23c;
  margin-bottom: 15px;
  font-size: 1.3em;
  display: flex;
  align-items: center;
  gap: 8px;
}

.event-item h3::before {
  content: "🎭";
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h2 {
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 3px solid #667eea;
  display: flex;
  align-items: center;
  gap: 10px;
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.event-header h3 {
  margin: 0;
}

.section-footer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
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