<template>
    <b-container>
        <h2 class="judul mt-3">Daftar Desa di Kecamatan {{value}}</h2>
        <hr>
        <b-row>
            <b-col cols="1" col lg="1" sm="1" md="1" >

            </b-col>

            <b-col cols="12" col lg="9">
                <b-row v-for="produk in produk" :key="produk.sku" class="mb-3 metric-tarif">

                    <b-col lg="auto p-4">
                        <b-img
                                :src="'https://portal-desa.herokuapp.com/desa/get/'+produk.gambar"
                                fluid
                                width="300px">
                        </b-img>
                    </b-col>

                    <b-col class="keterangan p-4">

                        <b-row >
                            <b-col cols="5" col lg="5">
                                <p>Nama Desa</p>
                            </b-col>
                            <b-col cols="auto" col lg="auto">
                                <p>:</p>
                            </b-col>
                            <b-col cols="auto" col lg="auto">
                                <p>{{ produk.nama }}</p>
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col cols="5" col lg="5">
                                <p>Nama Kepala Desa</p>
                            </b-col>
                            <b-col cols="auto" col lg="auto">
                                <p>:</p>
                            </b-col>
                            <b-col cols="auto" col lg="auto">
                                <p>{{ produk.namaKepalaDesa }}</p>
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col cols="5" col lg="5">
                                <p>Jumlah Penduduk</p>
                            </b-col>
                            <b-col cols="auto" col lg="auto">
                                <p>:</p>
                            </b-col>
                            <b-col cols="auto" col lg="auto">
                                <p>{{ produk.jumlahPenduduk | numFormat }} jiwa</p>
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col cols="5" col lg="5">
                                <p>Status</p>
                            </b-col>
                            <b-col cols="auto" col lg="auto">
                                <p>:</p>
                            </b-col>
                            <b-col cols="auto" col lg="auto">
                                <p v-if="produk.status === 1">Aktif</p>
                                <p v-else>Tidak Aktif</p>
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col>
                                <router-link :to="'/detailDesa/'+produk.nama">Lihat Detail Desa</router-link>
                            </b-col>
                        </b-row>

                    </b-col></b-row>
            </b-col>
        </b-row>

<!--            <b-card >-->
<!--                <h3>{{produk.nama}}</h3>-->
<!--                <div class="row">-->
<!--                    <div class="col-md-7">-->
<!--                        <b-card-text>-->
<!--                            Nama Kepala Desa : {{produk.namaKepalaDesa}}-->
<!--                        </b-card-text>-->
<!--                    </div>-->
<!--                    <div class="col-md-5">-->
<!--                        <b-img width="180px" rounded=""-->
<!--                               src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Kecamatan_Balige%2C_Toba_Samosir_02.jpg"-->
<!--                               fluid></b-img>-->
<!--                    </div>-->
<!--                </div>-->

<!--                <b-card-text>A second paragraph of text in the card.</b-card-text>-->
<!--                <router-link  class="card-link" :to="'/detailDesaAdmin/'+produk.nama"><h5>Lihat detail desa</h5></router-link>-->

<!--            </b-card>-->
<!--        </b-row>-->
    </b-container>
</template>

<script>
    import axios from "axios";

    export default {
        name: "DetailProdukPage",
        data() {
            return {
                value: this.$route.params.sku,
                produk : []
            }
        }, devServer: {
            proxy: {
                '^/api/': {
                    target: "https://portal-desa.herokuapp.com/desa/+'this.$route.params.sku'",
                    changeOrigin: true
                }
            }
        }, async mounted() {
            this.load()
        },
        methods: {
            async load() {
                const response = await axios.get('https://portal-desa.herokuapp.com/desa/kecamatan/'+this.$route.params.sku)
                this.produk = response.data
                console.log(this.produk)
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

    .metric-tarif{
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 10px;
        padding: 10px;
        margin-bottom: 20px;
        border: 1px solid #DCE6EB;
        font-family:  "Times New Roman";
        -webkit-box-shadow: 0px 2px 5px -2px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 2px 5px -2px rgba(0,0,0,0.75);
        box-shadow: 0px 2px 5px -2px rgba(0,0,0,0.75);
    }

</style>
