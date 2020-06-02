<template>
    <div class="row container">
        <div class="col-md-12">
            <b-btn variant="s"><router-link to="/artikel">Artikel</router-link></b-btn>&nbsp;&nbsp;
            <b-btn variant="s"><router-link to="/berita">Berita</router-link></b-btn>&nbsp;&nbsp;
            <b-btn variant="primary"><router-link to="/pengumuman" >Pengumuman</router-link></b-btn>
            <br><br><br>
            <div class="container">
                <div class="card">
                    <br><br><br><br>
                    <b-card-text v-for="artikel in artikel" :key="artikel.id">
                        <div >
                            <p>Judul : {{artikel[0].judul}}</p>
                            <div v-if="artikel[0].isi.length >50">
                                <p>Isi : {{artikel[0].isi}}...</p>
                            </div>
                            <div v-else>
                                <p>Isi : {{artikel[0].isi}}</p>
                            </div>
                            <p>Penulis : {{artikel[0].penulis}}</p>
                            <p>Sumber : {{artikel[0].sumber}}</p>
                            <p>Kecamatan : {{artikel[1].kecamatan}}</p>
                            <p>Desa : {{artikel[1].nama}}</p>
                            <b-btn variant="danger" @click="hapus(artikel[0].id)">Hapus</b-btn>
                        </div>
                    </b-card-text>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import axios from "axios";

    export default {
        name: "PengumumanPage",
        data() {
            return {
                artikel: [],
            }
        },
        async mounted() {
            this.load()
        },
        methods: {
            async load() {
                const response = await axios.get('https://portal-desa.herokuapp.com/artikel/web/')
                this.artikel = response.data
                console.log(this.artikel)
            },
            async hapus(sku) {
                await axios.delete('https://portal-desa.herokuapp.com/artikel/delete/' + sku)
                    .then(alert("Hapus Artikel Sukses")),
                    window.location.href = "/artikelAll"
            }
        }
    }
</script>

<style scoped>

</style>