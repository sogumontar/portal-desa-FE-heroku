<template>
    <div class="row container">
        <div class="col-md-12">
            <br><br>
            <b-btn variant="s">
                <router-link to="/artikel">Artikel</router-link>
            </b-btn>&nbsp;&nbsp;
            <b-btn variant="primary">Berita</b-btn>&nbsp;&nbsp;
            <b-btn variant="s">
                <router-link to="/pengumuman">Pengumuman</router-link>
            </b-btn>
            <br><br><br>
            <div class="container">
                <div class="card">
                    <br><br><br><br>
                    <b-card-text v-for="artikel in artikel" :key="artikel.id">
                        <p style="margin-left: 133px;"><i><b>{{artikel[0].date}}</b></i></p>
                        <center>
                            <b-row>
                                <div v-if="artikel === null">
                                    <b-col>
                                        <h3 style="text-align: center">Artikel Tidak Ada</h3>
                                    </b-col>
                                </div>
                                <div v-else>
                                    <b-col cols="12" col lg="9">
                                        <h3>{{ artikel[0].judul }}</h3>
                                        <p>Penulis: {{ artikel[0].penulis }}, {{ artikel[1].nama }}, {{
                                            artikel[1].kecamatan }}</p>
                                        <p style="text-align: justify">{{artikel[0].isi}}</p>
                                    </b-col>
                                </div>
                            </b-row>
                            <b-btn variant="danger" @click="hapus(artikel[0].id)" class="mb-3">Hapus Artikel</b-btn>
                        </center>
                    </b-card-text>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import axios from "axios";

    export default {
        name: "BeritaPage",
        data() {
            return {
                tab: 1,
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
