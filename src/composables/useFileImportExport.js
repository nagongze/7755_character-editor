import { ref, readonly } from 'vue'
import { useCharacterStore } from '@/stores/character'
import { ElMessage } from 'element-plus'

export function useFileImportExport() {
  const characterStore = useCharacterStore()
  const isProcessing = ref(false)

  /**
   * 匯出角色資料為 JSON 檔案
   */
  const exportCharacter = () => {
    try {
      isProcessing.value = true
      
      const characterData = characterStore.character
      const characterName = characterData.personalInfo.name || '未命名角色'
      
      // 準備匯出資料，包含元資訊
      const exportData = {
        version: '1.0',
        exportTime: new Date().toISOString(),
        exportedBy: '角色編輯器',
        character: characterData
      }
      
      // 轉換為 JSON 字串
      const jsonString = JSON.stringify(exportData, null, 2)
      
      // 建立 Blob 物件
      const blob = new Blob([jsonString], { type: 'application/json' })
      
      // 建立下載連結
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${characterName}.json`
      
      // 觸發下載
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // 清理 URL
      URL.revokeObjectURL(url)
      
      console.log('角色檔案匯出成功:', characterName)
      ElMessage.success(`角色「${characterName}」已匯出到下載資料夾`)
      
      return true
    } catch (error) {
      console.error('匯出失敗:', error)
      ElMessage.error('匯出失敗: ' + error.message)
      return false
    } finally {
      isProcessing.value = false
    }
  }

  /**
   * 驗證匯入的檔案格式
   */
  const validateImportFile = (data) => {
    // 檢查是否是有效的 JSON
    if (typeof data !== 'object' || data === null) {
      throw new Error('檔案格式無效：不是有效的 JSON 格式')
    }

    // 檢查是否包含角色資料
    const characterData = data.character || data
    
    // 檢查必要的角色屬性
    const requiredFields = ['personalInfo', 'basicSettings', 'firstChat', 'detailedSettings', 'events']
    const missingFields = requiredFields.filter(field => !characterData[field])
    
    if (missingFields.length > 0) {
      throw new Error(`檔案格式不完整，缺少以下欄位：${missingFields.join(', ')}`)
    }

    // 檢查個人資料結構
    if (!characterData.personalInfo || typeof characterData.personalInfo !== 'object') {
      throw new Error('個人資料格式無效')
    }

    console.log('檔案驗證通過')
    return characterData
  }

  /**
   * 匯入角色資料從 JSON 檔案
   */
  const importCharacter = () => {
    return new Promise((resolve, reject) => {
      try {
        isProcessing.value = true
        
        // 建立檔案輸入元素
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = '.json'
        input.style.display = 'none'
        
        input.onchange = async (event) => {
          try {
            const file = event.target.files[0]
            if (!file) {
              reject(new Error('未選擇檔案'))
              return
            }

            console.log('開始讀取檔案:', file.name)
            
            // 檢查檔案類型
            if (!file.name.endsWith('.json')) {
              throw new Error('請選擇 JSON 格式的檔案')
            }

            // 檢查檔案大小 (限制 5MB)
            if (file.size > 5 * 1024 * 1024) {
              throw new Error('檔案太大，請選擇小於 5MB 的檔案')
            }

            // 讀取檔案內容
            const reader = new FileReader()
            reader.onload = (e) => {
              try {
                const jsonString = e.target.result
                const data = JSON.parse(jsonString)
                
                // 驗證檔案格式
                const characterData = validateImportFile(data)
                
                // 檢查是否有未儲存的變更
                if (characterStore.hasUnsavedChanges) {
                  const confirmed = confirm(
                    '目前有未儲存的變更，匯入新檔案將會覆蓋這些變更。\n確定要繼續嗎？'
                  )
                  if (!confirmed) {
                    reject(new Error('使用者取消匯入'))
                    return
                  }
                }

                // 更新角色資料
                characterStore.updateCharacter(characterData)
                characterStore.setCurrentFileId(null) // 清除當前檔案 ID，因為這是匯入的新資料
                
                const characterName = characterData.personalInfo.name || '未命名角色'
                console.log('角色檔案匯入成功:', characterName)
                ElMessage.success(`角色「${characterName}」匯入成功！`)
                
                resolve(characterData)
              } catch (parseError) {
                console.error('解析檔案失敗:', parseError)
                reject(new Error('檔案格式錯誤: ' + parseError.message))
              }
            }

            reader.onerror = () => {
              reject(new Error('檔案讀取失敗'))
            }

            reader.readAsText(file, 'utf-8')
            
          } catch (error) {
            reject(error)
          } finally {
            document.body.removeChild(input)
          }
        }

        input.oncancel = () => {
          document.body.removeChild(input)
          reject(new Error('使用者取消選擇檔案'))
        }

        // 觸發檔案選擇
        document.body.appendChild(input)
        input.click()
        
      } catch (error) {
        console.error('匯入失敗:', error)
        ElMessage.error('匯入失敗: ' + error.message)
        reject(error)
      } finally {
        isProcessing.value = false
      }
    })
  }

  /**
   * 批量匯出所有角色（從 Google Drive）
   */
  const exportAllCharacters = async (characters) => {
    try {
      isProcessing.value = true
      
      if (!characters || characters.length === 0) {
        ElMessage.warning('沒有角色資料可以匯出')
        return false
      }

      // 準備批量匯出資料
      const exportData = {
        version: '1.0',
        exportTime: new Date().toISOString(),
        exportedBy: '角色編輯器',
        type: 'batch_export',
        characterCount: characters.length,
        characters: characters
      }
      
      const jsonString = JSON.stringify(exportData, null, 2)
      const blob = new Blob([jsonString], { type: 'application/json' })
      
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `角色資料_批量匯出_${new Date().toISOString().split('T')[0]}.json`
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      ElMessage.success(`已匯出 ${characters.length} 個角色檔案`)
      return true
      
    } catch (error) {
      console.error('批量匯出失敗:', error)
      ElMessage.error('批量匯出失敗: ' + error.message)
      return false
    } finally {
      isProcessing.value = false
    }
  }

  return {
    isProcessing: readonly(isProcessing),
    exportCharacter,
    importCharacter,
    exportAllCharacters,
    validateImportFile
  }
}