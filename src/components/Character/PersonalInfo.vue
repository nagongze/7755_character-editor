<template>
  <div class="form-section">
    <h2>👤 個人資料</h2>
    <el-form :model="character.personalInfo" label-width="125px">
      <el-row :gutter="20">
        <el-col :xs=24 :sm=24 :lg="8">
          <el-form-item label="姓名">
            <TextareaWithCopy
              v-model="character.personalInfo.name"
              placeholder="角色的姓名"
              :rows="2"
              :max-length="15"
              @input="updateCharacter"
            />
          </el-form-item>
        </el-col>
        <el-col :xs=24 :sm=10 :lg="8">
          <el-form-item label="年齡">
            <TextareaWithCopy
              v-model="character.personalInfo.age"
              placeholder="角色的年齡"
              :rows="2"
              :max-length="15"
              @input="updateCharacter"
            />
          </el-form-item>
        </el-col>
        <el-col :xs=24 :sm=14 :lg="8">
          <el-form-item label="職業">
            <TextareaWithCopy
              v-model="character.personalInfo.profession"
              placeholder="角色的職業"
              :rows="2"
              :max-length="15"
              @input="updateCharacter"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="來自角色的一句話">
            <TextareaWithCopy
              v-model="character.personalInfo.quote"
              placeholder="角色的經典台詞或口頭禪"
              :rows="2"
              :max-length="80"
              @input="updateCharacter"
            />
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-form-item label="敘述">
        <TextareaWithCopy
          v-model="character.personalInfo.description"
          placeholder="角色的詳細描述"
          :rows="4"
          :max-length="700"
          @input="updateCharacter"
        />
      </el-form-item>
      
      <el-form-item label="標籤">
        <el-input-tag
          v-model="character.personalInfo.tags"
          placeholder="角色的特徵標籤"
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
  name: 'PersonalInfo',
  components: {
    TextareaWithCopy,
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
</style>