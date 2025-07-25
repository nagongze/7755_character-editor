import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// 載入 Element Plus 樣式
import 'element-plus/dist/index.css'
// 載入 Google Drive 服務，確保它在應用程式開始時就可用
import './services/googleDriveService'

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')
