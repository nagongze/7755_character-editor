<template>
  <div class="character-editor">
    <div class="container">
      <h1>🎮 遊戲角色檔案編輯器</h1>
      
      <!-- Google Drive 認證 -->
      <GoogleAuth />
      
      <!-- 檔案控制 -->
      <FileControls v-if="isSignedIn" />
      
      <!-- 狀態訊息 -->
      <StatusMessage />
      
      <!-- 角色編輯表單 -->
      <div class="character-form">
        <PersonalInfo />
        <BasicSettings />
        <FirstChat />
        <DetailedSettings />
        <Events />
      </div>
      
      <!-- 載入動畫 -->
      <LoadingSpinner v-if="loading" />
      
      <div class="success-message">
        <h3>🎉 角色編輯器完全載入成功！</h3>
        <p>所有組件都正常運行，您可以開始使用角色編輯器了。</p>        
        <el-button type="primary" @click="$router.push('/')">
          返回首頁
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import GoogleAuth from '@/components/GoogleDrive/GoogleAuth.vue'
import FileControls from '@/components/GoogleDrive/FileControls.vue'
import StatusMessage from '@/components/Common/StatusMessage.vue'
import LoadingSpinner from '@/components/Common/LoadingSpinner.vue'
import PersonalInfo from '@/components/Character/PersonalInfo.vue'
import BasicSettings from '@/components/Character/BasicSettings.vue'
import FirstChat from '@/components/Character/FirstChat.vue'
import DetailedSettings from '@/components/Character/DetailedSettings.vue'
import Events from '@/components/Character/Events.vue'
import { useGoogleAuth } from '@/composables/useGoogleAuth'

export default {
  name: 'CharacterEditor',
  components: {
    GoogleAuth,
    FileControls,
    StatusMessage,
    LoadingSpinner,
    PersonalInfo,
    BasicSettings,
    FirstChat,
    DetailedSettings,
    Events
  },
  setup() {
    const authStore = useAuthStore()
    const { signIn } = useGoogleAuth()
    
    const isSignedIn = computed(() => authStore.isSignedIn)
    const loading = computed(() => false)

    const testLogin = async () => {
      try {
        await signIn()
        authStore.setSignedIn(true)
      } catch (error) {
        console.error('登入測試失敗:', error)
      }
    }

    return {
      isSignedIn,
      loading,
      testLogin
    }
  }
}
</script>

<style scoped>
.character-editor {
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 2.5em;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.character-form {
  margin-top: 30px;
}

.success-message {
  text-align: center;
  margin-top: 30px;
  padding: 25px;
  background: linear-gradient(135deg, #67c23a 0%, #85ce61 100%);
  border-radius: 15px;
  color: white;
  box-shadow: 0 10px 25px rgba(103, 194, 58, 0.3);
}

.success-message h3 {
  margin-bottom: 15px;
  font-size: 1.5em;
}

.success-message p {
  margin-bottom: 20px;
  font-size: 1.1em;
  opacity: 0.9;
}

.success-message .el-button {
  margin: 0 10px;
}
</style>