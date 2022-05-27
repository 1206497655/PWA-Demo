<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { onMounted, ref } from '@vue/runtime-core'
import HelloWorld from './components/HelloWorld.vue'
import ReloadPrompt from './ReloadPrompt.vue'

// 用户主动安装 PWA相关
const button = ref(null);
let deferredPrompt: any;

onMounted(() => {
  const buttonEl: any = button.value;
  buttonEl.style.display = 'none';
  window.addEventListener('beforeinstallprompt', (e) => {
  // 防止 Chrome 67 及更早版本自动显示安装提示
  e.preventDefault();
  // 稍后再触发此事件
  deferredPrompt = e;
  // 更新 UI 以提醒用户可以将 App 安装到桌面
  buttonEl.style.display = 'block';

  buttonEl.addEventListener('click', (e: Event) => {
    // 隐藏显示 A2HS 按钮的界面
    buttonEl.style.display = 'none';
    // 显示安装提示
    deferredPrompt.prompt();
    // 等待用户反馈
    deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
});
})
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <ReloadPrompt />
  <button class="reload-button" ref="button">安装</button>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.reload-button {
  position: fixed;
  right: 10px;
  top: 10px;
}
</style>
