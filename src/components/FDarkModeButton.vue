<template>
    <div class="dark-btn">
        <v-btn
        class="mx-2"
        fab
        dark
        large
        icon
        @click="toggleTheme"
        >
            <v-icon dark icon="fas fa-moon">
            </v-icon>
        </v-btn>
    </div>
</template>
<script lang="ts">
import { useTheme } from 'vuetify'
export default {
    setup () {
    const theme = useTheme()
    function changeStyle(){
        window.Mapbox.setStyle(`mapbox://styles/mapbox/${theme.global.current.value.dark ? 'streets' : 'dark'}-v11`);
    }
    return {
      theme,
      toggleTheme: () => {
            changeStyle()
            theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
        }
    }
  }
};
</script>
<style scoped>
    .dark-btn {
        position: absolute;
        z-index: 99;
        top: 10px;
        left: 5px;
    }
</style>