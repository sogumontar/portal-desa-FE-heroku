<template>
    <div>
        <p>List Desa</p>
        <div class="search-wrapper panel-heading col-sm-12">
            <input class="form-control" type="text" v-model="searchQuery" placeholder="Search" />
        </div>
        <div v-if="desa.length!=0" class="row container">
            <b-row class="container"  v-for="desa in filteredResources" :key="desa.sku" >
                <b-col  col lg="1" >
                </b-col>
                <b-col  col lg="5" >
                    <router-link  :to="'/detailDesaAdmin/'+desa.nama"><h5>{{desa.nama}}</h5></router-link>
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
                desa : [],
                searchQuery:''
            }
        },
        methods: {
            async loadData(){
                const response = await axios.get('https://portal-desa.herokuapp.com/desa/')
                this.desa = response.data
            }
        },
        computed: {
            filteredResources (){
                if(this.searchQuery){
                    return this.desa.filter((desa)=>{
                        return this.searchQuery.toLowerCase().split(' ').every(v => desa.nama.toLowerCase().includes(v))
                        // return item.nama.startsWith(this.searchQuery);
                    })
                }else{
                    return this.desa;
                }
            }
        }
    }
</script>

<style scoped>

</style>