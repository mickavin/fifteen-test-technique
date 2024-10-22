<template>
    <label for="search-input" class="absolute-input" 
    :style="'background-color:'+$vuetify.theme.current.colors.background + 'CC'"
    >
        <v-text-field
        v-model="searchText"
        id="search-input"
        append-icon="fas fa-search"
        label="Rechercher par ID, Numéro de série"
        hide-details="auto"
        shaped
        ></v-text-field>
    </label>
</template>
<script lang="ts">
    export default {
        data: () => {
            return {
                searchText: ''
            }
        },
        watch: {
            'searchText': function(newVal, oldVal) {
                this.$emit('search-data', this.searchText)
            }
        }
    }
</script>
<style scoped>
.absolute-input {
    position: fixed;
    top: 10px;
    z-index: 99;
    max-width: 350px;
    min-width: 150px;
    width: 100%;
    padding-right: 15px;
    left: calc(50% - 150px);
}
</style>