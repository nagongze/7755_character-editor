<template>
  <div class="form-section">
    <h2>⚙️ 角色基本設定</h2>
    <el-form :model="character.basicSettings" class="responsive-form" label-position="top">
      <el-form-item label="性別">
        <el-radio-group v-model="character.basicSettings.gender" @change="updateCharacter" class="gender-radio-group">
          <el-radio value="男">男</el-radio>
          <el-radio value="女">女</el-radio>
          <el-radio value="未設置">未設置</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="基本資訊">
        <TextareaWithCopy v-model="character.basicSettings.basicInfo" placeholder="角色的基本資訊，背景、家庭、MBTI、外表等" :rows="6"
          :max-length="1000" @input="updateCharacter" />
      </el-form-item>

      <el-form-item label="性格">
        <TextareaWithCopy v-model="character.basicSettings.personality" placeholder="角色的性格特徵" :rows="6"
          :max-length="1000" @input="updateCharacter" />
      </el-form-item>

      <el-form-item label="說話風格與習慣">
        <TextareaWithCopy v-model="character.basicSettings.speakingStyle" placeholder="角色的說話方式和風格，可輸入例句" :rows="6"
          :max-length="1000" @input="updateCharacter" />
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

<style lang="scss" scoped>
.form-section {
  @include form-section;
}
</style>
