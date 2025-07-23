<template>
  <div class="form-section">
    <h2>🔍 角色詳細設定</h2>
    <el-form :model="character.detailedSettings" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="喜歡">
            <TextareaWithCopy
              v-model="character.detailedSettings.likes"
              placeholder="角色喜歡的事物"
              :rows="4"
              :max-length="50"
              @input="updateCharacter"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="不喜歡">
            <TextareaWithCopy
              v-model="character.detailedSettings.dislikes"
              placeholder="角色討厭的事物"
              :rows="4"
              :max-length="50"
              @input="updateCharacter"
            />
          </el-form-item>
        </el-col>
      </el-row>
      
      <div class="additional-settings">
        <h3>📋 附加資訊</h3>
        <div
          v-for="(item, index) in character.detailedSettings.additional"
          :key="index"
          class="additional-item"
        >
          <el-row :gutter="20">
            <el-col :span="24">
              <h4>{{ `附加資訊 ${index + 1}` }}</h4>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item :label="`標題`">
                <TextareaWithCopy
                  v-model="item.title"
                  placeholder="附加資訊標題"
                  :rows="1"
                  :max-length="30"
                  @input="updateCharacter"
                />
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item :label="`內容`">
                <TextareaWithCopy
                  v-model="item.content"
                  placeholder="附加資訊內容"
                  :rows="3"
                  :max-length="500"
                  @input="updateCharacter"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useCharacterStore } from '@/stores/character'
import TextareaWithCopy from '@/components/Common/TextareaWithCopy.vue'

export default {
  name: 'DetailedSettings',
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

.additional-settings {
  margin-top: 30px;
}

.additional-settings h3 {  
  margin-bottom: 20px;
  font-size: 1.4em;
  display: flex;
  align-items: center;
  gap: 10px;
}

.additional-item {
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(240, 248, 255, 0.5);
  border-radius: 8px;
  border: 1px solid #e1ecf4;
}

.additional-item h4 {
  color: #667eea;
  gap: 10px;
  margin-bottom: 20px;
}

.additional-item h4::before {
  content: "📋";
}

</style>