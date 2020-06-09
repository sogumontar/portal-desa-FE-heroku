<template>
    <div class="container">
        <br>
        <h3>Daftar Pesanan Anda, {{namaLogin}}</h3>
        <hr>
        <div>
            <b-card body-class="text-center" header-tag="nav">
                <template v-slot:header>
                    <b-nav card-header tabs>
                        <!--                        <b-nav-item v-bind:active="tab === 1" v-on:click="tab1">Keranjang</b-nav-item>-->
                        <b-nav-item v-bind:active="tab === 1" v-on:click="tab1">Produk Belum Bayar</b-nav-item>
                        <b-nav-item v-bind:active="tab === 2" v-on:click="tab2">Produk Sudah Dibayar</b-nav-item>
                        <b-nav-item v-bind:active="tab === 3" v-on:click="tab3">Penginapan Belum Bayar</b-nav-item>
                        <b-nav-item v-bind:active="tab === 4" v-on:click="tab4">Penginapan Sudah Dibayar</b-nav-item>
                    </b-nav>
                </template>
                <div>
                    <p v-if="data.length===0 && tab==1">Pesanan Produk Kosong</p>
                    <p v-if="data.length===0 && tab==2">Pesanan Produk Sudah Di bayar Kosong</p>
                    <p v-if="data.length===0 && tab==3">Pesanan Penginapan Kosong</p>
                    <p v-if="data.length===0 && tab==4">Pesanan Penginapan Sudah Di bayar Kosong</p>
                    <b-card-text class="card" v-for="data in data" :key="data.sku">
                        <div>
                        <h3 v-if="tab === 2 && data.status === 4" style="color: forestgreen">Pesanan Diterima</h3>
                        <h3 v-else-if="tab === 2 && data.status === 5" style="color: darkred">Pesanan Ditolak</h3>
                        <h3 v-else-if="tab === 2" style="color: dodgerblue">Menunggu</h3>
                        <h3 v-if="tab === 4 && data[0].status === 2" style="color: dodgerblue">Menunggu</h3>
                        <h3 v-else-if="tab === 4 && data[0].status === 3" style="color: forestgreen">Pesanan
                            Diterima</h3>
                        <h3 v-else-if="tab === 4" style="color: darkred">Pesanan Ditolak</h3>
                        </div>
                        <div v-if="tab <3">
                            <p>Alamat : {{data.alamat}}</p>
                            <p>Harga: Rp.{{data.harga | numFormat}}</p>
                            <p>Metode Pembayaran : {{data.metode}}</p>
                        </div>
                        <div v-else>
                            <p>Penginapan Tujuan : {{data[1].nama}}</p>
                            <p>Lokasi Penginapan : {{data[1].lokasi}}</p>
                            <p>Lama Menginap : {{data[0].lamaMenginap}}</p>
                            <p>Metode Pembayaran : {{data[0].metode}}</p>
                            <p>Harga: Rp.{{data[0].harga | numFormat}}</p>
                            <p>Tanggal Check-in : {{data[0].checkin}}</p>
                        </div>
                        <div v-if="tab ===2 || tab === 4">
                            <center>
                                <img v-if="tab === 4"
                                        width="300px"
                                        height="350px"
                                        align="center"
                                        class="card"
                                        :src="'https://portal-desa.herokuapp.com/transaksi/get/'+data[0].resi" alt="">
                                <img v-if="tab === 2"
                                     width="300px"
                                     height="350px"
                                     align="center"
                                     class="card"
                                     :src="'https://portal-desa.herokuapp.com/transaksi/get/'+data.resi" alt="">
                            </center>
                            <div v-if="tab === 2">
                                <div v-if="data.status != 5 && data.status !=4">
                                    <button @click="show(data.id)" class="btn btn-primary">Ubah Resi</button>
                                </div>
                            </div>
                            <div v-else>
                                <div v-if="data[0].status === 2">
                                    <button @click="show(data[0].id)" class="btn btn-primary">Ubah Resi</button>
                                </div>
                            </div>
                        </div>
                        <div v-if="tab === 1 || tab === 3 ">
                            <div v-if="data.metode === 'Atm BRI'">
                                <h6><b>No Rek : 7712654312317006</b></h6>
                                <h6><b>Atas Nama : Ojaks Sidabukke</b></h6>
                            </div>
                            <div v-else>
                                <h6><b>No Rek : 5412751234123456</b></h6>
                                <h6><b>Atas Nama : Benyamin Simanungkalit</b></h6>
                            </div>
                        </div>

                        <!--                        <img src="../../assets/pict/logo.png" alt="">-->
                        <div class="row">
                            <div class="col-md-4">

                            </div>
                            <div class="col-md-1">
                                <b-btn variant="danger" v-if="tab === 1" @click="deleteTransProduk(data.id)">Hapus
                                </b-btn>
                                <b-btn variant="danger" v-if="tab === 3" @click="deleteTransPenginapan(data[0].id)">Hapus</b-btn>
                            </div>
                            <div class="col-md-1">

                            </div>
                            <div class="col-md-1">
                                <b-btn variant="primary" v-if="tab === 1" @click="show(data.id)">Bayar</b-btn>
                                <b-btn variant="primary" v-if="tab === 3" @click="show(data[0].id)">Bayar</b-btn>
                            </div>
                        </div>
                    </b-card-text>
                </div>
            </b-card>
        </div>
        <modal name="hello-world">
            <b-form @submit="formSubmit" class="mt-3">
                <b-form-row class="justify-content-sm-center mt-3">
                    <b-col cols="3" col md="2" sm="2" lg="1" class="mt-2">
                        <p>Resi Pembayaran</p>
                    </b-col>
                    <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                        <p>:</p>
                    </b-col>
                    <b-col cols="8" col md="5" lg="4" sm="7">
                        <div id="app">
                            <div v-if="!image">
                                <input type="file" @change="onFileChange">
                            </div>
                            <div v-else>
                                <img :src="image" width="120" height="100"/>
                            </div>
                        </div>
                    </b-col>
                </b-form-row>
                <b-form-row class="justify-content-md-center">
                    <b-col col md="4" lg="2">

                    </b-col>
                    <b-col col md="auto" lg="auto">

                    </b-col>
                    <b-col col md="auto" lg="auto" class="mt-2">
                        <button type="submit" id="tombol-daftar" class="pl-3 pr-3 btn btn-primary">Bayar</button>
                    </b-col>
                </b-form-row>
                <hr>
            </b-form>
        </modal>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "DaftarPesananCustomer",
        data() {
            return {
                sku: '',
                tab: 1,
                data: [],
                resi: '',
                image: '',
                selected: '',
                namaLogin: ''
            }
        }, async mounted() {
            this.sku = localStorage.getItem('sku')
            this.namaLogin = localStorage.getItem("nickName")
            this.load()
            this.tab1()
        },
        methods: {
            async load() {
            },
            show(val) {
                this.selected = val
                this.$modal.show('hello-world');
            },
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                console.log(e.target.files)
                if (!files.length)
                    return;
                this.createImage(files[0]);
            }, createImage(file) {
                // eslint-disable-next-line no-unused-vars
                var image = new Image();
                var reader = new FileReader();
                var vm = this;
                reader.onload = (e) => {
                    vm.image = e.target.result;
                    if(this.tab <3 ) {
                        axios.put('https://portal-desa.herokuapp.com/transaksi/bayar/' + this.selected, {
                            resi: reader.result,
                            skuCustomer: localStorage.getItem("sku")
                        })
                    }else{
                        axios.put('https://portal-desa.herokuapp.com/transaksiPenginapan/bayar/' + this.selected, {
                            resi: reader.result,
                            skuCustomer: localStorage.getItem("sku")
                        })
                    }
                };
                reader.readAsDataURL(file);

            },
            async tab1() {
                this.tab = 1
                const response = await axios.get('https://portal-desa.herokuapp.com/transaksi/sku/pesan/' + this.sku)
                this.data = response.data
                console.log(this.data)
            },
            async tab2() {
                this.tab = 2
                const response = await axios.get('https://portal-desa.herokuapp.com/transaksi/sku/bayar/' + this.sku)
                this.data = response.data
                console.log(this.data[0])
            },
            async tab3() {
                this.tab = 3
                const response = await axios.get('https://portal-desa.herokuapp.com/transaksiPenginapan/web/sku/pesan/' + this.sku)
                this.data = response.data
                console.log(this.data)
            },
            async tab4() {
                this.tab = 4
                const response = await axios.get('https://portal-desa.herokuapp.com/transaksiPenginapan/web/sku/bayar/' + this.sku)
                this.data = response.data
                console.log(this.data[0])
            },
            async deleteTransProduk(sku) {
                await axios.get('https://portal-desa.herokuapp.com/transaksi/pesanan/cancel/' + sku)
                    .then(alert("Hapus Pesanan Sukses"), window.location.href = "/daftarPesanan")

            },
            async deleteTransPenginapan(sku) {
                await axios.get('https://portal-desa.herokuapp.com/transaksiPenginapan/pesanan/cancel/' + sku)
                .then(alert("Hapus Pesanan Sukses"), window.location.href = "/daftarPesanan")

            },
            formSubmit() {

            }
        }
    }
</script>

<style scoped>

</style>