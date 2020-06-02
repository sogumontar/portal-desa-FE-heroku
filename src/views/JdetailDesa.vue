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
            <h1 class="judul mt-3">{{ desa.nama }}</h1>
            <hr>
            <b-row class="justify-content-lg-center">
                <b-col cols="12" col lg="auto" md="auto" sm="12">
<!--                    <b-img :src="'https://portal-desa.herokuapp.com/desa/get/'+desa.gambar " width="400px"></b-img>-->
                    <b-img :src="'https://portal-desa.herokuapp.com/desa/get/Default.jpg'" width="400px"></b-img>
                </b-col>

                <b-col class="keterangan" cols="12" col lg="6" md="auto">

                    <b-row>
                        <b-col col lg="5" cols="5">
                            <p>Nama Kepala Desa</p>
                        </b-col>
                        <b-col col lg="auto" cols="auto">
                            <p>:</p>
                        </b-col>
                        <b-col col lg="auto" cols="auto">
                            <p v-if="desa.namaKepalaDesa === null"> - </p>
                            <p v-else>{{desa.namaKepalaDesa}}</p>
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col col lg="5" cols="5">
                            <p>Kecamatan</p>
                        </b-col>
                        <b-col col lg="auto" cols="auto">
                            <p>:</p>
                        </b-col>
                        <b-col col lg="auto" cols="auto">
                            <p>{{ desa.kecamatan }}</p>
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col col lg="5" cols="5">
                            <p>Jumlah Penduduk</p>
                        </b-col>
                        <b-col col lg="auto" cols="auto">
                            <p>:</p>
                        </b-col>
                        <b-col col lg="auto" cols="auto">
                            <p>{{desa.jumlahPenduduk}}</p>
                        </b-col>
                    </b-row>
                </b-col>

            </b-row>

        </b-container>
    </div>

</template>

<script>
    import axios from "axios";

    export default {
        name: "JdetailDesa",
        data(){
            return {
                nama: this.$route.params.sku,
                desa: []

            }
        },
        async mounted(){
            this.load()
        },
        methods: {
            async load(){
                const response = await axios.get('https://portal-desa.herokuapp.com/desa/' + this.$route.params.sku)
                this.desa = response.data
                console.log(this.desa)
            }
        }
    }
</script>

<style scoped>
    .judul{
        text-align: left;
        font-family: "Arial Black";
    }

    .keterangan{
        font-family: "Times New Roman";
        font-size: 20px;
    }

</style>