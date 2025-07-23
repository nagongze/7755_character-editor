/**
 * Google Drive API 服務
 * 處理檔案的建立、讀取、更新、刪除操作
 */

class GoogleDriveService {
  constructor() {
    this.accessToken = null
    this.isInitialized = false
  }

  /**
   * 初始化服務，設定存取權token
   */
  async initialize() {
    try {
      if (!window.gapi) {
        // 載入 gapi 客戶端
        await this.loadGapiClient()
      }

      // 載入 drive API
      await window.gapi.load('client', async () => {
        await window.gapi.client.load('drive', 'v3')
        this.isInitialized = true
        console.log('Google Drive API 服務初始化完成')
      })
    } catch (error) {
      console.error('Google Drive API 服務初始化失敗:', error)
      throw error
    }
  }

  /**
   * 載入 GAPI 客戶端
   */
  loadGapiClient() {
    return new Promise((resolve, reject) => {
      if (window.gapi) {
        resolve()
        return
      }

      const script = document.createElement('script')
      script.src = 'https://apis.google.com/js/api.js'
      script.onload = resolve
      script.onerror = reject
      document.head.appendChild(script)
    })
  }

  /**
   * 設定存取權token
   */
  setAccessToken(token) {
    this.accessToken = token
    console.log('設定 Google Drive access token:', token ? '已設定' : '未設定')
    if (window.gapi && window.gapi.client) {
      window.gapi.client.setToken({ access_token: token })
    }
  }

  /**
   * 取得或建立角色檔案資料夾
   */
  async getOrCreateCharacterFolder() {
    try {
      // 首先搜尋是否已存在角色編輯器資料夾
      const searchResponse = await fetch(
        `https://www.googleapis.com/drive/v3/files?q=name='角色編輯器' and mimeType='application/vnd.google-apps.folder'&fields=files(id,name)`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        }
      )

      const searchResult = await searchResponse.json()
      
      if (searchResult.files && searchResult.files.length > 0) {
        console.log('找到現有的角色編輯器資料夾:', searchResult.files[0].id)
        return searchResult.files[0].id
      }

      // 如果不存在，建立新資料夾
      console.log('建立新的角色編輯器資料夾...')
      const folderMetadata = {
        name: '角色編輯器',
        mimeType: 'application/vnd.google-apps.folder'
      }

      const createResponse = await fetch('https://www.googleapis.com/drive/v3/files', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(folderMetadata)
      })

      const folderResult = await createResponse.json()
      console.log('角色編輯器資料夾建立成功:', folderResult.id)
      return folderResult.id
    } catch (error) {
      console.error('取得資料夾失敗，將使用根目錄:', error)
      return null // 使用根目錄
    }
  }

  /**
   * 建立新檔案
   */
  async createFile(name, content) {
    try {
      console.log('開始建立檔案:', name)
      console.log('Access Token 狀態:', this.accessToken ? '已設定' : '未設定')
      
      if (!this.accessToken) {
        throw new Error('未設定 Google Drive 存取權限')
      }

      if (!this.isInitialized) {
        await this.initialize()
      }

      // 取得角色編輯器資料夾 ID
      const folderId = await this.getOrCreateCharacterFolder()

      const fileMetadata = {
        name: `${name}.json`,
        parents: folderId ? [folderId] : undefined // 如果有資料夾就使用，否則使用根目錄
      }

      const form = new FormData()
      form.append('metadata', new Blob([JSON.stringify(fileMetadata)], { type: 'application/json' }))
      form.append('file', new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' }))

      console.log('發送請求到 Google Drive API...')
      const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        },
        body: form
      })

      console.log('Google Drive API 回應狀態:', response.status, response.statusText)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('API 錯誤詳細:', errorText)
        throw new Error(`檔案建立失敗: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      console.log('檔案建立成功:', result)
      return result
    } catch (error) {
      console.error('建立檔案時發生錯誤:', error)
      throw error
    }
  }

  /**
   * 更新現有檔案
   */
  async updateFile(fileId, content) {
    try {
      if (!this.isInitialized) {
        await this.initialize()
      }

      const response = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(content, null, 2)
      })

      if (!response.ok) {
        throw new Error(`檔案更新失敗: ${response.statusText}`)
      }

      const result = await response.json()
      console.log('檔案更新成功:', result)
      return result
    } catch (error) {
      console.error('更新檔案時發生錯誤:', error)
      throw error
    }
  }

  /**
   * 讀取檔案內容
   */
  async getFile(fileId) {
    try {
      if (!this.isInitialized) {
        await this.initialize()
      }

      const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      })

      if (!response.ok) {
        throw new Error(`檔案讀取失敗: ${response.statusText}`)
      }

      const content = await response.json()
      console.log('檔案讀取成功')
      return content
    } catch (error) {
      console.error('讀取檔案時發生錯誤:', error)
      throw error
    }
  }

  /**
   * 列出所有角色檔案
   */
  async listFiles() {
    try {
      if (!this.isInitialized) {
        await this.initialize()
      }

      // 取得角色編輯器資料夾 ID
      const folderId = await this.getOrCreateCharacterFolder()
      
      let query = "name contains '.json' and mimeType='application/json'"
      if (folderId) {
        query = `parents in '${folderId}' and ${query}`
      }

      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,modifiedTime)`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        }
      )

      if (!response.ok) {
        throw new Error(`檔案列表取得失敗: ${response.statusText}`)
      }

      const result = await response.json()
      console.log('檔案列表取得成功:', result.files)
      return result.files || []
    } catch (error) {
      console.error('取得檔案列表時發生錯誤:', error)
      throw error
    }
  }

  /**
   * 刪除檔案
   */
  async deleteFile(fileId) {
    try {
      if (!this.isInitialized) {
        await this.initialize()
      }

      const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      })

      if (!response.ok) {
        throw new Error(`檔案刪除失敗: ${response.statusText}`)
      }

      console.log('檔案刪除成功')
      return true
    } catch (error) {
      console.error('刪除檔案時發生錯誤:', error)
      throw error
    }
  }
}

const googleDriveService = new GoogleDriveService()

// 將服務暴露到 window 對象，方便其他模組訪問
window.googleDriveService = googleDriveService

export default googleDriveService