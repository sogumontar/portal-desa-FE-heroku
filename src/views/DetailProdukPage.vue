<template>
    <div class="container">
        <h1 class="judul mt-3">Detail Produk</h1>
        <hr>
        <div class="mt-5">
            <b-row class="justify-content-md-center justify-content-lg-center justify-content-sm-center">
                <b-col col sm="auto">

                </b-col>
                    <b-col col lg="auto" md="auto" sm="auto" cols="12">
                        <b-img
                                rounded=""
                                :src="'https://portal-desa.herokuapp.com'+produk.gambar"
                                class="gambar-produk"
                                fluid>
                        </b-img>
                    </b-col>
                    <b-col col lg="6" md="6" sm="auto" cols="auto" class="data-produk mt-2">
                        <p>Nama Produk : {{produk.nama}}</p>
                        <p>Harga : Rp. {{produk.harga | numFormat}}</p>
                        <p>Deskripsi : <br>{{produk.deskripsi}}</p>
                        <p>Desa : <br>{{desa.nama}}</p>
                        <p>Kecamatan : <br>{{desa.kec}}</p>
                    </b-col>
            </b-row>
            <div class="tombol" v-if="role === 'ROLE_MERCHANT' && produk.skuDesa === skuLog">
                <b-row class="justify-content-md-center justify-content-lg-center justify-content-sm-center">
                  <b-btn @click="hapus" class="btn btn-danger mr-3">Hapus</b-btn>
                   <router-link :to="'/updateProduk/'+produk.sku"  class="btn btn-primary">Update</router-link>
                </b-row>
            </div>
            <div class="tombol" v-else-if="role === 'ROLE_USER'">
                <b-row class="justify-content-md-center justify-content-lg-center justify-content-sm-center">
                    <h4><b-icon-dash-circle class="mt-1" @click="kurang_jumlah"></b-icon-dash-circle><b-icon-dash></b-icon-dash></h4>
                    <h5><p class="metric-tarif">{{ jumlah }}</p></h5>
                    <h4><b-icon-dash></b-icon-dash><b-icon-plus-circle class="mt-1" @click="tambah_jumlah"></b-icon-plus-circle></h4>
                </b-row>
                <b-row class="justify-content-md-center justify-content-lg-center justify-content-sm-center">
                    <router-link :to="'/beliProduk/'+produk.sku+'?jumlah='+jumlah"><b-btn class="btn btn-primary mr-3">Pesan Langsung</b-btn></router-link>
                    <button  @click="addToCart" class="btn btn-success">Keranjang</button>
                </b-row>
            </div>
        </div>
        <br><br><br><br>
        <br><br><br><br>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "DetailProdukPage"
        ,
        data() {
            return {
                sku: this.$route.params.sku,
                skuLog : localStorage.getItem('sku'),
                produk: [],
                jumlah: 1,
                skuDesa: '',
                harga: 0,
                skuCustomer: '',
                role : localStorage.getItem('role'),
                idProduk: '',
                desa:[]
            }
        }, async mounted() {
            this.load()
            this.skuCustomer = localStorage.getItem("sku")
            this.idProduk =this.$route.params.sku
            console.log(this.idProduk)
            console.log(this.skuCustomer)
        },
        methods: {
            async load() {
                console.log(this.$route.params.sku)
                const response = await axios.get('https://portal-desa.herokuapp.com/produk/sku/' + this.$route.params.sku)
                this.produk = response.data
                console.log(this.produk)
                const responses = await axios.get('https://portal-desa.herokuapp.com/desa/desa/skuAdmin/' + this.produk.skuDesa)
                this.desa = responses.data.data
                console.log(this.desa)
            },
            tambah_jumlah(){
                this.jumlah++;
            },
            kurang_jumlah(){
                if(this.jumlah !== 1){
                    this.jumlah--;
                }

            },
            async addToCart(){
                const response = await axios.post('https://portal-desa.herokuapp.com/keranjang/save', {
                    idCustomer : this.skuCustomer,
                    idProduk : this.idProduk,
                    jumlah: this.jumlah,
                    skuDesa: this.produk.skuDesa,
                    harga: this.produk.harga
                }).then(alert("Tambah Ke Keranjang Sukses"))

                console.log(response)
            },
            async hapus(){
                const response = await axios.put('https://portal-desa.herokuapp.com/produk/delete/'+ this.$route.params.sku)
                    .then(window.location.href= "/produk")

                console.log(response)
            }
        }
    }
</script>

<style scoped>
    .judul{
        text-align: left;
        font-family: "Arial Black";
    }

    .data-produk{
        font-size: 19px;
    }

    .metric-tarif{
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 10px;
        padding: 5px;
        margin-top: -3px;
        /*margin-bottom: 20px;*/
        border: 1px solid #DCE6EB;
        font-family:  "Times New Roman";
        -webkit-box-shadow: 0px 2px 5px -2px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 2px 5px -2px rgba(0,0,0,0.75);
        box-shadow: 0px 2px 5px -2px rgba(0,0,0,0.75);
    }

    @media only screen and (max-width: 600px) {
        /*.gambar-produk{*/
        /*    width: 360px;*/
        /*}*/

        .gambar-produk{
            width: 100%;
            height: 300px;
        }
    }

    /* Small devices (portrait tablets and large phones, 600px and up) */
    @media only screen and (min-width: 600px) {
        .gambar-produk{
            width: 400px;
            height: 250px;
        }
    }

    /* Medium devices (landscape tablets, 768px and up) */
    @media only screen and (min-width: 768px) {
        .gambar-produk{
            width: 300px;
            height: 200px;
        }
        .tombol{
            margin-top: 20px;
        }
    }

    /* Large devices (laptops/desktops, 992px and up) */
    @media only screen and (min-width: 992px) {
        .gambar-produk{
            width: 300px;
            height: 200px;
        }
    }

    /* Extra large devices (large laptops and desktops, 1200px and up) */
    @media only screen and (min-width: 1200px) {
        .gambar-produk{
            width: 300px;
            height: 200px;
        }
    }



</style>
