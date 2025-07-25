<template>
  <div class="form-section">
    <h2>🔍 角色詳細設定</h2>
    <el-form :model="character.detailedSettings" class="responsive-form" label-position="top">
      <el-row :gutter="20">
        <el-col :xs=24 :span="12">
          <el-form-item label="喜歡">
            <TextareaWithCopy v-model="character.detailedSettings.likes" placeholder="角色喜歡的事物" :rows="3"
              :max-length="50" @input="updateCharacter" />
          </el-form-item>
        </el-col>
        <el-col :xs=24 :span="12">
          <el-form-item label="不喜歡">
            <TextareaWithCopy v-model="character.detailedSettings.dislikes" placeholder="角色討厭的事物" :rows="3"
              :max-length="50" @input="updateCharacter" />
          </el-form-item>
        </el-col>
      </el-row>

      <div class="additional-settings">
        <div class="section-header">
          <h3>📋 附加資訊</h3>
        </div>
        <div v-for="(item, index) in character.detailedSettings.additional" :key="index" class="additional-item">
          <div class="additional-header">
            <h4>{{ `附加資訊 ${index + 1}` }}</h4>
            <el-button type="danger" circle @click="removeAdditionalInfo(index)"
              :disabled="character.detailedSettings.additional.length <= 1">
              <el-icon>
                <Delete />
              </el-icon>
            </el-button>
          </div>
          <el-row :gutter="20">
            <el-col>
              <el-form-item :label="`標題`">
                <TextareaWithCopy v-model="item.title" placeholder="附加資訊標題" :rows="1" :max-length="30"
                  @input="updateCharacter" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col>
              <el-form-item :label="`內容`">
                <TextareaWithCopy v-model="item.content" placeholder="附加資訊內容" :rows="4" :max-length="500"
                  @input="updateCharacter" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="section-footer">
          <el-button type="primary" @click="addAdditionalInfo"
            :disabled="character.detailedSettings.additional.length >= 10" style="width: 80%;">
            <el-icon>
              <Plus />
            </el-icon>
            新增附加資訊
          </el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useCharacterStore } from '@/stores/character'
import { ElMessage } from 'element-plus'
import { Plus, Delete } from '@element-plus/icons-vue'
import TextareaWithCopy from '@/components/Common/TextareaWithCopy.vue'

export default {
  name: 'DetailedSettings',
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

    const addAdditionalInfo = () => {
      if (character.value.detailedSettings.additional.length >= 10) {
        ElMessage.warning('附加資訊最多只能有 10 筆')
        return
      }
      
      character.value.detailedSettings.additional.push({
        title: '',
        content: ''
      })
      updateCharacter()
      ElMessage.success('已新增附加資訊')
    }

    const removeAdditionalInfo = (index) => {
      if (character.value.detailedSettings.additional.length <= 1) {
        ElMessage.warning('至少需要保留一筆附加資訊')
        return
      }
      
      character.value.detailedSettings.additional.splice(index, 1)
      updateCharacter()
      ElMessage.success('已刪除附加資訊')
    }

    return {
      character,
      updateCharacter,
      addAdditionalInfo,
      removeAdditionalInfo
    }
  }
}
</script>

<style lang="scss" scoped>
.form-section {
  @include form-section;
}

</style>