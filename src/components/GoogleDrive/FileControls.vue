<template>
  <div class="file-controls">
    <div class="control-buttons">
      <!-- Google Drive 操作 -->
      <div class="button-group">
        <h4>☁️ 雲端操作</h4>
        <el-button 
          type="success" 
          @click="handleSave" 
          :loading="driveLoading"
          :disabled="!hasChanges"
        >
          💾 {{ currentFileId ? '儲存變更' : '儲存新檔案' }}
        </el-button>
        
        <el-button 
          type="primary" 
          @click="handleLoad" 
          :loading="driveLoading"
        >
          📂 載入檔案
        </el-button>
        
        <el-button 
          type="warning" 
          @click="handleNew"
          :disabled="driveLoading"
        >
          ✨ 新增角色
        </el-button>
      </div>

      <!-- 本地檔案操作 -->
      <div class="button-group">
        <h4>💻 本地檔案</h4>
        <el-button 
          type="info" 
          @click="handleExport"
          :loading="importExportLoading"
          :disabled="!currentFileName"
        >
          📥 匯出到電腦
        </el-button>
        
        <el-button 
          type="info" 
          @click="handleImport"
          :loading="importExportLoading"
        >
          📤 從電腦匯入
        </el-button>
      </div>
    </div>
    
    <div v-if="currentFileName" class="current-file">
      <span>📄 目前檔案: {{ currentFileName }}</span>
      <el-tag v-if="hasUnsavedChanges" type="warning" size="small">
        未儲存變更
      </el-tag>
      <el-tag v-else type="success" size="small">
        已儲存
      </el-tag>
    </div>

    <div v-if="driveError" class="error-message">
      <p>❌ {{ driveError }}</p>
    </div>

    <!-- 檔案列表對話框 -->
    <el-dialog v-model="showFileList" title="載入角色檔案" width="600px">
      <div v-if="driveLoading" class="loading-container">
        <el-icon class="is-loading"><Loading /></el-icon>
        <p>正在載入檔案列表...</p>
      </div>
      
      <div v-else-if="files.length === 0" class="empty-files">
        <p>尚未有任何角色檔案</p>
        <p>建立第一個角色檔案吧！</p>
      </div>
      
      <div v-else class="file-list">
        <div 
          v-for="file in files" 
          :key="file.id"
          class="file-item"
          @click="loadSelectedFile(file.id)"
        >
          <div class="file-info">
            <h4>{{ file.name }}</h4>
            <p>修改時間: {{ file.modifiedTime }}</p>
          </div>
          <el-button 
            type="danger" 
            size="small"
            @click.stop="deleteFile(file.id)"
            :loading="driveLoading"
          >
            🗑️
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Loading } from '@element-plus/icons-vue'
import { useCharacterStore } from '@/stores/character'
import { useGoogleDrive } from '@/composables/useGoogleDrive'
import { useFileImportExport } from '@/composables/useFileImportExport'

export default {
  name: 'FileControls',
  components: {
    Loading
  },
  setup() {
    const characterStore = useCharacterStore()
    const googleDrive = useGoogleDrive()
    const fileImportExport = useFileImportExport()
    const showFileList = ref(false)
    
    // 監聽 Google token 事件
    const handleTokenReady = (event) => {
      console.log('FileControls 接收到 google-token-ready 事件')
      const { accessToken } = event.detail
      console.log('接收到的 access token:', accessToken ? '已接收' : '未接收')
      googleDrive.setAccessToken(accessToken)
      console.log('Google Drive 存取權限已設定')
    }

    onMounted(() => {
      window.addEventListener('google-token-ready', handleTokenReady)
    })

    onUnmounted(() => {
      window.removeEventListener('google-token-ready', handleTokenReady)
    })

    // 計算屬性
    const currentFileName = computed(() => {
      const name = characterStore.characterName
      return name !== '未命名角色' ? `${name}.json` : null
    })

    const currentFileId = computed(() => characterStore.currentFileId)
    const hasUnsavedChanges = computed(() => characterStore.hasUnsavedChanges)
    const hasChanges = computed(() => 
      hasUnsavedChanges.value || 
      (characterStore.characterName !== '未命名角色' && !currentFileId.value)
    )

    // Google Drive 相關
    const files = computed(() => googleDrive.files.value)
    const driveLoading = computed(() => googleDrive.isLoading.value)
    const driveError = computed(() => googleDrive.error.value)
    const importExportLoading = computed(() => fileImportExport.isProcessing.value)

    // 處理存檔
    const handleSave = async () => {
      try {
        if (characterStore.characterName === '未命名角色' || !characterStore.character.personalInfo.name) {
          ElMessage.warning('請先填寫角色姓名再儲存')
          return
        }

        await googleDrive.saveCharacter()
        ElMessage.success('角色檔案儲存成功！')
      } catch (error) {
        ElMessage.error('儲存失敗: ' + error.message)
      }
    }

    // 處理載入檔案列表
    const handleLoad = async () => {
      try {
        showFileList.value = true
        await googleDrive.getFileList()
      } catch (error) {
        ElMessage.error('載入檔案列表失敗: ' + error.message)
        showFileList.value = false
      }
    }

    // 載入選中的檔案
    const loadSelectedFile = async (fileId) => {
      try {
        if (hasUnsavedChanges.value) {
          await ElMessageBox.confirm(
            '目前有未儲存的變更，確定要載入新檔案嗎？未儲存的變更將會遺失。',
            '確認載入',
            {
              confirmButtonText: '確定載入',
              cancelButtonText: '取消',
              type: 'warning'
            }
          )
        }

        await googleDrive.loadCharacter(fileId)
        showFileList.value = false
        ElMessage.success('角色檔案載入成功！')
      } catch (error) {
        if (error.message !== 'cancel') {
          ElMessage.error('載入失敗: ' + error.message)
        }
      }
    }

    // 處理新增檔案
    const handleNew = () => {
      const success = googleDrive.newCharacter()
      if (success) {
        ElMessage.info('已建立新的角色檔案')
      }
    }

    // 刪除檔案
    const deleteFile = async (fileId) => {
      try {
        await googleDrive.deleteCharacter(fileId)
        ElMessage.success('檔案刪除成功')
      } catch (error) {
        ElMessage.error('刪除失敗: ' + error.message)
      }
    }

    // 匯出角色到本地電腦
    const handleExport = () => {
      fileImportExport.exportCharacter()
    }

    // 從本地電腦匯入角色
    const handleImport = async () => {
      try {
        await fileImportExport.importCharacter()
      } catch (error) {
        if (error.message !== '使用者取消選擇檔案' && error.message !== '使用者取消匯入') {
          ElMessage.error('匯入失敗: ' + error.message)
        }
      }
    }

    return {
      // 狀態
      showFileList,
      currentFileName,
      currentFileId,
      hasUnsavedChanges,
      hasChanges,
      files,
      driveLoading,
      driveError,
      importExportLoading,
      
      // 方法
      handleSave,
      handleLoad,
      handleNew,
      loadSelectedFile,
      deleteFile,
      handleExport,
      handleImport
    }
  }
}
</script>

<style scoped>
.file-controls {
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(240, 248, 255, 0.8);
  border-radius: 10px;
  border: 2px solid #d4edda;
}

.control-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 15px;
}

@media (max-width: 768px) {
  .control-buttons {
    grid-template-columns: 1fr;
  }
}

.button-group {
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  padding: 15px;
  border: 1px solid #e4e7ed;
}

.button-group h4 {
  margin: 0 0 10px 0;
  color: #606266;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  border-bottom: 1px solid #e4e7ed;
  padding-bottom: 8px;
}

.button-group .el-button {
  width: 100%;
  margin-bottom: 8px;
}

.button-group .el-button:last-child {
  margin-bottom: 0;
}

.current-file {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 14px;
  color: #666;
}

.error-message {
  background: #fef0f0;
  border: 1px solid #f56c6c;
  border-radius: 8px;
  padding: 10px;
  margin-top: 15px;
}

.error-message p {
  color: #f56c6c;
  margin: 0;
  font-size: 14px;
}

.loading-container {
  text-align: center;
  padding: 40px;
}

.loading-container p {
  margin-top: 15px;
  color: #666;
}

.empty-files {
  text-align: center;
  padding: 40px;
  color: #999;
}

.empty-files p {
  margin: 5px 0;
}

.file-list {
  max-height: 400px;
  overflow-y: auto;
}

.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.file-item:hover {
  background: #f5f7fa;
  border-color: #c6e2ff;
}

.file-item:last-child {
  margin-bottom: 0;
}

.file-info h4 {
  margin: 0 0 5px 0;
  color: #303133;
  font-size: 16px;
}

.file-info p {
  margin: 0;
  color: #909399;
  font-size: 12px;
}
</style>