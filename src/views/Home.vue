<template>
  <div class="home">
    <div class="container">
      <h1>🎮 遊戲角色檔案編輯器</h1>
      <p class="description">
        一個專為遊戲角色設定而設計的編輯工具，支援 Google Drive 雲端儲存
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
          <h3>🎨 現代化介面</h3>
          <p>直觀易用的操作介面</p>
        </div>
      </div>
      
      <el-button 
        type="primary" 
        size="large" 
        @click="$router.push('/editor')"
        class="start-button"
      >
        開始編輯角色 →
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.container {
  text-align: center;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
}

h1 {
  font-size: 3em;
  color: #333;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.description {
  font-size: 1.2em;
  color: #666;
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
  background: rgba(255, 255, 255, 0.8);
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
</style>