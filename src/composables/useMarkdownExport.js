import { ref } from 'vue'
import { useCharacterStore } from '@/stores/character'
import { ElMessage } from 'element-plus'

export function useMarkdownExport() {
  const characterStore = useCharacterStore()
  const isProcessing = ref(false)

  /**
   * 將角色資料轉換為 Markdown 格式
   */
  const convertToMarkdown = (character) => {
    let markdown = ''

    // 標題
    const characterName = character.personalInfo.name || '未命名角色'
    markdown += `# 💖 ${characterName}\n\n`
    
    markdown += `> 由 7755遊戲角色檔案編輯器 生成\n\n`
    markdown += `---\n\n`

    // 個人資訊
    markdown += `## 👤 個人資訊\n\n`
    
    if (character.personalInfo.name) {
      markdown += `**角色姓名：** ${character.personalInfo.name}\n\n`
    }
    
    if (character.personalInfo.age) {
      markdown += `**年齡：** ${character.personalInfo.age}\n\n`
    }
    
    if (character.personalInfo.profession) {
      markdown += `**職業：** ${character.personalInfo.profession}\n\n`
    }
    
    if (character.personalInfo.quote) {
      markdown += `**角色名言：**\n> ${character.personalInfo.quote}\n\n`
    }
    
    if (character.personalInfo.description) {
      markdown += `**角色描述：**\n${character.personalInfo.description}\n\n`
    }
    
    if (character.personalInfo.tags && character.personalInfo.tags.length > 0) {
      markdown += `**標籤：** ${character.personalInfo.tags.join(', ')}\n\n`
    }

    markdown += `---\n\n`

    // 基本設定
    markdown += `## ⚙️ 基本設定\n\n`
    
    if (character.basicSettings.gender) {
      markdown += `**性別：** ${character.basicSettings.gender}\n\n`
    }
    
    if (character.basicSettings.basicInfo) {
      markdown += `**基本資訊：**\n${character.basicSettings.basicInfo}\n\n`
    }
    
    if (character.basicSettings.personality) {
      markdown += `**性格特徵：**\n${character.basicSettings.personality}\n\n`
    }
    
    if (character.basicSettings.speakingStyle) {
      markdown += `**說話風格：**\n${character.basicSettings.speakingStyle}\n\n`
    }

    markdown += `---\n\n`

    // 首次對話
    markdown += `## 💬 首次對話\n\n`
    
    if (character.firstChat.scenario) {
      markdown += `**對話情境：**\n${character.firstChat.scenario}\n\n`
    }
    
    if (character.firstChat.dialogue) {
      markdown += `**開場白：**\n${character.firstChat.dialogue}\n\n`
    }

    markdown += `---\n\n`

    // 詳細設定
    markdown += `## 🔍 角色詳細設定\n\n`
    
    if (character.detailedSettings.likes) {
      markdown += `**喜歡：**\n${character.detailedSettings.likes}\n\n`
    }
    
    if (character.detailedSettings.dislikes) {
      markdown += `**不喜歡：**\n${character.detailedSettings.dislikes}\n\n`
    }

    // 附加資訊
    if (character.detailedSettings.additional && character.detailedSettings.additional.length > 0) {
      markdown += `### 📋 附加資訊\n\n`
      
      character.detailedSettings.additional.forEach((item, index) => {
        if (item.title || item.content) {
          markdown += `#### 附加資訊 ${index + 1}\n\n`
          
          if (item.title) {
            markdown += `**標題：** ${item.title}\n\n`
          }
          
          if (item.content) {
            markdown += `**內容：**\n${item.content}\n\n`
          }
        }
      })
    }

    markdown += `---\n\n`

    // 重要事件
    if (character.events && character.events.length > 0) {
      markdown += `## 🎬 重要事件\n\n`
      
      character.events.forEach((event, index) => {
        if (event.title || event.timeAndPlace || event.content) {
          markdown += `### 🎭 事件 ${index + 1}\n\n`
          
          if (event.title) {
            markdown += `**事件標題：** ${event.title}\n\n`
          }
          
          if (event.timeAndPlace) {
            markdown += `**時間與地點：** ${event.timeAndPlace}\n\n`
          }
          
          if (event.content) {
            markdown += `**事件內容：**\n${event.content}\n\n`
          }
          
          markdown += `---\n\n`
        }
      })
    }

    // 結尾資訊
    markdown += `\n> 📅 匯出時間：${new Date().toLocaleString('zh-TW')}\n`
    markdown += `> 🔧 匯出工具：7755遊戲角色檔案編輯器\n`

    return markdown
  }

  /**
   * 匯出為 Markdown 檔案
   */
  const exportToMarkdown = () => {
    try {
      isProcessing.value = true

      const character = characterStore.character
      const characterName = character.personalInfo.name || '未命名角色'
      
      // 檢查是否有角色名稱
      if (characterName === '未命名角色') {
        ElMessage.warning('請先填寫角色姓名再匯出')
        return
      }

      // 轉換為 Markdown
      const markdownContent = convertToMarkdown(character)

      // 建立下載連結
      const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `${characterName}.md`
      
      // 觸發下載
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // 清理 URL
      URL.revokeObjectURL(url)
      
      ElMessage.success(`已匯出 ${characterName}.md 檔案`)
      
    } catch (error) {
      console.error('匯出 Markdown 失敗:', error)
      ElMessage.error('匯出失敗: ' + error.message)
    } finally {
      isProcessing.value = false
    }
  }

  return {
    isProcessing,
    exportToMarkdown
  }
}