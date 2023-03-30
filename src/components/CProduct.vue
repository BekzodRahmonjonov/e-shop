<template>
    <div class="card">
        <figure>
            <img :src="image" alt="Product">
        </figure>
        <section class="details">
            <div class="min-details">
                <div>
                    <h6>{{ product.name_uz }}</h6>
                    <h6>{{ product.address }}</h6>
                </div>
                <h6 class="price">${{ product.cost }}</h6>
            </div>
            <div class="min-details__bottom">
                <a href="#" class="btn">add to cart</a>
                <q-icon 
                    name="favorite" 
                    class="text-red like-icon"
                />
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'CProduct',
    props: ['product', 'image'],
}
</script>

<style lang="scss" scoped>
h1 {
    font-size: 1.2rem;
    text-transform: capitalize;
}

.card {
    position: relative;
    border-radius: 5px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.3);
    overflow: hidden;
    width: 320px;
}

.card > figure {
    width: 320px;
}

.card > figure > img {
    width: 100%;
}

.details {
    background-color: #FFF;
    border-radius: 10px;
    padding: 20px;
    position: absolute;
    top: 74%;
    width: 100%;
    transition: box-shadow .3s ease-in-out,
                top .3s ease-in-out;
}

.card:hover .details {
    box-shadow: 0 -5px 10px rgba(0,0,0,0.3);
    top: 53%;
}

.details > .min-details,
.details > .min-details {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
}

.btn {
    background-color: #192a56;
    border-radius: 5px;
    color: #FFF;
    display: block;
    padding: 10px;
    text-align: center;
    text-decoration: none;
    text-transform: capitalize;
    width: 100%;
    transition: box-shadow .3s ease-in-out,
                transform .3s ease-in-out;
}

.btn:hover {
  box-shadow: 0 5px 10px rgba(0,0,0,.3);
  transform: translateY(-2px);
}
.min-details__bottom {
    display: flex;
    justify-content: space-between;
    gap: 10px;
}
.like-icon {
    font-size: 2.5rem;
    cursor: pointer;
    transform: translateY(-2px);
    transition: box-shadow .3s ease-in-out,
                transform .3s ease-in-out;
}
</style>