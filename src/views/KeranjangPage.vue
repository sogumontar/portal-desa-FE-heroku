<template>
    <div>
        <div class="container">
            <h1 class="judul mt-3">Keranjang</h1>
            <hr>
            <div class="row">
                <b-col cols="auto">

                </b-col>
                <b-col cols="10">
                    <b-row v-for="(keranjang,index) in keranjang" :key="keranjang.id" class="metric-tarif mt-2">
                        <b-col cols="12" col sm="10" lg="auto">
                            <b-img thumbnail :src="'https://portal-desa.herokuapp.com'+keranjang[1].gambar" class="gambar-produk p-3 m-2"></b-img>
                        </b-col>
                        <b-col class="ml-3 m">
                            <h1>{{keranjang[1].nama}}</h1>
                            <p style="font-size: 20px; margin-left: 2px">Harga : Rp. {{keranjang[1].harga*keranjang[0].jumlah | numFormat}}</p>
                            <b-row class="ml-1">
                                <h4><b-icon-dash-circle class="mt-1" @click="kurang_jumlah(index)"></b-icon-dash-circle><b-icon-dash></b-icon-dash></h4>
                                <h5><p class="metric-tarif-jumlah">{{ keranjang[0].jumlah }}</p></h5>
                                <h4><b-icon-dash></b-icon-dash><b-icon-plus-circle class="mt-1" @click="tambah_jumlah(index)"></b-icon-plus-circle></h4>
                            </b-row>
                            <b-button variant="danger" size="sm"><b-icon-trash></b-icon-trash> Hapus</b-button>
                            <br><br>
                            <br><br>
                        </b-col>
                    </b-row>
                    <b-row class="mt-3 mb-4">
                        <b-col col lg="10">

                        </b-col>
                        <b-col>
<!--                            <b-button variant="primary" size="lg" v-if="keranjang.length!=0">Pesan</b-button>-->
                        </b-col>
                    </b-row>

                </b-col>
                <b-col cols="auto">

                </b-col>
            </div>
            <div class="mt-4 p-3 ml-2"  v-if="keranjang.length!=0">
                <b-row>

                    <b-col col lg="3">
                        <h5>Alamat</h5>
                    </b-col>
                    <b-col col lg="auto">
                        <h5>:</h5>
                    </b-col>
                    <b-col cols="auto" col lg="3" md="auto" sm="auto">
                        <b-form-input size="sm" type="text" class="form-control" v-if="detail.length!=0"
                                      v-model="detail.alamat"></b-form-input>
                    </b-col>
                    <b-col col lg="auto" offset-lg="1">
                        <b-button v-if="detail.length!=0" variant="primary" @click="ubah" size="sm">Ubah Alamat
                        </b-button>
                        <b-button v-else variant="primary" @click="show" size="sm">Tambah Alamat</b-button>
                    </b-col>
                </b-row>

                <b-row class="mt-4">
                    <b-col cols="auto" col lg="auto" md="auto"  sm="auto">
                        <h5>Total Pembayaran : Rp. {{ sum | numFormat }}</h5>
<!--                        <b-button variant="primary" @click="show" size="sm">Detail</b-button>-->
                    </b-col>
                </b-row>
                                <b-card class="row">
                                    <b-card-text class="col-md-5">
<!--                                        <p>Alamat : {{detail.alamat}}</p>-->
<!--                                        <b-btn v-if="detail.length!=0"  @click="show" class="btn btn-info">Ubah</b-btn>-->
<!--                                        <b-btn v-else class="btn btn-info" @click="show">isi</b-btn>-->
                                    </b-card-text>
                                    <b-card-text class="col-md-5">
                                        <p>Total Pembayaran : Rp.{{produk.harga | numFormat}} </p>
                                        <!--                        <b-btn v-if="produk.length!=1" class="btn btn-info">Ubah</b-btn>-->
                                    </b-card-text>
                                    <b-col cols="12" col lg="7">
                                        <section>
                                            <h3>radio buttons</h3>
                                            <input type="radio" v-model="metode" value="ATM Mandiri">ATM Mandiri
                                            <input type="radio" v-model="metode" value="Atm BRI">Atm BRI
                                            <br><br>
                                            <div v-if="metode === 'ATM Mandiri'">
                                                <img src="../assets/pict/atm.png" width="200px" alt="">
                                                <br><br>
                                                <h3>No Rek : 5412751234123456</h3>
                                                <h3>Atas Nama : Benyamin Simanungkalit</h3>
                                            </div>
                                            <div v-else-if="metode === 'Atm BRI'">
                                                <img src="../assets/pict/atm.png" width="201px" alt="">
                                                <br><br>
                                                <h3>No Rek : 7712654312317006</h3>
                                                <h3>Atas Nama : Ojaks Sidabukke</h3>
                                            </div>
                                        </section>

                                    </b-col>
                                    <b-btn variant="success" @click="submit">Selesai</b-btn>
                                </b-card>
                <modal name="hello-world">
                    <b-form @submit="formSubmit" class="mt-3" >
                        <b-form-row class="justify-content-sm-center mt-3">
                            <b-col cols="3" col md="2" sm="2" lg="1" class="mt-2">
                                <p>Alamat</p>
                            </b-col>
                            <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                                <p>:</p>
                            </b-col>
                            <b-col cols="8" col md="5" lg="4" sm="7">
                                <b-form-input
                                        id="input-alamat"
                                        v-model="detail.alamat"
                                        required
                                        type="text"
                                ></b-form-input>
                            </b-col>
                        </b-form-row>
                        <b-form-row class="justify-content-md-center">
                            <b-col col md="4" lg="2">

                            </b-col>
                            <b-col col md="auto" lg="auto">

                            </b-col>
                            <b-col col md="auto" lg="auto" class="mt-2">
                                <button type="submit" id="tombol-daftar" class="pl-3 pr-3 btn btn-primary">Update</button>
                            </b-col>
                        </b-form-row>
                    </b-form>
                </modal>
            </div>
            <div v-else>
                <h1>Keranjang Kosong</h1>
            </div>
        </div>
    </div>
</template>


<script>
    import axios from "axios";

    export default {
        name: "KeranjangPage",
        data() {
            return {
                total: 0,
                produk: [],
                detail : [],
                sku : '',
                metode : '',
                jumlah: 0,
                keranjang:[],
                sum:0,
                cek:0
            }
        }, async mounted() {
            this.sku=localStorage.getItem('sku')
            this.load()
            this.getKeranjang()
            const queryString = window.location.search;

            const urlParams = new URLSearchParams(queryString);

            const page_type = urlParams.get('jumlah');

            this.jumlah = parseInt(page_type);
        },
        methods: {
            async load() {
                const  responses = await axios.get('https://portal-desa.herokuapp.com/customer/' + localStorage.getItem('sku'))
                this.detail=responses.data
                console.log(this.detail)
            },
            show () {
                this.$modal.show('hello-world');
            },
            async ubah() {
                await axios.put('https://portal-desa.herokuapp.com/customer/update/' + this.sku, {
                    sku: this.sku,
                    alamat: this.detail.alamat
                }).then(alert("Alamat berhasil di ubah"))

            },
            async tambahAlamat () {
                axios.post('https://portal-desa.herokuapp.com/customer/add', {
                    sku: this.sku,
                    alamat: this.detail.alamat
                })
            },
            hide () {
                this.$modal.hide('hello-world');
            },
            async getKeranjang(){
                const response = await axios.get('https://portal-desa.herokuapp.com/keranjang/web/customer/' + this.sku)
                this.keranjang = response.data
                console.log(this.keranjang)
                    for(var i =0 ; i<=this.keranjang.length ; i++) {
                        this.sum += (this.keranjang[i][0].jumlah * this.keranjang[i][0].harga)
                    }
            },
            formSubmit(){

            },
            tambah_jumlah(index){
                this.keranjang[index][0].jumlah++;
                for(var i =0 ; i<=this.keranjang.length ; i++) {
                    this.cek += (this.keranjang[i][0].jumlah * this.keranjang[i][0].harga)
                }
                this.sum=this.cek
                this.cek=0
            },
            kurang_jumlah(index) {
                if (this.keranjang[index][0].jumlah !== 1) {
                    this.keranjang[index][0].jumlah--;
                    for(var i =0 ; i<=this.keranjang.length ; i++) {
                        this.cek += (this.keranjang[i][0].jumlah * this.keranjang[i][0].harga)
                    }
                    this.sum=this.cek
                    this.cek=0
                }
            },
            submit(){
                console.log()
                axios.post('https://portal-desa.herokuapp.com/transaksi/add', {
                    skuProduk: this.$route.params.sku,
                    skuCustomer: this.sku,
                    alamat : this.detail.alamat,
                    harga : this.sum,
                    metode : this.metode
                })
                    // eslint-disable-next-line no-unused-vars
                    .then(alert("Proses Transaksi Selesai"),
                        window.location.href="/daftarPesanan"
                    )
            }
        }
    }
</script>


<style scoped>
    .data-produk{
        font-size: 19px;
    }

    .judul{
        text-align: left;
        font-family: "Arial Black";
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
         /*-webkit-box-shadow: 0px 2px 5px -2px rgba(0,0,0,0.75);*/
         /*-moz-box-shadow: 0px 2px 5px -2px rgba(0,0,0,0.75);*/
         /*box-shadow: 0px 2px 5px -2px rgba(0,0,0,0.75);*/
     }
    .metric-tarif-jumlah{
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