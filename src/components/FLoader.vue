<template>
    <div class="center" :style="'background-color:' + $vuetify.theme.current.colors.surface">
        <img class="pulse-loader" src="../assets/fifteen-logo-text.svg"/>
    </div>
</template>
<style scoped>
.center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
.pulse-loader {
  width: 128px;
  height: 128px;
  display: flex;
}

.pulse-loader {
  animation: pulse-loader 2s ease-out infinite;
}

.pulse-loader div:nth-child(2) {
  animation-delay: -0.5s;
}

@keyframes pulse-loader {
  0% {
    top: 64px;
    left: 64px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0;
    left: 0;
    width: 128px;
    height: 128px;
    opacity: 0;
  }
}
</style>