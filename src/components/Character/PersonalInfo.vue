<template>
  <div class="form-section">
    <h2>👤 個人資料</h2>
    <el-form :model="character.personalInfo" class="responsive-form" label-position="top">
      <el-row :gutter="20">
        <el-col :xs=24 :sm=24 :lg="8">
          <el-form-item label="姓名">
            <TextareaWithCopy v-model="character.personalInfo.name" placeholder="角色的姓名" :rows="1" :max-length="20"
              @input="updateCharacter" />
          </el-form-item>
        </el-col>
        <el-col :xs=24 :sm=10 :lg="8">
          <el-form-item label="年齡">
            <TextareaWithCopy v-model="character.personalInfo.age" placeholder="角色的年齡" :rows="1" :max-length="20"
              @input="updateCharacter" />
          </el-form-item>
        </el-col>
        <el-col :xs=24 :sm=14 :lg="8">
          <el-form-item label="職業">
            <TextareaWithCopy v-model="character.personalInfo.profession" placeholder="角色的職業" :rows="1" :max-length="20"
              @input="updateCharacter" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="來自角色的一句話">
            <TextareaWithCopy v-model="character.personalInfo.quote" placeholder="角色的經典台詞或口頭禪" :rows="2"
              :max-length="100" @input="updateCharacter" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="敘述">
        <TextareaWithCopy v-model="character.personalInfo.description" placeholder="角色的詳細描述" :rows="5" :max-length="1000"
          @input="updateCharacter" />
      </el-form-item>

      <el-form-item label="標籤">
        <el-input-tag v-model="character.personalInfo.tags" placeholder="角色的特徵標籤" />
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

<style lang="scss" scoped>
.form-section {
  @include form-section;
}

.responsive-form {
  @extend .responsive-form;
  
  &.responsive-form--personal {
    --label-width: 125px;
  }
}
</style>
