<template>
    <b-container>
        <b-form  class="mt-5">
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

        <button @click="addPenginapan" class="justify-content-sm-center mt-3 mb-5 btn btn-primary">Tambah</button>
    </b-container>
</template>

<script>
    import axios from "axios";

    export default {
        name: "JformTambahPenginapan",
        data() {
            return {
                namaPenginapan: "",
                deskripsiPenginapan: "",
                alamatPenginapan: "",
                gambarPenginapan: "",
                hargaPenginapan: "",
                jumlahKamar: "",
                gambar: '',
                selectedFile: null

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
                    desa:'Pintubatu',
                    Kecamatan:'Silaen',
                    lokasi: this.alamatPenginapan,
                    skumerchant: localStorage.getItem("sku")
                }).then(alert("Tambah penginapan sukses"), window.location.href='/penginapan')
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
                var vm=this
                reader.onload = (e) => {
                    vm.image = e.target.result;
                    console.log(e.target.result)
                    axios.post('https://portal-desa.herokuapp.com/penginapan/penginapan/add/gambar', {
                        gambar: reader.result,
                        nama: localStorage.getItem('sku')
                    }).then(
                        alert("Add Desa Pict success")
                        // this.$router.push({name: 'daftarAdmin'})
                    )
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

</style>