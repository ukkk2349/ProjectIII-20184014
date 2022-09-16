import Vue from 'vue'
import Vuex from 'vuex'
import { createStore } from 'vuex'
import axios from './axios'
import globalAxios from 'axios'

import router from './router/index'

//Vue.use(Vuex)

export const store = createStore({

  //export default new Vuex.Store({
  state: {
    idToken: localStorage.getItem('token') || null, //phien dang nhap
    userId: localStorage.getItem('userId') || null,
    isAdmin: localStorage.getItem('isAdmin') || null,
    user: null,
    cart: localStorage.getItem('cart') || 0
  },
  getters: {
    user(state) {
      return state.user
    },
    isAuthenticated(state) {
      return state.idToken !== null
    },
    isAdmin(state) {
      return state.isAdmin
    }
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
      state.isAdmin = userData.isAdmin
    },
    storeUser(state, user) {
      state.user = user
    },
    clearAuthData(state) {
      state.idToken = null,
        state.userId = null,
        state.isAdmin = 0
    }
  },
  actions: {
    login({ state, commit }, authData) {
      axios.post('login', {
        email: authData.email,
        password: authData.password
      })
        .then(res => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token)
            const account = JSON.parse(res.config.data)
            for (let i = 0; i < authData.users.length; i++) {
              if (authData.users[i].email == account.email) {
                localStorage.setItem('userId', authData.users[i].id)
                localStorage.setItem('isAdmin',authData.users[i].is_admin)
                commit('authUser', {
                  token: res.data.token,
                  userId: authData.users[i].id,
                  isAdmin: authData.users[i].is_admin 
                })
              }
            }
            console.log('login successful')
            router.go(-1)
          }

        },
          (err) => {
            let errorMessage = document.getElementById("wrong-login");
            errorMessage.innerHTML = "Incorrect Email or Password"
            authData.error = err.response.data.error;
          }
        )
        .catch(error => {
          console.log(error)
        })
    },
    //end login action
    logout({ commit }) {
      commit('clearAuthData')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('isAdmin')
      localStorage.removeItem('cart')
      localStorage.clear()
      router.replace('/login')
    },
    // end logout action
    register({ commit, dispatch }, authData) {
      axios.post('register', {
        name: authData.name,
        email: authData.email,
        password: authData.password,
        dateOfBirth: authData.dateOfBirth,
        address: authData.address,
        phoneNumber: authData.phoneNumber,
        gender: authData.gender
      })
        .then(res => {
          console.log(res)
          commit('authUser', {
            token: res.data.token,
            userId: res.data.user.id,
            isAdmin: res.data.user.is_admin
          })
          localStorage.setItem("token", res.data.token)
          localStorage.setItem('userId', res.data.user.id)
          localStorage.setItem('isAdmin', 0)
          dispatch('storeUser', authData)
          let message = document.getElementById("message");
          message.innerHTML= "Your account have already been registerd"
          setTimeout(function () {
            router.go(-2)
          }, 2000);
          
        },
          err => {
            let errorMessage = document.getElementById("message");
            errorMessage.innerHTML = "This email has been registered!"
            authData.error = err.response.data.error;
          })
        .catch(error => console.log(error))
    },
    // end register action
    storeUser({ state }, userData) {
      if (!state.idToken) {
        return
      }
      globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    },
    deleteAccount({ state, dispatch }) {
      axios.delete(`/user/${state.userId}`)
        .then(res => {
          console.log(res)
          dispatch('logout')
        })
        .catch(error => {
          console.log(error)
        })
    },
    addPet({ state }, authData) {
      if (!state.isAdmin) {
        let errorMessage = document.getElementById("message");
        errorMessage.innerHTML = "You are not Admin"
      }
      axios.post('/pet', {
        name: authData.name,
        weight: authData.weight,
        species: authData.species,
        description: authData.description,
        price: authData.price,
        state: authData.state,
        sale: authData.sale,
        images: authData.images,
        stock: 1
      })
        .then(res => {
          console.log(res)
          let message = document.getElementById("message");
          message.innerHTML = "Added";
          setTimeout(() => {
            router.go(-1);
          }, 2000);
        },
          err => {
            let errorMessage = document.getElementById("message");
            errorMessage.innerHTML = "This pet had been added before"
            console.log(err)
          })
        .catch(error => console.log(error))
    },
    addFood({ state }, authData) {
      let errorMessage
      if (!state.isAdmin) {
        errorMessage = document.getElementById("message");
        errorMessage.innerHTML = "You are not Admin"
      }
      axios.post('/food', {
        name: authData.name,
        calories: authData.calories,
        weight: authData.weight,
        description: authData.description,
        price: authData.price,
        sale: authData.sale,
        images: authData.images,
        stock: authData.stock
      })
        .then(res => {
          console.log(res)
          let message = document.getElementById("message");
          message.innerHTML = "Added"
        },
          (err) => {
            errorMessage = document.getElementById("message");
            errorMessage.innerHTML = "This food had been added before"
            authData.error = err.response.data.error;
          })
        .catch(error => console.log(error))
    },
    updatePet({ }, authData) {
      axios.put('/pet/update', {
        id: authData.id,
        name: authData.name,
        weight: authData.weight,
        species: authData.species,
        description: authData.description,
        price: authData.price,
        state: authData.state,
        sale: authData.sale,
        images: authData.images,
        stock: authData.stock
      })
        .then(res => {
          console.log(res)
          let message = document.getElementById("message2");
          message.innerHTML = "Updated"
          setTimeout(function () {
            message.innerHTML = ""
          }, 2000);
        },
          (err) => {
            errorMessage = document.getElementById("message2");
            errorMessage.innerHTML = "Failed"
            authData.error = err.response.data.error;
          })
        .catch(error => console.log(error))
    },
    findpet({ state }, authData) {
      if (!state.isAdmin) {
        let errorMessage = document.getElementById("message1");
        errorMessage.innerHTML = "You are not Admin"
      }
      if (authData.id != 0) {
        axios.get(`/pet/find-id/${authData.id}`)
          .then(res => {
            console.log(res)
          },
            err => {
              let message = document.getElementById("message1");
              message.innerHTML = "There is no pet's id like that"
            })
          .catch(error => console.log(error))
      } else {
        axios.get('/pet/find-name/', { name: authData.name })
          .then(res => {
            console.log(res)
          },
            err => {
              let message = document.getElementById("message1");
              message.innerHTML = "There is no pet's name like that"
            })
          .catch(error => console.log(error))
      }
    },
    updateFood({ }, authData) {
      console.log(authData)
      axios.put('/food/update', {
        id: authData.id,
        name: authData.name,
        calories: authData.calories,
        weight: authData.weight,
        description: authData.description,
        price: authData.price,
        sale: authData.sale,
        image: authData.images,
        stock: authData.stock
      })
        .then(res => {
          console.log(res)
          let message = document.getElementById("message2");
          message.innerHTML = "Updated"
          setTimeout(function () {
            router.go(-1)
          }, 2000);
        },
          (err) => {
            errorMessage = document.getElementById("message2");
            errorMessage.innerHTML = "Failed"
            authData.error = err.response.data.error;
          })
        .catch(error => console.log(error))
    },
    deletePet({ }, authData) {
      axios.delete(`/pet/delete/${authData.id}`)
        .then(res => {
          console.log(res)
        })
    },
    deleteFood({ }, authData) {
      axios.delete(`/food/delete/${authData.id}`)
        .then(res => {
          console.log(res)
        })
    },
    addToCart({ state }, authData) {
      axios.post('/add-to-cart', {
        userId: state.userId,
        productId: authData.productId,
        infomation: authData.infomation,
        quantity: authData.quantity
      })
        .then(res => {
          console.log(res);
          let message = document.getElementById("PetInfoMessage");
          localStorage.setItem('quantity', authData.quantity++);
          message.innerHTML = "Added to cart successfully!";
          setTimeout(function () {
            message.innerHTML = "";
          }, 2000);
        },
          err => {
            authData.error = err.response.data.error;
            console.log(err);
          })
        .catch(error => console.log(error));
    },
    buyPet({state}, authData) {
      axios.put('/pet/buy', {id: authData.id})
        .then(res => {
          console.log(res)
        },
        err => {
          authData.error = err.response.data.error;
        })
        .catch(error => console.log(error))
    },
    buyFood({state}, authData) {
      axios.put('/food/buy', {id: authData.id})
        .then(res => {
          console.log(res)
        },
        err => {
          authData.error = err.response.data.error;
        })
        .catch(error => console.log(error))
    },
    buy({ state }, authData) {
      let user = null
      axios.get(`/user/${state.userId}`)
        .then(res => {
          user = res.data
          console.log(user)
          axios.post('/cart/buy-cart', {
            userId: state.userId,
            username: user.name,
            list: authData.list,
            total: authData.total
          })
            .then(res => {
              console.log(res)
            })
        })

    },
    deleteCart({ state }) {
      axios.delete(`/cart/buy-cart/${state.userId}`)
        .then(res => {
          alert('Order completed!')
          router.replace('/')
        })
    },
    request({ state }, authData) {
      axios.post('/request', {
        userId: state.userId,
        type: authData.type,
        detail: authData.detail,
        range: authData.range
      })
        .then(res => {
          console.log(res)
          alert('Thanks for your request!\nWe will send you the result as soon as we can!')
          router.replace('/')
        })
    },
    search({ state }, authData) {
      router.replace(`/search/${authData.search_request}`)
    },
    changePassword ({state}, authData) {
      axios.put('/change-password', {
        userId: state.userId,
        oldPassword: authData.oldPassword,
        newPassword: authData.newPassword
      })
        .then(res => {
          console.log(res)
          if(res.status === 200) {
            let message = document.getElementById("message");
            message.innerHTML= "Password changed"
          }
        },
          (err) => {
            console.log(err)
            let errorMessage = document.getElementById("message")
            errorMessage.innerHTML = "Incorrect Password"
            authData.error = err.response.data.error;
          })
          .catch(error => {
            console.log(error)
          })
    },
    updateProfile({state}, authData) {
      axios.put('/update-profile', authData)
        .then (res => {
          console.log(res)
          if(res.status ===200) {
            let message = document.getElementById("message");
            message.innerHTML= "Updated"
            setTimeout(function () {
              router.replace(`/my-account/${state.userId}`)
            }, 2000);
          }
        },
        (err) => {
          console.log(err)
          let errorMessage = document.getElementById("message")
          errorMessage.innerHTML = "Update failed"
          authData.error = err.response.data.error;
        })
        .catch (error => console.log(error))
    }
  }
})

export default store