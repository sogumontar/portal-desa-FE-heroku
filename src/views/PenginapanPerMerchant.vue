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
            <div v-if="penginapan.length!=0">
                <b-row class="baris-produk justify-content-md-center justify-content-lg-center justify-content-sm-center">
                    <b-col class="metric-tarif p-4 m-3 mr-5" v-for="penginapan in penginapan" :key="penginapan.sku"
                           cols="10" col lg="3" sm="8" md="4">
                        <router-link :to="'/detailPenginapan/'+produk.sku">
                            <b-img
                                    rounded=""
                                    :src="'https://portal-desa.herokuapp.com'+produk.gambar"
                                    fluid
                                    class="gambar-produk"></b-img>
                        </router-link>
                        <hr>
                        <h5>Nama: {{ produk.nama }}</h5>
                        <h5>Harga: Rp. {{ produk.harga | numFormat }}</h5>
                    </b-col>
                </b-row>
            </div>
            <div v-else>
                <b-row class="mt-5">
                    <b-col>
                        <div style="text-align: center;">
                            <h1>Penginapan Di Desa ini Tidak Ditemukan</h1>
                        </div>
                    </b-col>
                </b-row>
            </div>
        </b-container>

    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "PenginapanPerMerchant",
        data() {
            return {
                nama: this.$route.params.sku,
                penginapan: [],
                desa: [],

            }
        },
        async mounted() {
            this.load()
        },
        methods: {
            async load() {
                const response = await axios.get('https://portal-desa.herokuapp.com/penginapan/bySkuAdmin/' + this.$route.params.skuMerchant)
                this.penginapan = response.data
                const responses = await axios.get('https://portal-desa.herokuapp.com/desa/' + this.$route.params.namaDesa)
                this.desa = responses.data
                console.log(this.penginapan)
            }
        }
    }
</script>

<style scoped>

</style>