<template>
  <div class="form-section">
    <h2>⚙️ 角色基本設定</h2>
    <el-form :model="character.basicSettings" label-width="120px">
      <el-form-item label="性別">
        <el-radio-group 
          v-model="character.basicSettings.gender" 
          @change="updateCharacter"
          class="gender-radio-group"
        >
          <el-radio value="男">男</el-radio>
          <el-radio value="女">女</el-radio>
          <el-radio value="未設置">未設置</el-radio>
        </el-radio-group>
      </el-form-item>
      
      <el-form-item label="基本資訊">
        <TextareaWithCopy
          v-model="character.basicSettings.basicInfo"
          placeholder="角色的基本資訊，背景、家庭、MBTI、外表等"
          :rows="4"
          :max-length="700"
          @input="updateCharacter"
        />
      </el-form-item>
      
      <el-form-item label="性格">
        <TextareaWithCopy
          v-model="character.basicSettings.personality"
          placeholder="角色的性格特徵"
          :rows="4"
          :max-length="700"
          @input="updateCharacter"
        />
      </el-form-item>
      
      <el-form-item label="說話風格與習慣">
        <TextareaWithCopy
          v-model="character.basicSettings.speakingStyle"
          placeholder="角色的說話方式和風格，可輸入例句"
          :rows="4"
          :max-length="700"
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
  name: 'BasicSettings',
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

.gender-radio-group {
  display: flex;
  flex-direction: row;
  gap: 12px;
  flex-wrap: wrap;
}

.gender-radio-group .el-radio {
  margin-right: 0;
  margin-bottom: 0;
  padding: 8px 16px;
  border: 1px solid #e4e7ed;
  border-radius: 6px;
  transition: all 0.3s;
  flex: 0 0 auto;
}

.gender-radio-group .el-radio:hover {
  border-color: #c6e2ff;
  background-color: #f5f7fa;
}

.gender-radio-group .el-radio.is-checked {
  border-color: #409eff;
  background-color: #ecf5ff;
  color: #409eff;
}
</style>