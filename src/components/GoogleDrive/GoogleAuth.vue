<template>
  <div class="auth-section">
    <!-- 錯誤訊息 -->
    <div v-if="error" class="error-message">
      <p>❌ Google API 載入失敗: {{ error }}</p>
      <el-button type="warning" size="small" @click="retryInit">
        重新嘗試
      </el-button>
    </div>
    
    <!-- 未登入狀態 -->
    <div v-else-if="!isSignedIn">
      <p>請先登入 Google 帳號以存取 Drive 檔案</p>
      <el-button 
        type="primary" 
        :loading="!isInitialized"
        :disabled="!isInitialized"
        @click="handleSignIn"
        size="large"
      >
        <template #icon>
          <el-icon><User /></el-icon>
        </template>
        {{ !isInitialized ? '正在載入 Google API...' : '登入 Google Drive ' }}
      </el-button>
    </div>
    
    <!-- 已登入狀態 -->
    <div v-else class="signed-in">
      <div v-if="currentUser" class="user-info">
        <img :src="currentUser.picture" :alt="currentUser.name" class="user-avatar">
        <div class="user-details">
          <p><strong>{{ currentUser.name }}</strong></p>
          <p class="user-email">{{ currentUser.email }}</p>
        </div>
      </div>
      <p>✅ 已連接到 Google</p>
      <el-button type="info" @click="handleSignOut">
        🚪 登出
      </el-button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/auth'
import { useGoogleAuth } from '@/composables/useGoogleAuth'

export default {
  name: 'GoogleAuth',
  setup() {
    const authStore = useAuthStore()
    const { isSignedIn, isInitialized, error, currentUser, signIn, signOut } = useGoogleAuth()

    const handleSignIn = async () => {
      try {
        console.log('開始 Google 登入流程...')
        const result = await signIn()
        console.log('登入結果:', result)
        authStore.setSignedIn(true)
        ElMessage.success('登入成功！Google Drive 存取權限已取得')
      } catch (error) {
        console.error('登入失敗:', error)
        ElMessage.error('登入失敗: ' + error.message)
      }
    }

    const handleSignOut = async () => {
      try {
        await signOut()
        authStore.setSignedIn(false)
        ElMessage.info('已登出')
      } catch (error) {
        console.error('登出失敗:', error)
        ElMessage.error('登出失敗: ' + error.message)
      }
    }

    const retryInit = () => {
      window.location.reload()
    }

    return {
      isSignedIn: computed(() => authStore.isSignedIn || isSignedIn.value),
      isInitialized,
      error,
      currentUser,
      handleSignIn,
      handleSignOut,
      retryInit
    }
  }
}
</script>

<style scoped>
.auth-section {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  border: 2px solid #e9ecef;
}

.signed-in {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

p {
  margin-bottom: 15px;
  font-size: 16px;
  color: #666;
}

.error-message {
  background: #fef0f0;
  border: 1px solid #f56c6c;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
}

.error-message p {
  color: #f56c6c;
  margin-bottom: 10px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #e1ecf4;
}

.user-details p {
  margin: 0;
  line-height: 1.4;
}

.user-email {
  font-size: 14px;
  color: #999;
}
</style>