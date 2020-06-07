<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <!--            <b-navbar-brand href="#">{{ nama }}</b-navbar-brand>-->

            <b-navbar-toggle target="nav-collapse2"></b-navbar-toggle>

            <b-collapse id="nav-collapse2" is-nav>
                <b-navbar-nav class="">
                    <b-nav-item class="mr-3"><b-link :to="'/detailDesa/'+desa.nama" style="color: white">Home</b-link></b-nav-item>
                    <b-nav-item class="mr-3"><b-link :to="'/detailDesa/artikel/'+desa.nama" style="color: white">Artikel</b-link></b-nav-item>
                    <b-nav-item class="mr-3"><b-link :to="'/productPerMerchant/'+desa.nama+'/'+desa.skuAdmin" style="color: white">Produk</b-link></b-nav-item>
                    <b-nav-item class="mr-3"><b-link :to="'/penginapanPerMerchant/'+desa.nama+'/'+desa.skuAdmin" style="color: white">Penginapan</b-link></b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <b-container>
            <b-card body-class="text-center" header-tag="nav" class="mt-5">
                <template v-slot:header>
                    <b-nav card-header tabs>
                        <b-nav-item v-bind:active="tab === 1" v-on:click="tab1">Artikel</b-nav-item>
                        <b-nav-item v-bind:active="tab === 2" v-on:click="tab2">Berita</b-nav-item>
                        <b-nav-item v-bind:active="tab === 3" v-on:click="tab3">Pengumuman</b-nav-item>
                    </b-nav>
                </template>
                <div>
                    <p v-if="tab === 1" >Artikel</p>
                    <p v-else-if="tab === 2">Berita</p>
                    <p v-else>Pengumuman</p>

                </div>
                <div class="card">
                    <br><br><br><br>
                    <b-card-text v-for="artikel in artikel" :key="artikel[0].id">
                        <div>
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
            </b-card>
        </b-container>

    </div>

</template>

<script>
    import axios from "axios";

    export default {
        name: "JartikelPage",
        data(){
            return{
                tab:1,
                desa: [],
                sku : '',
                artikel :[]
            }
        },
        async mounted(){
          this.load()
        },
        methods:{
            async load(){
                const response = await axios.get('https://portal-desa.herokuapp.com/desa/' + this.$route.params.sku)
                this.desa = response.data
                this.sku = this.desa.skuAdmin
                console.log(this.desa)
            },
            async tab1(){
                this.tab=1
                const response = await axios.get('https://portal-desa.herokuapp.com/artikel/web/artikel' + this.sku)
                this.artikel=response.data
                console.log(this.artikel)
            },
            async tab2(){
                this.tab=2
                const response = await axios.get('https://portal-desa.herokuapp.com/artikel/web/berita' + this.sku)
                this.artikel=response.data
                console.log(this.artikel[0])
            },
            async tab3(){
                this.tab=3
                const response = await axios.get('https://portal-desa.herokuapp.com/artikel/web/pengumuman'+this.sku)
                this.artikel=response.data
                console.log(this.artikel)
            },
        }
    }
</script>

<style scoped>

</style>