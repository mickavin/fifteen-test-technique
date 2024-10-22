<template>
    <div class="add-btn">
        <v-btn
        class="mx-2"
        fab
        dark
        large
        icon
        @click="openModal"
        >
            <v-icon dark icon="fas fa-plus">
            </v-icon>
        </v-btn>
    </div>
</template>
<script lang="ts">
export default {
   methods: {
     openModal(){
        this.$emit('new-bike', {})
     }
   }
};
</script>
<style scoped>
    .add-btn {
        position: absolute;
        z-index: 99;
        top: 10px;
        right: 5px;
    }
</style>