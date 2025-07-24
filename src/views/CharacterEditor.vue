<template>
  <div class="character-editor">
    <div class="container">
      <h1>💖 7755遊戲角色檔案編輯器</h1>      

      <!-- 檔案控制 -->
      <div class="success-message">        
        <el-button type="primary" @click="$router.push('/')" plain>
          <el-icon><House /></el-icon> 返回首頁
        </el-button>        
        <FileControls />    
        <el-button type="info" @click="scrollToDetailedSettings">
          📋 快轉到附加資訊區
        </el-button>
        <el-button type="warning" @click="scrollToEvents">
          🎬 快轉到事件區
        </el-button>
      </div>

      <!-- 狀態訊息 -->
      <StatusMessage />

      <!-- 角色編輯表單 -->
      <div class="character-form">
        <PersonalInfo />
        <BasicSettings />
        <FirstChat />
        <DetailedSettings ref="detailedSettingsRef" />
        <Events ref="eventsRef" />
      </div>

      <!-- 載入動畫 -->
      <LoadingSpinner v-if="loading" />

      <div class="success-message">        
        <FileControls />       
        <el-button type="info" @click="scrollToTop" plain>
          🔝 回到頂端
        </el-button>
        <el-button type="primary" @click="$router.push('/')" plain>
          <el-icon><House /></el-icon>返回首頁
        </el-button>
        
            
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
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

    const detailedSettingsRef = ref(null)
    const eventsRef = ref(null)

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    const scrollToDetailedSettings = () => {
      if (detailedSettingsRef.value) {
        detailedSettingsRef.value.$el.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }

    const scrollToEvents = () => {
      if (eventsRef.value) {
        eventsRef.value.$el.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }

    return {
      isSignedIn,
      loading,
      testLogin,
      detailedSettingsRef,
      eventsRef,
      scrollToTop,
      scrollToDetailedSettings,
      scrollToEvents
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
  margin-bottom: 20px;
}
</style>