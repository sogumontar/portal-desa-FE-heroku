<template>
    <b-container>
        <h1 class="judul mt-3">Tambah Penginapan</h1>
        <hr>
        <b-form class="mt-5">
            <b-form-row class="justify-content-sm-center">
                <b-col cols="3" col md="2" sm="2" lg="2" class="mt-2">
                    <p>Nama Penginapan</p>
                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                    <p>:</p>
                </b-col>
                <b-col cols="8" col md="5" lg="4" sm="7">
                    <b-form-input
                            id="input-nama"
                            v-model="namaPenginapan"
                            required
                            type="text"
                    ></b-form-input>
                </b-col>
            </b-form-row>

            <b-form-row class="justify-content-sm-center mt-3">
                <b-col cols="3" col md="2" sm="2" lg="2" class="mt-2">
                    <p>Deskripsi Penginapan</p>
                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                    <p>:</p>
                </b-col>
                <b-col cols="8" col md="5" lg="4" sm="7">
                    <b-form-textarea
                            id="input-deskripsi"
                            v-model="deskripsiPenginapan"
                            required
                            rows="4"
                            size="lg"
                    ></b-form-textarea>
                </b-col>
            </b-form-row>

            <b-form-row class="justify-content-sm-center mt-3">
                <b-col cols="3" col md="2" sm="2" lg="1" class="mt-2">
                    <p>Gambar</p>
                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                    <p>:</p>
                </b-col>
            </b-form-row>

            <b-form-row class="justify-content-sm-center mt-3">
                <b-col cols="3" col md="2" sm="2" lg="2" class="mt-2">
                    <!--                    <p>Foto Penginapan</p>-->
                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                    <!--                    <p>:</p>-->
                </b-col>
                <b-col cols="8" col md="5" lg="4" sm="7">
                    <div v-if="!gambar">

                        <b-form-file
                                @change="onFileChange"
                                id="input-foto"
                                v-model="gambar"
                                required
                                placeholder="Pilih Foto Penginapan"
                                drop-placeholder="Pilih Foto"
                        ></b-form-file>
                    </div>
                    <div v-else>
                        <img :src="gambar" width="120" height="100"/>
                    </div>
                </b-col>
            </b-form-row>

            <b-form-row class="justify-content-sm-center mt-3">
                <b-col cols="3" col md="2" sm="2" lg="2" class="mt-2">
                    <p>Alamat Penginapan</p>
                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                    <p>:</p>
                </b-col>
                <b-col cols="8" col md="5" lg="4" sm="7">
                    <b-form-textarea
                            id="input-deskripsi"
                            v-model="alamatPenginapan"
                            required
                            rows="4"
                            size="lg"
                    ></b-form-textarea>
                </b-col>
            </b-form-row>

            <b-form-row class="justify-content-sm-center mt-3">
                <b-col cols="3" col md="2" sm="2" lg="2" class="mt-2">
                    <p>Harga Penginapan</p>
                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                    <p>:</p>
                </b-col>
                <b-col cols="8" col md="5" lg="4" sm="7">
                    <b-form-input
                            id="input-nama"
                            v-model="hargaPenginapan"
                            placeholder="Rp. "
                            required
                            type="text"
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
                            id="input-nama"
                            v-model="jumlahKamar"
                            required
                            type="number"
                    ></b-form-input>
                </b-col>
            </b-form-row>

        </b-form>

        <b-form-row class="justify-content-md-center">
            <b-col col md="4" lg="2">

            </b-col>
            <b-col col md="2" lg="auto">

            </b-col>
            <b-col col md="auto" lg="auto" class="mt-3">
                <button @click="addPenginapan" class="justify-content-sm-center mt-3 mb-5 btn btn-primary">Tambah</button>
            </b-col>
        </b-form-row>
    </b-container>
</template>

<script>
    import axios from "axios";

    export default {
        name: "JformTambahPenginapan",
        async mounted() {
            const response = await axios.get('https://portal-desa.herokuapp.com/desa/desa/skuAdmin/' + this.sku)
            this.desa = response.data.data
            console.log(this.desa.kecamatan)
        },
        data() {
            return {
                namaPenginapan: "",
                deskripsiPenginapan: "",
                alamatPenginapan: "",
                gambarPenginapan: "",
                hargaPenginapan: "",
                jumlahKamar: "",
                gambar: '',
                selectedFile: null,
                desa: '',
                sku: localStorage.getItem('sku')

            }

        },
        methods: {
            async addPenginapan() {
                console.log(this.namaPenginapan)
                console.log(this.hargaPenginapan)
                console.log(this.deskripsiPenginapan)
                console.log(this.jumlahKamar)
                console.log(this.alamatPenginapan)
                console.log(localStorage.getItem("sku"))
                axios.post('https://portal-desa.herokuapp.com/penginapan/add', {
                    nama: this.namaPenginapan,
                    harga: this.hargaPenginapan,
                    deskripsi: this.deskripsiPenginapan,
                    jumlahKamar: this.jumlahKamar,
                    desa: this.desa.nama,
                    kecamatan: this.desa.kecamatan,
                    lokasi: this.alamatPenginapan,
                    skumerchant: localStorage.getItem("sku")
                }).then((resposnse) => {
                    console.log(resposnse)
                    alert("Tambah penginapan sukses"), window.location.href = '/penginapan'
                })
            },
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                console.log(e.target.files)
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                // eslint-disable-next-line no-unused-vars
                var image = new Image();
                var reader = new FileReader();
                var vm = this
                reader.onload = (e) => {
                    vm.image = e.target.result;
                    console.log(e.target.result)
                    axios.post('https://portal-desa.herokuapp.com/penginapan/penginapan/add/gambar', {
                        gambar: reader.result,
                        nama: localStorage.getItem('sku')
                    }).then((response) => {
                        console.log(response)
                        alert("Add Desa Pict success")
                        // this.$router.push({name: 'daftarAdmin'})
                    })
                };
                reader.readAsDataURL(file);

            },
            removeImage: function () {
                this.image = '';
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
