import Vue from "vue";
import VueRouter from "vue-router";
import JhomePage from "../views/JhomePage.vue";
import DesaPage from "../views/DesaPage";
import ProductPage from "../views/ProductPage";
import JloginPage from "../views/JloginPage";
import JregisterPage from "../views/JregisterPage";
import CreateProdukForm from "../views/form/CreateProdukForm";
import DetailKecamatanPage from "../views/DetailKecamatanPage";
import DaftarAdminDesa from "../views/form/DaftarAdminDesa";
import FormDetailDesa from "../views/form/FormDetailDesa";
import Dashboard from "../views/admin/Dashboard";
import ListAccount from "../views/admin/ListAccount";
import ListDesa from "../views/admin/ListDesa";
import DetailDesaAdmin from "../views/admin/DetailDesaAdmin";
import DetailProdukPage from "../views/DetailProdukPage";
import FormBeliProduk from "../views/form/FormBeliProduk";
import DaftarPesananCustomer from "../views/customer/DaftarPesananCustomer";
import KeranjangPage from "../views/KeranjangPage";
import JpenginapanPage from "../views/JpenginapanPage";
import JformTambahPenginapan from "../views/form/JformTambahPenginapan";
import JdetailPenginapanPage from "../views/JdetailPenginapanPage";
import JdetailDesa from "../views/JdetailDesa";
import ProductPerMerchant from "../views/ProductPerMerchant";
import PenginapanPerMerchant from "../views/PenginapanPerMerchant";
import JartikelPage from "../views/JartikelPage";
import ArtikelPage from "../views/ArtikelPage";
import BeritaPage from "../views/BeritaPage";
import PengumumanPage from "../views/PengumumanPage";
import UpdateProduk from "../views/form/UpdateProduk";
import UpdatePenginapan from "../views/form/UpdatePenginapan";
import MerchantPenginapan from "../views/Merchant/MerchantPenginapan";
import MerchantProduk from "../views/Merchant/MerchantProduk";
import Search from "../views/Search";
import ProfilePage from "../views/ProfilePage";
import UpdateDetailDesaForm from "../views/form/UpdateDetailDesaForm";
import GantiPasswordPage from "../views/form/GantiPasswordPage";
import LupaPasswordPage from "../views/form/LupaPasswordPage";
import VerifikasiCodePage from "../views/form/VerifikasiCodePage";
import CreateArtikel from "../views/form/CreateArtikel";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: JhomePage
    },
    {
        path: "/createArtikel",
        name: "CreateArtikel",
        component: CreateArtikel
    },
    {
        path: "/verifikasiCode",
        name: "VerifikasiCode",
        component: VerifikasiCodePage
    },
    {
        path: "/lupaPassword",
        name: "LupaPassword",
        component: LupaPasswordPage
    },
    {
        path: "/gantiPassword",
        name: "GantiPassword",
        component: GantiPasswordPage
    },
    {
        path: "/updateDesa/:sku",
        name: "UpdateDesa",
        component: UpdateDetailDesaForm
    },
    {
        path: "/profile",
        name: "Profile",
        component: ProfilePage
    },
    {
        path: "/search",
        name: "Search",
        component: Search
    },
    {
        path: "/updatePenginapan/:sku",
        name: "UpdatePenginapan",
        component: UpdatePenginapan
    },
    {
        path: "/merchantProduk",
        name: "MerchantProduk",
        component: MerchantProduk
    },
    {
        path: "/merchantPenginapan",
        name: "MerchantPenginapan",
        component: MerchantPenginapan
    },
    {
        path: "/updateProduk/:sku",
        name: "UpdateProduk",
        component: UpdateProduk
    },
    {
        path: "/pengumuman",
        name: "Pengumuman",
        component: PengumumanPage
    },
    {
        path: "/berita",
        name: "Berita",
        component: BeritaPage
    },
    {
        path: "/artikel",
        name: "ArtikelPage",
        component: ArtikelPage
    },
    {
        path: "/penginapanPerMerchant/:namaDesa/:skuMerchant",
        name: "PenginapanPerMerchant",
        component: PenginapanPerMerchant
    },
    {
        path: "/productPerMerchant/:namaDesa/:skuProduk",
        name: "ProductPerMerchant",
        component: ProductPerMerchant
    },
    {
        path: "/keranjang",
        name: "keranjang",
        component: KeranjangPage
    },
    {
        path: "/daftarPesanan",
        name: "daftarPesanan",
        component: DaftarPesananCustomer
    },
    {
        path: "/beliProduk/:sku",
        name: "beliProduk",
        component: FormBeliProduk
    },
    {
        path: "/detailProduk/:sku",
        name: "DetailProduk",
        component: DetailProdukPage
    },
    {
        path: "/detailDesaAdmin/:sku",
        name: "detailDesaAdmin",
        component: DetailDesaAdmin
    },
    {
        path: "/admin/desa",
        name: "adminDesa",
        component: ListDesa
    },
    {
        path: "/admin/account",
        name: "account",
        component: ListAccount
    },
    {
        path: "/admin",
        name: "admin",
        component: Dashboard
    },
    {
        path: "/detailDesa",
        name: "detailDesa",
        component: FormDetailDesa
    },
    {
        path: "/daftarAdmin",
        name: "daftarAdmin",
        component: DaftarAdminDesa
    },
    {
        path: "/detailKecamatan/:sku",
        name: "DetailKecamatan",
        component: DetailKecamatanPage
    },
    {
        path: "/createProduk",
        name: "createProduk",
        component: CreateProdukForm
    },
    {
        path: "/register",
        name: "Register",
        component: JregisterPage
    },
    {
        path: "/login",
        name: "Login",
        component: JloginPage
    },
    {
        path: "/produk",
        name: "ProductPage",
        component: ProductPage
    },
    {
        path: "/desa",
        name: "DesaPage",
        component: DesaPage
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue")
    },
    {
        path: "/penginapan",
        name: "JpenginapanPage",
        component: JpenginapanPage
    },
    {
        path: "/penginapan/create",
        name: "JformTambahPenginapan",
        component: JformTambahPenginapan
    },
    {
        path: "/penginapan/detail/:sku",
        name: "JdetailPenginapanPage",
        component: JdetailPenginapanPage
    },
    {
        path: "/detailDesa/:sku",
        name: "JdetailDesa",
        component: JdetailDesa
    },
    {
        path: "/detailDesa/artikel/:sku",
        name: "JartikelPage",
        component: JartikelPage
    },
    {
        path: "/artikelAll/",
        name: "Artikel",
        component: ArtikelPage
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
