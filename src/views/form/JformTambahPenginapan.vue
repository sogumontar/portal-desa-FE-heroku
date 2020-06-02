<template>
    <b-container>
        <b-form @submit="addPenginapan" class="mt-5">
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
                <b-col cols="3" col md="2" sm="2" lg="2" class="mt-2">
                    <!--                    <p>Foto Penginapan</p>-->
                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                    <!--                    <p>:</p>-->
                </b-col>
                <b-col cols="8" col md="5" lg="4" sm="7">
                    <b-form-file
                            @change="onFileChange"
                            id="input-foto"
                            v-model="gambar"
                            required
                            placeholder="Pilih Foto Penginapan"
                            drop-placeholder="Pilih Foto"
                    ></b-form-file>
                    <img v-if="gambar" :src="gambar" width="120" height="100" />
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
                            v-model="lokasiPenginapan"
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
            <b-form-row class="justify-content-sm-center mt-3 mb-5">
                <b-button type="submit" variant="primary">Tambah</b-button>
            </b-form-row>

        </b-form>
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
                gambar:''

            }

        },
        methods: {
            async addPenginapan() {
                axios.post('https://portal-desa.herokuapp.com/penginapan/add', {
                    nama: this.nama,
                    harga: this.harga,
                    deskripsi: this.deskripsi,
                    skuDesa: localStorage.getItem("sku")
                }, error => {
                    console.error(error);
                })
                    // eslint-disable-next-line no-unused-vars
                    .then(function (response) {

                        alert("Tambah Produk Sukses"),
                            window.location.href = "/produk"
                        // this.$router.go('ProductPage')
                    })
                    .then(function () {
                        this.$router.push({name: 'ProductPage'})
                    })
                    .then(function () {
                        console.log("telah ke sini")
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
                var vm = this;
                reader.onload = (e) => {
                    vm.image = e.target.result;
                    console.log(e.target.result)
                    axios.post('https://portal-desa.herokuapp.com/produk/add/gambar', {
                        gambar : reader.result,
                        nama : localStorage.getItem('sku')
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