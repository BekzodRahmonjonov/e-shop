<template>
    <div class="header">
        <q-header reveal elevated class="bg-light-blue-6 text-white header__root">
            <span @click="$router.push('/')" class="header__title">
                E-Shop
            </span>
            <ul class="header__list">
                <li @click="$router.push('/')">Home</li>
                <li @click="$router.push('/admin')">Admin</li>
                <li @click="$router.push('/blog')">Blog</li>
                <li @click="$router.push('/contact')">Contact</li>
            </ul>
            <q-icon 
                @click="$router.push('/basket')"
                name="shopping_cart"
                class="basket-icon"
            />
        </q-header>
    </div>
</template>

<script>
export default {
    data () {
        return {
            left: false
        }
    },
    mounted() {
    }
}
</script>

<style lang="scss" scoped>
.header {
    &__root {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
    }
    &__title {
        font-size: 24px;
        font-weight: 700;
        cursor: pointer;
    }
    &__list {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        li {
            list-style: none;
            margin: 0 10px;
            padding: 0 10px;
            font-size: 16px;
            font-weight: 500;
            color: #fff;
            cursor: pointer;
        }
    }
    .basket-icon {
        font-size: 24px;
        cursor: pointer;;
    }
}
</style>