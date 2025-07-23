<template>
  <div class="form-section">
    <h2>🎬 重要事件</h2>
    <el-form :model="character.events" label-width="120px">
      <div
        v-for="(event, index) in character.events"
        :key="index"
        class="event-item"
      >
        <h3>事件 {{ index + 1 }}</h3>
        <el-row :gutter="20">
          <el-col :span="12">
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
          <el-col :span="12">
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
  </div>
</template>

<script>
import { computed } from 'vue'
import { useCharacterStore } from '@/stores/character'
import TextareaWithCopy from '@/components/Common/TextareaWithCopy.vue'

export default {
  name: 'CharacterEvents',
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
</style>