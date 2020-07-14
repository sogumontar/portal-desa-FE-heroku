<template>
    <b-container>
        <h1 class="judul mt-3">{{ value }}</h1>
        <hr>
        <div>
            <b-row class="p-2 pb-4">
                <b-col cols="12" col lg="6" sm="12" md="6">
                    <b-img center width="450px" rounded=""
                           :src="'https://portal-desa.herokuapp.com/desa/get/'+desa.gambar"
                           fluid></b-img>
                </b-col>
                <b-col>
                    <b-row>
                        <b-col>

                        </b-col>
                    </b-row>
                    <table id="table">
                        <tr>
                            <td>Nama Desa</td>
                            <td> :</td>
                            <td>{{value}}</td>
                        </tr>
                        <tr>
                            <td>Kepala Desa</td>
                            <td>:</td>
                            <td>{{desa.namaKepalaDesa}}</td>
                        </tr>
                        <tr>
                            <td>Lokasi</td>
                            <td>:</td>
                            <td>{{desa.kecamatan}} ,{{desa.nama}}</td>
                        </tr>
                        <tr>
                            <td>Jumlah penduduk</td>
                            <td>:</td>
                            <td>{{desa.jumlahPenduduk}} Jiwa</td>
                        </tr>
                    </table>
                </b-col>
            </b-row>
            <hr>
            <h3>Daftar Produk Desa {{value}}</h3>
            <div right v-if="produk.length!=0">
                <b-row class="">
                    <b-col cols="12" col lg="4" sm="12" md="6" class="p-4" v-for="produk in produk" :key="produk.sku">
                        <h5 v-if="role=='ROLE_ADMIN'">{{produk.nama}}</h5>
                        <router-link v-else :to="'/detailProduk/'+produk.sku"><h5>{{produk.nama}}</h5></router-link>
                        <b-img width="200px" rounded=""
                               :src="'https://portal-desa.herokuapp.com/desa/get/'+produk.gambar"
                               fluid></b-img>
                        <br>
                        <p>Harga : Rp.{{produk.harga}}</p>
                        <p>Deskripsi : {{produk.deskripsi}}</p>
                    </b-col>
                </b-row>
            </div>
            <div v-else>
                <center><img src="../../assets/gif/25.gif" alt=""></center>
            </div>
            <hr>
            <h3>Daftar Penginapan Desa {{value}}</h3>
        </div>
        <hr>
    </b-container>
</template>

<script>
    import axios from "axios";

    export default {
        name: "DetailKecamatanAdmin",
        data() {
            return {
                value: this.$route.params.sku,
                desa: [],
                produk: [],
                skuDesa: '',
                role: ''
            }
        }, devServer: {
            proxy: {
                '^/api/': {
                    target: "https://portal-desa.herokuapp.com/desa/+'this.$route.params.sku'",
                    changeOrigin: true
                }
            }
        }, async mounted() {
            this.role = localStorage.getItem("role")
            this.load()
        },
        methods: {
            async load() {
                const response = await axios.get('https://portal-desa.herokuapp.com/desa/' + this.$route.params.sku)
                this.desa = response.data
                const responses = await axios.get('https://portal-desa.herokuapp.com/desa/' + this.$route.params.sku)
                this.skuDesa = responses.data.skuAdmin
                const responsess = await axios.get('https://portal-desa.herokuapp.com/produk/skuDesa/' + this.skuDesa)
                this.produk = responsess.data
                console.log(responsess.data)
            }
        }
    }
</script>

<style scoped>
    .judul {
        text-align: left;
        font-family: "Arial Black";
    }
</style>
