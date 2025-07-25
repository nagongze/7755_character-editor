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
@import '@/assets/styles/common.scss';
.form-section {
  @extend .form-section;
}

.responsive-form {
  @extend .responsive-form;
}
</style>