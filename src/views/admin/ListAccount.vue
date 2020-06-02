<template>
    <div>
        <b-container class="mt-3">
            <div v-if="accountMerchant.length!=0">
                <h2>Daftar Account Admin Desa</h2>
                <b-row class="justify-content-lg-center">
                    <b-col>
                        <b-table
                                id="my-table"
                                :items="accountMerchant"
                                :per-page="perPage"
                                :current-page="currentMerchantPage"
                                :fields="fields"
                        ></b-table>
                    </b-col>
                </b-row>

                <b-row class="justify-content-lg-center">
                    <b-col col >
                        <b-pagination
                                v-model="currentMerchantPage"
                                :total-rows="rows_merchant"
                                :per-page="perPage"
                                aria-controls="my-table"
                        ></b-pagination>
                    </b-col>
                </b-row>


                <h2 class="mt-5">Daftar Account Customer</h2>
                <b-row class="justify-content-lg-center">
                    <b-col>
                        <b-table
                                id="my-table-customer"
                                :items="accountCustomer"
                                :per-page="perPage"
                                :current-page="currentCustomerPage"
                                :fields="fields_customer"
                        ></b-table>
                    </b-col>
                </b-row>
                <b-row class="justify-content-lg-center">
                    <b-col>
                        <b-pagination
                                v-model="currentCustomerPage"
                                :total-rows="accountCustomer.length"
                                :per-page="perPage"
                                aria-controls="my-table-customer"
                        ></b-pagination>
                    </b-col>
                </b-row>
            </div>

            <div v-else>
                <p>Daftar Account Admin Desa</p>
                <div class="overflow-auto">
                    <center><img src="../../assets/gif/25.gif" alt=""></center>
                </div>
                <p>Daftar Account Customer</p>
                <div class="overflow-auto">
                    <center><img src="../../assets/gif/25.gif" alt=""></center>
                </div>
            </div>
        </b-container>
    </div>

</template>

<script>
    import axios from "axios";
    export default {
        name: "ListAccount",
        mounted(){
            this.loadData()
        },
        data(){
            return {
                fields : ['name', 'alamat', 'username', 'email'],
                fields_customer : ['name', 'alamat', 'username', 'email'],
                perPage: 5,
                currentMerchantPage: 1,
                accountMerchant : [],
                accountCustomer : [],
                currentCustomerPage: 1
            }
        },
        methods : {
            async loadData(){
                const response = await axios.get('https://portal-desa.herokuapp.com/adminDev/account/merchant')
                this.accountMerchant = response.data
                const responses = await axios.get('https://portal-desa.herokuapp.com/adminDev/account/customer')
                this.accountCustomer=responses.data
                console.log(responses.data)
            },
        },
        computed: {
            rows_merchant (){
                return this.accountMerchant.length
            }
        }
    }

</script>

<style scoped>

</style>