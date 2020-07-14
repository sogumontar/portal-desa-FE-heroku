<template>
    <b-container>
        <h1 class="judul mt-3">Detail Penginapan</h1>
        <hr>
        <b-row class="mt-5 margin-kiri">
            <b-col cols="12" col lg="5" md="6" sm="12">
                <b-img :src="'https://portal-desa.herokuapp.com'+data.gambar" class="gambar-populer"></b-img>
            </b-col>
            <b-col col lg="6" cols="12" class="keterangan-populer">
                <b-row>
                    <b-col cols="3" col lg="4">
                        <h5>Nama</h5>
                    </b-col>
                    <b-col cols="auto" col lg="auto">
                        <h5>:</h5>
                    </b-col>
                    <b-col cols="auto" col lg="auto">
                        <h5>{{ data.nama }}</h5>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col cols="3" col lg="4">
                        <h5>Harga</h5>
                    </b-col>
                    <b-col cols="auto" col lg="auto">
                        <h5>:</h5>
                    </b-col>
                    <b-col cols="auto" col lg="auto">
                        <h5>Rp. {{ data.harga | numFormat }} / hari</h5>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col cols="3" col lg="4">
                        <h5>Lokasi</h5>
                    </b-col>
                    <b-col cols="auto" col lg="auto">
                        <h5>:</h5>
                    </b-col>
                    <b-col cols="auto" col lg="auto">
                        <h5>{{ data.lokasi }}</h5>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col cols="3" col lg="4">
                        <h5>Jumlah Kamar Tersedia</h5>
                    </b-col>
                    <b-col cols="auto" col lg="auto">
                        <h5>:</h5>
                    </b-col>
                    <b-col cols="auto" col lg="auto">
                        <h5>{{ data.jumlahKamar }} Kamar</h5>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="3" col lg="4">
                        <h5>Desa</h5>
                    </b-col>
                    <b-col cols="auto" col lg="auto">
                        <h5>:</h5>
                    </b-col>
                    <b-col cols="auto" col lg="auto">
                        <h5>{{ data.desa }}</h5>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="3" col lg="4">
                        <h5>Kecamatan</h5>
                    </b-col>
                    <b-col cols="auto" col lg="auto">
                        <h5>:</h5>
                    </b-col>
                    <b-col cols="auto" col lg="auto">
                        <h5>{{ data.kecamatan }}</h5>
                    </b-col>
                </b-row>
            </b-col>
            <b-row class="margin-kiri margin-atas">
                <b-col>
                    <h4>Deskripsi : </h4>
                </b-col>
            </b-row>
            <b-col col lg="10">
                <p style="text-align: justify">{{ data.deskripsi }}</p>
            </b-col>

            <hr>
        </b-row>
        <div v-if="role === 'ROLE_MERCHANT' ">

            <div v-if=" data.skuMerchant === sku">
                <b-btn variant="danger" @click="hapus">Hapus</b-btn>&nbsp;&nbsp;&nbsp;
                <router-link class="btn btn-primary" :to="'/updatePenginapan/'+this.$route.params.sku">Update</router-link>
            </div>

        </div>
        <div v-else-if="role === 'ROLE_USER'">
            <b-form class="mt-5">
                <b-form-row class="justify-content-sm-center">
                    <b-col cols="3" col md="2" sm="2" lg="2" class="mt-2">
                        <p>Tanggal Check-in</p>
                    </b-col>
                    <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                        <p>:</p>
                    </b-col>
                    <b-col cols="8" col md="5" lg="4" sm="7">
                        <b-form-datepicker
                                id="tanggal-masuk"
                                v-model="dataMenginap.masuk"
                                required
                                placeholder="Pilih tanggal masuk"
                        ></b-form-datepicker>
                    </b-col>
                </b-form-row>


                <b-form-row class="justify-content-sm-center mt-3">
                    <b-col cols="3" col md="2" sm="2" lg="2" class="mt-2">
                        <p>Lama Menginap (Hari)</p>
                    </b-col>
                    <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                        <p>:</p>
                    </b-col>
                    <b-col cols="8" col md="5" lg="4" sm="7">
                        <b-form-input
                                id="jumlah-orang"
                                v-model="dataMenginap.jumlahOrang"
                                required
                                min="0"
                                type="number"
                        ></b-form-input>
                    </b-col>
                </b-form-row>

                <b-form-row class="justify-content-sm-center mt-3">
                    <b-col cols="3" col md="2" sm="2" lg="2" class="mt-2">
                        <p>Jumlah Kamar</p>
                    </b-col>
                    <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                        <p>:</p>
                    </b-col>
                    <b-col cols="8" col md="5" lg="4" sm="7">
                        <b-form-input
                                id="jumlah-orang"
                                v-model="dataMenginap.jumlahKamar"
                                required
                                min="0"
                                type="number"
                        ></b-form-input>
                    </b-col>
                </b-form-row>

                <b-form-row class="justify-content-sm-center mt-3">
                    <b-col cols="3" col md="2" sm="2" lg="2" class="mt-2">
                        <p>Jenis Kamar</p>
                    </b-col>
                    <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                        <p>:</p>
                    </b-col>
                    <b-col cols="8" col md="5" lg="4" sm="7">
                        <select class="form-control">
                            <option> Standard Room</option>
                            <option> Deluxe Room</option>
                        </select>
                    </b-col>
                </b-form-row>

                <b-form-row class="justify-content-sm-center mt-3">
                    <b-col cols="3" col md="2" sm="2" lg="2" class="mt-2">
                        <p>Metode Pembayaran</p>
                    </b-col>
                    <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                        <p>:</p>
                    </b-col>
                    <b-col cols="8" col md="5" lg="4" sm="7">
                        <section>
                            <br>
                            <input type="radio" v-model="metode" value="ATM Mandiri">Atm Mandiri
                            <input type="radio" v-model="metode" value="Atm BRI">Atm BRI
                            <br>
                            <div v-if="metode === 'Atm BRI' ">
                                <img src="./../assets/pict/atm.png" alt="">
                            </div>
                            <div v-else-if="metode === 'ATM Mandiri' ">
                                <img src="./../assets/pict/mandiri.png" alt="">
                            </div>
                        </section>

                    </b-col>
                </b-form-row>
                <b-form-row class="justify-content-sm-center mt-3 mb-5">


                </b-form-row>

            </b-form>
            <b-button type="submit" variant="primary" @click="pesanPenginapan" v-if="authenticated">Pesan Penginapan</b-button>
            <router-link to="/login" v-else class="btn btn-primary">Login</router-link>
            <br>
        </div>
    </b-container>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "JdetailPenginapanPage",
        mounted() {
            this.load()
        },
        data() {
            var val = false;
            if (localStorage.getItem('token')) {
                val = true
            }
            return {
                populer: [],
                data: [],
                role: localStorage.getItem("role"),
                sku: localStorage.getItem("sku"),
                metode: '',
                desa:[],
                dataMenginap: {
                    masuk: "",
                    keluar: "",
                    jumlahOrang: 0,
                    jumlahKamar: 0,
                    jenisKamar: '',
                },
                authenticated: val,
            }
        },
        methods: {
            async pesanPenginapan() {
                const response = await axios.post('https://portal-desa.herokuapp.com/transaksiPenginapan/add', {
                    id : " ",
                    skuProduk : this.$route.params.sku,
                    skuCustomer: this.sku,
                    harga: this.data.harga,
                    metode: this.metode,
                    lamaMenginap: this.dataMenginap.jumlahOrang,
                    checkin: this.dataMenginap.masuk,
                    resi: "",
                    status: 1,
                    kodePemesanan : ""
                }).then(alert("Pesan Penginapan Sukses"))

                console.log(response)
            },
            async load() {
                const response = await axios.get('https://portal-desa.herokuapp.com/penginapan/' + this.$route.params.sku)
                this.data = response.data
                console.log(this.data)
                const responses =await axios.get('https://portal-desa.herokuapp.com/desa/desa/skuAdmin/' + this.data.skuDesa)
                this.desa=responses.data
                console.log(this.desa)
            },
            async hapus(){
                await axios.put('https://portal-desa.herokuapp.com/penginapan/delete/' + this.$route.params.sku)
                .then((response) => {
                    console.log(response)
                    alert("Hapus Penginapan Sukses"), window.location.href="/penginapan"
                })
            }

        }
    }
</script>

<style scoped>
    .judul {
        text-align: left;
        font-family: "Arial Black";
    }

    @media only screen and (max-width: 600px) {
        .gambar-populer {
            width: 400px;
        }

        .keterangan-populer {
            margin-top: 20px;
        }

        .margin-kiri {
            margin-left: 15px;
        }

        .margin-atas {
            margin-top: 20px;
        }

    }

    /* Small devices (portrait tablets and large phones, 600px and up) */
    @media only screen and (min-width: 600px) {
        .gambar-populer {
            width: 400px;
        }

        .keterangan-populer {
            margin-top: 20px;
        }

        .margin-kiri {
            margin-left: 15px;
        }

        .margin-atas {
            margin-top: 20px;
        }
    }

    /* Medium devices (landscape tablets, 768px and up) */
    @media only screen and (min-width: 768px) {

    }

    /* Large devices (laptops/desktops, 992px and up) */
    @media only screen and (min-width: 992px) {

    }

    /* Extra large devices (large laptops and desktops, 1200px and up) */
    @media only screen and (min-width: 1200px) {

    }

</style>
