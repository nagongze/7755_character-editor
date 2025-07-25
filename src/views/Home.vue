<template>
  <div class="home">
    <div class="container">
      <h1><img :src="require('@/../public/logo.svg')" alt="Logo" class="logo" /> 7755遊戲角色檔案編輯器</h1>
      <p class="description">
        一個專為卿卿我我角色設定而設計的編輯工具
        <br />支援 Google Drive 雲端儲存
      </p>

      <div class="features">
        <div class="feature-card">
          <h3>📝 完整角色設定</h3>
          <p>個人資料、基本設定、對話場景、詳細設定等</p>
        </div>
        <div class="feature-card">
          <h3>☁️ 雲端同步</h3>
          <p>透過 Google Drive 自動儲存與同步</p>
        </div>
        <div class="feature-card">
          <h3>🎨 本機檔案匯入/匯出</h3>
          <p>不想透過 Google Drive？我們支援本機檔案的匯入與匯出功能。</p>
        </div>
        <div class="feature-card">
          <h3>❤️ 聯絡作者</h3>
          <p>本網頁由
            <el-button type="text" class="personal-site-btn" @click="openPersonalSite">
              ✨阿童✨
            </el-button>
            維護。
          </p>
        </div>
      </div>
      <el-button type="primary" size="large" @click="$router.push('/editor')" class="start-button">
        開始編輯角色 →
      </el-button>
    </div>
    <div class="relate-link-group">      
        <el-button type="text" class="report-btn" @click="openReportPage">
          <el-icon>
            <Flag />
          </el-icon> 建議與回報
        </el-button>
        <el-button type="text" class="github-btn" @click="openGithub">
          <i class="el-icon">
            <GitHubIcon />
          </i> GitHub
        </el-button>      
    </div>
  </div>
</template>

<script>
import GitHubIcon from '@/components/Common/GitHubIcon.vue'

export default {
  name: 'HomeView',
  components: {
    GitHubIcon
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
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 20px;
}

.container {
  position: relative;  
  text-align: center;
  max-width: 800px;  
  background: rgba(248, 252, 255, 0.8);
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
}

.relate-link-group {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 800px;
}

h1 {
  font-size: 3em;
  color: #333;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.logo {
  width: 1.2em;
  height: 1.2em;
  vertical-align: middle;
}

.description {
  font-size: 1.2em;
  color: #793434;
  margin-bottom: 40px;
  line-height: 1.6;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
}

.feature-card h3 {
  color: #667eea;
  margin-bottom: 10px;
  font-size: 1.3em;
}

.feature-card p {
  color: #666;
  font-size: 0.9em;
  line-height: 1.5;
}

.start-button {
  font-size: 1.2em;
  padding: 15px 30px;
  border-radius: 25px;
}

.personal-site-btn {
  color: #667eea !important;
  font-weight: 500;
  transition: all 0.3s ease;
  margin-bottom: 5px;
}

.personal-site-btn:hover {
  color: #764ba2 !important;
  transform: translateY(2px);
}

.github-btn {
  color: #fff !important;
  font-size: 1.1em;
  font-weight: 500;
  transition: all 0.3s ease;
  background: rgba(51, 51, 51, 0.9);
  padding: 10px 20px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.github-btn:hover {
  color: #333 !important;
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.9) !important;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);  
}

.report-btn {
  color: #fff !important;
  font-size: 1.1em;
  font-weight: 500;
  transition: all 0.3s ease;
  background: rgba(200, 51, 51, 0.9);
  padding: 10px 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.report-btn:hover {
  color: #333 !important;
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.9) !important;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
</style>