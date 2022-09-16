//import Vue from 'vue'
import { createWebHistory, createRouter } from "vue-router";
//import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import About from '@/components/About'
import Cart from '@/components/Cart'
import Admin from '@/components/Admin'
import MyAccount from '@/components/MyAccount'
import UsersManager from '@/components/UsersManager'
import UserDetail from '@/components/UserDetail'
import PetsSetting from '@/components/PetsSetting'
import FoodSetting from '@/components/FoodSetting'
import AddPet from '@/components/AddPet'
import AddFood from '@/components/AddFood'
import UpdatePet from '@/components/UpdatePet'
import UpdateFood from '@/components/UpdateFood'
import Pets from '@/components/Pets'
import Food from '@/components/Food'
import PetInfo from '@/components/PetInfo'
import FoodInfo from '@/components/FoodInfo'
import Sales from '@/components/Sales'
import Request from '@/components/Request'
import Requests from '@/components/Requests'
import UpLoad from '@/components/UpLoad'
import SearchResult from '@/components/SearchResult'
import ChangePassword from '@/components/ChangePassword'
import ChangeProfile from '@/components/ChangeProfile'
import ChangeAvatar from '@/components/ChangeAvatar'

//Vue.use(Router)

// export default new Router({
//   mode: 'history',
//    routes: [
   const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/my-account/:id',
      name: 'MyAccount',
      component: MyAccount
    },
    {
      path: '/admin/',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/cart/',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/admin/pet/setting',
      name: 'PetsSetting',
      component: PetsSetting
    },
    {
      path: '/admin/food/setting',
      name: 'FoodSetting',
      component: FoodSetting
    },
    {
      path: '/admin/add-pet/',
      name: 'AddPet',
      component: AddPet
    },
    {
      path: '/admin/add-food/',
      name: 'AddFood',
      component: AddFood
    },
    {
      path: '/admin/update-pet/:id',
      name: 'UpdatePet',
      component: UpdatePet
    },
    {
      path: '/admin/update-food/:id',
      name: 'UpdateFood',
      component: UpdateFood
    },
    {
      path: '/admin/users-manager/',
      name: 'UsersManager',
      component: UsersManager
    },
    {
      path: '/admin/user-detail/:id',
      name: 'UserDetail',
      component: UserDetail
    },
    {
      path: '/admin/sales',
      name: 'Sales',
      component: Sales
    },
    {
      path: '/pets/',
      name: 'Pets',
      component: Pets
    },
    {
      path: '/food/',
      name: 'Food',
      component: Food
    },
    {
      path: '/pet/info/:id',
      name: 'PetInfo',
      component: PetInfo
    },
    {
      path: '/food/info/:id',
      name: 'FoodInfo',
      component: FoodInfo
    },
    {
      path: '/request/',
      name: 'Request',
      component: Request
    },
    {
      path: '/admin/requests/',
      name: 'Requests',
      component: Requests
    },
    {
      path: '/upload',
      name: 'UpLoad',
      component: UpLoad
    },
    {
      path: '/search/:search_request',
      name: 'SearchResult',
      component: SearchResult
    },
    {
      path: '/my-account/:id/change-password',
      name: 'ChangePassword',
      component: ChangePassword
    },
    {
      path: '/my-account/:id/change-profile',
      name: 'ChangeProfile',
      component: ChangeProfile
    },
    {
      path: '/my-account/:id/change-avatar',
      name: ChangeAvatar,
      component: ChangeAvatar
    }
    

  ];
//})

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;