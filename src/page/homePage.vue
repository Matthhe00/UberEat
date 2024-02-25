<template>
    <div class="home">
        <div class="header">
            <img src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg" alt="" class="src">
            <div class="wrapper--input">
                <input v-model="user_search_restaurant" type="text" placeholder="De quoi avez vous envie ?">
                    <div class="search">
                        <div v-for="(restaurant, i) in search_restaurant" :key="i" class="countainer--restaurant--search">
                            <router-link :to="{ name: 'restaurant', params: { name: restaurant.name }}">
                                <div class="wrapper--img">
                                    <img :src="restaurant.image" alt="">
                                </div>
                                <div class="nom">
                                    <p>{{ restaurant.name }}</p>
                                </div>
                            </router-link>
                        </div>
                    </div>
            </div>
        </div>
        <div class="bannier">
        </div>
        <RestaurantRow v-for="(data, i) in data_restaurant" :key="i" :three_restaurant="data"/>
    </div>
</template>

<script>
// IMPORTS
import BDD from '../BDD.js'
import { onMounted, ref, watch } from 'vue'
// COMPONENTS
import RestaurantRow from '../components/RestaurantRow'
export default {
    name: 'HomePage',
    components: {
        RestaurantRow
    },

    setup() {
        class Restaurant {
            constructor(name, note, image, drive_time) {
                this.name = name
                this.note = note
                this.image = image
                this.drive_time = drive_time

            }
        }

        let data_restaurant = ref([]);
        let all_restaurant = [];
        
        const makeDataRestaurant = () => {
            let three_restaurant = [];
            
            for (const restaurant of BDD) {
                const new_restaurant =  new Restaurant(restaurant.name, restaurant.note, restaurant.image, restaurant.drive_time)
                // tableau de tous les restaurants
                all_restaurant.push(new_restaurant)
                
                // tableau de 3 restaurants
                if(three_restaurant.length === 2) {
                    three_restaurant.push(new_restaurant)
                    data_restaurant.value.push(three_restaurant)
                    three_restaurant = []
                } else {
                    three_restaurant.push(new_restaurant)
                }
            }   
        }

        //user recherche restaurant
        let user_search_restaurant = ref('');
        let search_restaurant = ref([]);
        watch(user_search_restaurant, new_value => {

            let regex = RegExp(new_value.toLowerCase());
            
            let new_search_restaurant = all_restaurant.filter(restaurant => regex.test(restaurant.name.toLowerCase()));

            
            new_value == 0 ? search_restaurant.value = [] : search_restaurant.value = new_search_restaurant;
        })

        onMounted(makeDataRestaurant);

        // return
        return {
            data_restaurant,
            user_search_restaurant,
            search_restaurant,
        }
    }
}
</script>

<style lang="scss">
    .home {
        .header {
            height: 120px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            img {
                width: 200px;
            }
            .wrapper--input {
                position: relative;

                input {
                    background-color: #f6f6f6;
                    border: none;
                    height: 60px;
                    width: 400px;
                    outline: none;
                    padding-left: 20px;
                }

                .search {
                    position: absolute;
                    top: 100%;
                    width: 100%;
                    background-color: #fff;
                    border-radius: 30px;

                    .countainer--restaurant--search {
                        display: flex;
                        align-items: center;
                        padding: 10px;
                        &:hover {
                            background-color: #f6f6f6;
                            border-radius: 30px;
                        }
                        .wrapper--img{
                            width: 60px;
                            height: 60px;
                            margin-right: 25px;
                            border-radius: 50%;
                            overflow: hidden;
                            img {
                                width: auto;
                                height: 100%;
                            }
                        }
                        .nom {
                            margin-left: 80px;
                            position: relative;
                            top: -50px;
                            margin-bottom: -40px;
                        }
                    }
                }
            }
        }

        .bannier {
            height: 200px;
            width: 100%;
            background-image: url('https://www.ubermerchantstore.com/cdn/shop/products/VinylBanner-V1-Chinese_1445x.jpg?v=1649202951');
            background-size: cover;
            background-position: bottom center;
        }
    }
</style>