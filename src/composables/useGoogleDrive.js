import { ref, computed } from 'vue'
import { useCharacterStore } from '@/stores/character'
import googleDriveService from '@/services/googleDriveService'

export function useGoogleDrive() {
  const characterStore = useCharacterStore()
  const files = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  /**
   * 設定存取權token（從 Google Auth 取得）
   */
  const setAccessToken = (token) => {
    googleDriveService.setAccessToken(token)
  }

  /**
   * 儲存角色檔案
   */
  const saveCharacter = async () => {
    isLoading.value = true
    error.value = null

    try {
      const characterData = characterStore.character
      const characterName = characterData.personalInfo.name || '未命名角色'

      if (characterStore.currentFileId) {
        // 更新現有檔案
        await googleDriveService.updateFile(characterStore.currentFileId, characterData)
      } else {
        // 建立新檔案
        const result = await googleDriveService.createFile(characterName, characterData)
        characterStore.setCurrentFileId(result.id)
      }

      characterStore.markAsSaved()
      console.log('角色檔案儲存成功')
      return true
    } catch (err) {
      console.error('儲存角色檔案失敗:', err)
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 載入角色檔案
   */
  const loadCharacter = async (fileId) => {
    isLoading.value = true
    error.value = null

    try {
      const characterData = await googleDriveService.getFile(fileId)
      characterStore.updateCharacter(characterData)
      characterStore.setCurrentFileId(fileId)
      console.log('角色檔案載入成功')
      return characterData
    } catch (err) {
      console.error('載入角色檔案失敗:', err)
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 建立新角色檔案
   */
  const newCharacter = () => {
    characterStore.resetCharacter()
    console.log('建立新角色檔案')
    return true
  }

  /**
   * 取得所有角色檔案列表
   */
  const getFileList = async () => {
    isLoading.value = true
    error.value = null

    try {
      const fileList = await googleDriveService.listFiles()
      files.value = fileList.map(file => ({
        id: file.id,
        name: file.name.replace('.json', ''),
        modifiedTime: new Date(file.modifiedTime).toLocaleString('zh-TW')
      }))
      console.log('檔案列表取得成功:', files.value)
      return files.value
    } catch (err) {
      console.error('取得檔案列表失敗:', err)
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 刪除角色檔案
   */
  const deleteCharacter = async (fileId) => {
    const confirmed = confirm('確定要刪除這個角色檔案嗎？此操作無法復原。')
    if (!confirmed) return false

    isLoading.value = true
    error.value = null

    try {
      await googleDriveService.deleteFile(fileId)
      
      // 如果刪除的是目前開啟的檔案，重置狀態
      if (characterStore.currentFileId === fileId) {
        characterStore.resetCharacter()
      }

      // 更新檔案列表
      await getFileList()
      console.log('角色檔案刪除成功')
      return true
    } catch (err) {
      console.error('刪除角色檔案失敗:', err)
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    files: computed(() => files.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    setAccessToken,
    saveCharacter,
    loadCharacter,
    newCharacter,
    getFileList,
    deleteCharacter
  }
}