<template>
    <b-container>
        <h1 class="judul mt-3">Detail Penginapan</h1>
        <hr>
        <b-row  v-for="populer in populer" v-bind:key="populer.nama" class="mt-5 margin-kiri">
            <b-col cols="12" col lg="5" md="6" sm="12">
                <b-img :src="populer.foto" class="gambar-populer"></b-img>
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
                        <h5>{{ populer.nama }}</h5>
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
                        <h5>Rp. {{ populer.harga | numFormat }} / hari</h5>
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
                        <h5>{{ populer.alamat }}</h5>
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
                        <h5>{{ populer.kamarTersedia}} / {{ populer.jumlahKamar }} Kamar</h5>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row class="margin-kiri margin-atas">
            <b-col >
                <h4 >Deskripsi</h4>
            </b-col>
        </b-row>
        <b-row v-for="populer in populer" v-bind:key="populer.nama" class="margin-kiri">
            <b-col col lg="10">
                <p style="text-align: justify">{{ populer.deskripsi }}</p>
            </b-col>
        </b-row>

        <hr>

        <b-form @submit="pesanPenginapan" class="mt-5">
            <b-form-row class="justify-content-sm-center">
                <b-col cols="3" col md="2" sm="2" lg="2" class="mt-2">
                    <p>Masuk</p>
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
                    <p>Keluar</p>
                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                    <p>:</p>
                </b-col>
                <b-col cols="8" col md="5" lg="4" sm="7">
                    <b-form-datepicker
                            id="tanggal-keluar"
                            v-model="dataMenginap.keluar"
                            required
                            placeholder="Pilih tanggal keluar"
                    ></b-form-datepicker>
                </b-col>
            </b-form-row>

            <b-form-row class="justify-content-sm-center mt-3">
                <b-col cols="3" col md="2" sm="2" lg="2" class="mt-2">
                    <p>Jumlah Orang</p>
                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                    <p>:</p>
                </b-col>
                <b-col cols="8" col md="5" lg="4" sm="7">
                    <b-form-input
                            id="jumlah-orang"
                            v-model="dataMenginap.jumlahOrang"
                            required
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
                            id="jumlah-kamar"
                            v-model="dataMenginap.jumlahKamar"
                            required
                            type="number"
                    ></b-form-input>
                </b-col>
            </b-form-row>
            <b-form-row class="justify-content-sm-center mt-3 mb-5">
                <b-button type="submit" variant="primary" v-if="authenticated">Pesan Penginapan</b-button>
                <router-link to="/login" v-else class="btn btn-primary">Login</router-link>
                <br>

            </b-form-row>

        </b-form>
    </b-container>
</template>

<script>
    export default {
        name: "JdetailPenginapanPage",
        data(){
            var val=false;
            if(localStorage.getItem('token')){
                val=true
            }
            return{
                populer : [
                    {
                        'nama' : 'Penginapan 1',
                        'alamat' : 'Balige, Toba, Sumatera Utara',
                        'foto' : 'https://s1.bukalapak.com/uploads/content_attachment/13aa121810e8d76210ec1fb5/w-744/penginapan_murah_di_batu_malang.jpg',
                        'deskripsi' : 'Penginapan ini sangat bagus, pemandangan yang ada disini sangat indah, udaranya juga sangat segar karena banyak' +
                            'pepohonan yang lebat. Alam disini masih alami dan belom ada dirusak manusia. Lorem ipsum dolor sit amet, consectetur adipiscing ' +
                            'elit. Phasellus commodo accumsan velit sed fermentum. Maecenas vehicula tellus sed orci fringilla congue. Morbi eu pretium neque. ' +
                            'Proin feugiat nibh orci, eu convallis velit ultrices non. Pellentesque tempus consectetur porttitor. Vivamus consequat varius ' +
                            'ex a pellentesque. Aenean pulvinar orci a mauris consectetur euismod. Ut semper, lectus eget feugiat porta, turpis dui consectetur ' +
                            'orci, eu porttitor felis libero eu arcu. Suspendisse potenti. Nullam imperdiet orci ac mauris lobortis viverra. In libero est, ' +
                            'aliquam at elementum ultricies, mollis ut sapien. Fusce varius, orci sit amet sollicitudin luctus, tortor diam tincidunt nisl, ' +
                            'nec sodales nulla purus vel mauris. Nulla eu nisl et turpis ultricies placerat. Aliquam eget augue eu enim lobortis vehicula. ' +
                            'Quisque a blandit diam. Sed eu vehicula augue, id tincidunt augue.',
                        'harga' : 500000,
                        'jumlahKamar' : 20,
                        'kamarTersedia' : 20,
                    }
                ],
                dataMenginap: {
                    masuk: "",
                    keluar: "",
                    jumlahOrang: 0,
                    jumlahKamar: 0,
                },
                authenticated: val,
            }
        },
        methods: {
            pesanPenginapan(){

            }
        }
    }
</script>

<style scoped>
    .judul{
        text-align: left;
        font-family: "Arial Black";
    }

    @media only screen and (max-width: 600px) {
        .gambar-populer{
            width: 400px;
        }
        .keterangan-populer{
            margin-top: 20px;
        }
        .margin-kiri{
            margin-left: 15px;
        }
        .margin-atas{
            margin-top: 20px;
        }

    }

    /* Small devices (portrait tablets and large phones, 600px and up) */
    @media only screen and (min-width: 600px) {
        .gambar-populer{
            width: 400px;
        }
        .keterangan-populer{
            margin-top: 20px;
        }
        .margin-kiri{
            margin-left: 15px;
        }
        .margin-atas{
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