<template>
    <div>
        <h2>
            Bienvenu chez {{ restaurant.name }} <br>
            {{ restaurant.note }}
        </h2>
    </div>
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

<style>

</style>