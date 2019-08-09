<template>
  <section class="hero">
    <div class="has-background-white">
      <div class="container has-text-left">
        <h2 class="title">
          <span>
            <router-link to="/dealers">Sucursales</router-link> 
          </span>
          <span> ⚫ <span v-html="dealer.nombre"></span></span>
        </h2>
      </div>
    </div>
    <div class="hero-body">
      <div class="container">
        <!--nav class="breadcrumb has-bullet-separator" aria-label="breadcrumbs">
          <ul>
            <li><router-link to="/dealers">Sucursales</router-link></li>
            <li class="is-active"><a href="#" aria-current="page" v-html="dealer.nombre"></a></li>
          </ul>
        </nav-->      
        <div class="columns card dealer-card">
          <div class="column has-text-left">
            <div class="has-background-image" :style="'background-image:url('+dealer.imagen+')'">
            </div>
            <h1 class="card-head has-text-weight-semibold">
              <!--span class="fa fa-building-o"></span>
              <span v-html="dealer.nombre"></span-->
            </h1>
            <p><span class="card-icon"><span class="fa fa-map-pin"></span></span> <a :href="'https://maps.google.com/?q='+dealer.direccion"><span v-html="dealer.direccion"></span></a></p>
            <p><span class="card-icon"><span class="fa fa-phone"></span></span> <a :href="'call:'+ dealer.telefono"><span v-html="dealer.telefono"></span></a></p>
            <p><span class="card-icon"><span class="fa fa-envelope"></span></span> <a :href="'mailto:'+ dealer.email"><span v-html="dealer.email"></span></a></p>
            <p><span class="card-icon"><span class="fa fa-whatsapp"></span></span> <a :href="'https://wa.me/'+dealer.whatsapp"><span v-html="dealer.whatsapp"></span></a></p>
            <p><span class="card-icon"><span class="fa fa-calendar-o"></span></span> {{ dealer.horarios | cs }} </p>
          </div>
          <div class="column has-text-centered">
            <div id="dealer_map" class="has-text-left"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>

import axios from 'axios';
import moment from 'moment';

export default {
  name: 'Dealer',
  mounted: function(){
    var that = this
    axios.get( '/static/dummy/mercedes-dealers.json')
      .then(res => {
        _.map(res.data, function(value, key) {
          if(value.slug === that.$route.params.slug){
            that.dealer = value
          }
        });
        that.initMap()
      }).catch(function(error) {
        console.log(error)
      })      
  },
  methods: {
    initMap: function(){
      mapboxgl.accessToken = 'pk.eyJ1IjoibWFydGluZnJlZSIsImEiOiJjams4ZDh0dGoyanRwM3FtbHlqMXJnYjA3In0.VBD8U4yG46py1g9NxBFMPw'
      this.map = new mapboxgl.Map({
        container: 'dealer_map',
        style: 'mapbox://styles/mapbox/bright-v8'
      }); 

      var marker = new mapboxgl.Marker()
        .setLngLat([this.dealer.lng,this.dealer.lat])
        .addTo(this.map);

      this.map.setCenter([this.dealer.lng,this.dealer.lat])
      this.map.setZoom(14)
    }    
  },
  data () {
    return {
      dealer:[]
    }
  }
}
</script>
