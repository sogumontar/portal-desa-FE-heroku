<template>
    <div>
        <p>List Desa</p>
        <div v-if="desa.length!=0" class="row container">
            <b-row class="container"  v-for="desa in desa" :key="desa.sku" >
                <b-col  col lg="1" >
                </b-col>
                <b-col  col lg="5" >
                    <router-link  :to="'/detailDesaAdmin/'+desa.nama"><h5>Desa {{desa.nama}}</h5></router-link>
                </b-col>
                <b-col col lg="2">
                     <p>Kecamatan  {{desa.kecamatan}}</p>
                </b-col>
            </b-row>
            <br>
        </div>
        <div v-else>
            <center><img src="../../assets/gif/25.gif" alt=""></center>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "ListDesa",
        mounted() {
            this.loadData()
        },
        data(){
            return {
                desa : []
            }
        },
        methods: {
            async loadData(){
                const response = await axios.get('https://portal-desa.herokuapp.com/desa/')
                this.desa = response.data
            }
        }
    }
</script>

<style scoped>

</style>