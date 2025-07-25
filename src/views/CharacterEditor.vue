<template>
  <div class="character-editor">
    <div class="container">
      <div class="header">
        <h1><img :src="require('@/../public/logo.svg')" alt="Logo" class="logo" /> 7755遊戲角色檔案編輯器</h1>
        <div class="relate-link-group">
          <el-button type="text" class="personal-site-btn" @click="openPersonalSite" circle>
            <el-icon>
              <AiChatIcon />
            </el-icon>
          </el-button>
          <el-button type="text" class="github-btn" @click="openGithub" circle>
            <i class="el-icon">
              <GitHubIcon />
            </i>
          </el-button>
          <el-button type="text" class="report-btn" @click="openReportPage" circle>
            <i class="el-icon">
              <Flag />
            </i>
          </el-button>
        </div>
      </div>
      <!-- 檔案控制 -->
      <div class="success-message">
        <el-button type="primary" @click="$router.push('/')" plain>
          <el-icon>
            <House />
          </el-icon> 返回首頁
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
          <el-icon>
            <House />
          </el-icon>返回首頁
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
import GitHubIcon from '@/components/Common/GitHubIcon.vue'
import AiChatIcon from '@/components/Common/AiChatIcon.vue'

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
    Events,
    GitHubIcon,
    AiChatIcon
  },
  methods: {
    openPersonalSite() {
      window.open('https://wuguofish.github.io/lonely-chat-ai/', '_blank')
    },
    openGithub() {
      window.open('https://github.com/wuguofish/character-editor', '_blank')
    },
    openReportPage() {
      window.open('https://forms.gle/8svwv5X4YSUuxDqb7', '_blank')
    }
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
@import '@/assets/styles/common.scss';

.character-editor {
  padding: 20px;
}

.container {
  @extend .common-container;
}

h1 {
  @extend .page-title;
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

.github-btn {
  @extend .btn-github;
}

.report-btn {  
  @extend .btn-report;
}

.personal-site-btn {
  @extend .btn-personal-site;
}

.relate-link-group {
  @extend .relate-link-group;
}

/* 手機螢幕適配 */
@media (max-width: 768px) {
  .header {
    position: relative;
    text-align: center;
  }

  .success-message {
    padding: 5px;    
  }
}

</style>