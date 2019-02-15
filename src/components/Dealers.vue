<template>
  <section class="hero">
    <div class="has-background-white">
      <div class="container has-text-left">
        <h2 class="title">
          <span>Sucursales</span>
        </h2>
      </div>
    </div>
    <div class="hero-body" :class="{ 'apply' : !loading }">
      <div class="container dealers">
        <div class="columns">
          <div class="column has-text-left">
            <h1>Conozca nuestras sucursales</h1>
          </div>
        </div> 
        <div class="columns is-multiline">
          <div v-for="dealer in dealers" class="column is-3 dealer">
            <router-link :to="'/dealers/' + dealer.slug">
              <div class="has-background-image" :style="'background-image:url(' + dealer.imagen + ')'">
              </div>
              <div class="has-text-left">
                <h1 class="has-text-info" v-html="dealer.nombre"></h1>
                <h6 class="has-text-dark" v-html="dealer.localidad"></h6>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import axios from 'axios';
export default {
  name: 'Dealers',
  mounted:function(){
    var that = this
    axios.get('/static/dummy/mercedes-dealers.json').then(function(res){
      that.dealers = res.data
    })
    this.loading = false    
  },
  data () {
    return {
      loading:true,
      dealers:{}
    }
  }
}
</script>
