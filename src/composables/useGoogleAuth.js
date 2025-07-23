import { ref, onMounted, readonly } from 'vue'
import { GOOGLE_CONFIG } from '@/utils/constants'

export function useGoogleAuth() {
  const isSignedIn = ref(false)
  const isInitialized = ref(false)
  const error = ref(null)
  const currentUser = ref(null)

  const initializeGoogleIdentity = () => {
    try {
      console.log('開始初始化 Google Identity Services...')
      
      // 初始化 Google Identity Services
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CONFIG.CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true
      })

      console.log('Google Identity Services 初始化完成')
      isInitialized.value = true
    } catch (err) {
      console.error('Google Identity Services 初始化失敗:', err)
      error.value = err.message || '初始化失敗'
      isInitialized.value = true
    }
  }

  const handleCredentialResponse = (response) => {
    try {
      console.log('收到 Google 認證回應:', response)
      
      // 解析 JWT token - 修復 base64 解碼問題
      const token = response.credential
      const base64Url = token.split('.')[1]
      
      // 修復 base64 padding
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const padLength = 4 - (base64.length % 4)
      if (padLength !== 4) {
        base64 += '='.repeat(padLength)
      }
      
      // 使用 TextDecoder 正確處理 UTF-8 編碼
      const binaryString = atob(base64)
      const bytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }
      const decoder = new TextDecoder('utf-8')
      const decodedString = decoder.decode(bytes)
      
      const payload = JSON.parse(decodedString)
      console.log('用戶資訊:', payload)
      
      currentUser.value = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture
      }
      
      isSignedIn.value = true
      console.log('Google 登入成功')
    } catch (err) {
      console.error('處理認證回應失敗:', err)
      error.value = '登入處理失敗'
      
      // 備用方案：即使解析失敗，也標記為已登入
      isSignedIn.value = true
      currentUser.value = {
        name: '用戶',
        email: '已登入',
        picture: ''
      }
    }
  }

  const signIn = async () => {
    try {
      if (!window.google?.accounts?.id) {
        throw new Error('Google Identity Services 尚未初始化')
      }
      
      console.log('開始 Google 登入流程...')
      
      // 使用 OAuth 2.0 流程來獲取 access token
      return new Promise((resolve, reject) => {
        window.google.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CONFIG.CLIENT_ID,
          scope: GOOGLE_CONFIG.SCOPES,
          callback: (response) => {
            if (response.error) {
              console.error('OAuth 登入失敗:', response.error)
              reject(new Error(response.error))
              return
            }
            
            console.log('OAuth 登入成功，取得 access token')
            
            // 直接設定到 Google Drive 服務
            if (window.googleDriveService) {
              window.googleDriveService.setAccessToken(response.access_token)
              console.log('直接設定 access token 到 Google Drive 服務')
            }
            
            // 同時發出事件通知 access token 已準備好
            const tokenEvent = new CustomEvent('google-token-ready', { 
              detail: { accessToken: response.access_token }
            })
            console.log('發送 google-token-ready 事件，token:', response.access_token)
            window.dispatchEvent(tokenEvent)
            
            resolve(response)
          }
        }).requestAccessToken()
      })
    } catch (err) {
      console.error('Google 登入失敗:', err)
      throw err
    }
  }

  const signOut = async () => {
    try {
      console.log('開始登出...')
      
      if (window.google?.accounts?.id) {
        window.google.accounts.id.disableAutoSelect()
      }
      
      currentUser.value = null
      isSignedIn.value = false
      console.log('登出成功')
    } catch (err) {
      console.error('登出失敗:', err)
      throw err
    }
  }

  onMounted(() => {
    console.log('開始載入 Google Identity Services...')
    
    if (!window.google?.accounts?.id) {
      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.onload = () => {
        console.log('Google Identity Services 腳本載入完成')
        initializeGoogleIdentity()
      }
      script.onerror = (err) => {
        console.error('Google Identity Services 腳本載入失敗:', err)
        error.value = 'Google Identity Services 腳本載入失敗'
        isInitialized.value = true
      }
      document.head.appendChild(script)
    } else {
      console.log('Google Identity Services 已存在，直接初始化')
      initializeGoogleIdentity()
    }
  })

  return {
    isSignedIn: readonly(isSignedIn),
    isInitialized: readonly(isInitialized),
    error: readonly(error),
    currentUser: readonly(currentUser),
    signIn,
    signOut
  }
}