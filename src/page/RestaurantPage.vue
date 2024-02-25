<template>
    <router-link to="/">
        <div id="return">Retour acceuil</div>
    </router-link>
    <div>
        <img :src="restaurant.image" alt="">
    </div>
    <p>{{ restaurant.name }}</p>
    <p>Note du restaurant : {{ restaurant.note }}</p>
    <p>Temps de livraison : {{ restaurant.drive_time }}</p>
</template>

<script>
import BDD from '../BDD.js'
import { useRoute } from 'vue-router'

export default {
name: 'RestaurantPage',
    setup() {
        const route = useRoute()
        const restaurant = BDD.find(restaurant => restaurant.name === route.params.name)

        return {
            restaurant
        }
    }
}
</script>

<style lang="scss" scoped>
    #return {
        margin: 25px 45px;
        font-weight: 400;
        cursor: pointer;

        &:hover {
            font-weight: 900;
        }
    }
</style>
