<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <!--            <b-navbar-brand href="#">{{ nama }}</b-navbar-brand>-->

            <b-navbar-toggle target="nav-collapse2"></b-navbar-toggle>

            <b-collapse id="nav-collapse2" is-nav>
                <b-navbar-nav class="">
                    <b-nav-item class="mr-3"><b-link :to="'/detailDesa/'+desa.nama" style="color: white">Home</b-link></b-nav-item>
                    <b-nav-item class="mr-3"><b-link :to="'/detailDesa/artikel/'+desa.nama" style="color: white">Artikel</b-link></b-nav-item>
                    <b-nav-item class="mr-3"><b-link :to="'/productPerMerchant/'+desa.nama+'/'+desa.skuAdmin" style="color: white">Produk</b-link></b-nav-item>
                    <b-nav-item class="mr-3"><b-link :to="'/penginapanPerMerchant/'+desa.nama+'/'+desa.skuAdmin" style="color: white">Penginapan</b-link></b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <b-container>
            <b-card body-class="text-center" header-tag="nav" class="mt-5">
                <template v-slot:header>
                    <b-nav card-header tabs>
                        <b-nav-item v-bind:active="tab === 1" v-on:click="tab1">Artikel</b-nav-item>
                        <b-nav-item v-bind:active="tab === 2" v-on:click="tab2">Berita</b-nav-item>
                        <b-nav-item v-bind:active="tab === 3" v-on:click="tab3">Pengumuman</b-nav-item>
                    </b-nav>
                </template>
                <div>
                    <p v-if="tab === 1" >Artikel</p>
                    <p v-else-if="tab === 2">Berita</p>
                    <p v-else>Pengumuman</p>
                </div>
            </b-card>
        </b-container>

    </div>

</template>

<script>
    import axios from "axios";

    export default {
        name: "JartikelPage",
        data(){
            return{
                tab:1,
                desa: [],
            }
        },
        async mounted(){
          this.load()
        },
        methods:{
            async load(){
                const response = await axios.get('https://portal-desa.herokuapp.com/desa/' + this.$route.params.sku)
                this.desa = response.data
                console.log(this.desa)
            },
            async tab1(){
                this.tab=1
                const response = await axios.get('https://portal-desa.herokuapp.com/transaksi/sku/cart/' + this.sku)
                this.data=response.data
                console.log(this.data)
            },
            async tab2(){
                this.tab=2
                const response = await axios.get('https://portal-desa.herokuapp.com/transaksi/sku/pesan/' + this.sku)
                this.data=response.data
                console.log(this.data[0])
            },
            async tab3(){
                this.tab=3
                const response = await axios.get('https://portal-desa.herokuapp.com/transaksi/sku/bayar/' + this.sku)
                this.data=response.data
            },
        }
    }
</script>

<style scoped>

</style>