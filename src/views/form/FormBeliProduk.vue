<template>
    <div>
        <div class="container">
            <h1 class="judul mt-3">Form Pemesanan</h1>
            <hr>
            <br>
            <div class="mt-4 p-3 ml-2 card">
                <b-row>
                    <b-col col lg="5">
                        <h5><img :src="'https://portal-desa.herokuapp.com'+produk.gambar" class="card" height="240px"
                                 width="200px"
                                 alt=""></h5>
                    </b-col>
                    <b-col col lg="7">
                        <p>Nama : {{produk.nama}}</p>
                        <br>
                        <p> Harga : Rp.{{produk.harga | numFormat}}</p>
                        <br>
                        <p>Deskripsi : {{produk.deskripsi}}</p>
                    </b-col>
                </b-row>
                <br><br><br>
                <b-row>
                    <b-row style="margin-left: 60px">
                        <h4>
                            <b-icon-dash-circle class="mt-1" @click="kurang_jumlah"></b-icon-dash-circle>
                            <b-icon-dash></b-icon-dash>
                        </h4>
                        <h5><p class="metric-tarif">{{ jumlah }}</p></h5>
                        <h4>
                            <b-icon-dash></b-icon-dash>
                            <b-icon-plus-circle class="mt-1" @click="tambah_jumlah"></b-icon-plus-circle>
                        </h4>
                    </b-row>
                </b-row>
                <br><br><br>
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

                <b-row class="mt-5">
                    <b-col col lg="3">
                        <h5>Total Pembayaran</h5>
                    </b-col>
                    <b-col col lg="auto">
                        <h5> : </h5>
                    </b-col>
                    <b-col cols="auto" col lg="3" md="auto" sm="auto">
                        <h5>Rp. {{ produk.harga*jumlah | numFormat }}</h5>
                    </b-col>
                    <b-col col lg="auto" offset-lg="1">
                        <!--                        <b-button variant="primary" @click="show" size="sm">Detail Pesanan</b-button>-->
                    </b-col>
                </b-row>
                <!--                <b-card class="row">-->
                <!--                    <b-card-text class="col-md-5">-->
                <!--                        <p>Alamat : {{detail.alamat}}</p>-->
                <!--                        <b-btn v-if="detail.length!=0"  @click="show" class="btn btn-info">Ubah</b-btn>-->
                <!--                        <b-btn v-else class="btn btn-info" @click="show">isi</b-btn>-->
                <!--                    </b-card-text>-->
                <!--                    <b-card-text class="col-md-5">-->
                <!--                        <p>Total Pembayaran : Rp.{{produk.harga | numFormat}} </p>-->
                <!--                        &lt;!&ndash;                        <b-btn v-if="produk.length!=1" class="btn btn-info">Ubah</b-btn>&ndash;&gt;-->
                <!--                    </b-card-text>-->
                <!--                    <b-card-text class="col-md-5">-->
                <!--                        <p>Metode Pembayaran : </p>-->
                <!--                        <select class="form-control" v-model="metode">-->
                <!--                            <option value="COD">COD</option>-->
                <!--                            <option value="ATM">ATM</option>-->
                <!--                            <option value="Indomaret">Indomaret</option>-->
                <!--                        </select>-->
                <!--                    </b-card-text>-->
                <!--                    <b-btn variant="success" @click="submit">Selesai</b-btn>-->
                <!--                </b-card>-->
                <b-row class="mt-5">
                    <b-col cols="auto" col lg="3">
                        <h5>Metode Pembayaran</h5>
                    </b-col>
                    <b-col col lg="auto">
                        <h5> : </h5>
                    </b-col>
                    <b-col cols="12" col lg="7">
                        <section>
                            <h3>radio buttons</h3>
                            <input type="radio" v-model="metode" value="ATM Mandiri">ATM Mandiri
                            <input type="radio" v-model="metode" value="Atm BRI">Atm BRI
                            <br><br>
                            <div v-if="metode === 'ATM Mandiri'">
                                <img src="../../assets/pict/mandiri.png" width="200px" alt="">
                                <br><br>
                                <h3>No Rek : 5412751234123456</h3>
                                <h3>Atas Nama : Benyamin Simanungkalit</h3>
                            </div>
                            <div v-else-if="metode === 'Atm BRI'">
                                <img src="../../assets/pict/atm.png" width="201px" alt="">
                                <br><br>
                                <h3>No Rek : 7712654312317006</h3>
                                <h3>Atas Nama : Ojaks Sidabukke</h3>
                            </div>
                        </section>

                    </b-col>
                </b-row>

                <b-row class="mt-5">
                    <b-col col lg="auto">
                        <b-button @click="pesan" variant="success">Pesan</b-button>
                    </b-col>
                </b-row>

                <modal name="hello-world">
                    <b-form @submit="formSubmit" class="mt-3">
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
                                <button type="submit" id="tombol-daftar" class="pl-3 pr-3 btn btn-primary">Update
                                </button>
                            </b-col>
                        </b-form-row>
                    </b-form>
                </modal>
            </div>
            <br><br><br>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "FormBeliProduk",
        data() {
            return {
                total: 0,
                produk: [],
                detail: [],
                sku: '',
                skuProduct: this.$route.params.sku,
                metode: '',
                pilihan_metode: [
                    {value: 'Bank BRI', text: 'Bank BRI'},
                    {value: 'Bank Mandiri', text: 'Bank Mandiri'},
                    {value: 'Bank BNI', text: 'Bank BNI'},
                    {value: 'Indomaret', text: 'Indomaret'},
                    {value: 'Alfamart', text: 'Alfamart'}
                ],
                jumlah: 0,
            }
        }, async mounted() {
            this.sku = localStorage.getItem('sku')
            this.load()
            const queryString = window.location.search;

            const urlParams = new URLSearchParams(queryString);

            const page_type = urlParams.get('jumlah');

            this.jumlah = parseInt(page_type);
        },
        methods: {
            async load() {
                console.log(this.$route.params.sku)
                const response = await axios.get('https://portal-desa.herokuapp.com/produk/sku/' + this.$route.params.sku)
                this.produk = response.data
                const responses = await axios.get('https://portal-desa.herokuapp.com/customer/' + localStorage.getItem('sku'))
                this.detail = responses.data
                console.log(this.produk)
            },
            tambah_jumlah() {
                this.jumlah++;
            },
            kurang_jumlah() {
                if (this.jumlah !== 1) {
                    this.jumlah--;
                }

            },
            show() {
                this.$modal.show('hello-world');
            },
            hide() {
                this.$modal.hide('hello-world');
            },
            async ubah() {
                await axios.put('https://portal-desa.herokuapp.com/customer/update/' + this.sku, {
                    sku: this.sku,
                    alamat: this.detail.alamat
                }).then(alert("Alamat berhasil di ubah"))

            },
            async tambahAlamat() {
                axios.post('https://portal-desa.herokuapp.com/customer/add', {
                    sku: this.sku,
                    alamat: this.detail.alamat
                })
            },
            formSubmit() {

            },
            pesan() {
                if (this.metode === '') {
                    alert("Pilih Metode Pembayaran")
                } else if (this.alamat === '') {
                    alert("Alamat Pengiriman Harus Di isi")
                } else {
                    console.log()
                    axios.post('https://portal-desa.herokuapp.com/transaksi/add', {
                        skuProduk: this.$route.params.sku,
                        skuCustomer: this.sku,
                        alamat: this.detail.alamat,
                        harga: this.produk.harga,
                        metode: this.metode
                    })
                        // eslint-disable-next-line no-unused-vars
                        .then(
                            window.location.href = "/daftarPesanan"
                        )
                }
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