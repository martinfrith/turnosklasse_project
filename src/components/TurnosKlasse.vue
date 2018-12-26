<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">

        <article v-if="$root.storage.announcement" :class="'message ' + $root.storage.announcement.type">
          <div class="message-body">
            <span v-html="$root.storage.announcement.message"></span>
          </div>
        </article>        

        <div class="columns is-fullhd">
          <div class="column is-9">
            <div class="app__search revealer has-text-left" :class="{ 'apply' : !loading }">

              <div v-if="err || sent || sending" class="turno-status">
                <div class="content has-text-centered">
                  <div class="columns">
                    <div v-if="sending" class="column">
                      <h1 class="is-size-1"><i class="fa fa-clock-o has-text-white"></i></h1> 
                      <p class="has-text-white" v-html="$root.storage.turnosklasse.procesando"></p>
                    </div>
                    <div v-if="err" class="column">
                      <h1 class="is-size-1"><i class="fa fa-fire has-text-white"></i></h1> 
                      <p class="has-text-white" v-html="$root.storage.turnosklasse.error"></p>
                    </div>
                    <div v-if="sent" class="column">
                      <h1 class="is-size-1"><i class="fa fa-check has-text-white"></i></h1> 
                      <p class="has-text-white" v-html="$root.storage.turnosklasse.exito"></p>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="!err && !sent && !sending">
                <div class="content">
                    <p class="has-text-white">Seleccione vehículo, servicio y sucursal por la que desea ser atendido.</p>
                </div>

                <div class="columns">
                  <div class="column toggle-type is-half">
                    <div class="columns is-mobile" value="vehicle_type">
                      <div class="column button is-large" :class="{ 'is-white' : search.vehicle_type != 'auto' }" value="auto" @click="setToggleType">Auto</div>
                      <div class="column button is-large" :class="{ 'is-white' : search.vehicle_type != 'vito' }" value="vito" @click="setToggleType">Vito</div>
                      <div class="column button is-large" :class="{ 'is-white' : search.vehicle_type != 'sprinter' }" value="sprinter" @click="setToggleType">Sprinter</div>
                      <div class="column button is-large" :class="{ 'is-white' : search.vehicle_type != 'truck' }" value="truck" @click="setToggleType">Camión</div>
                    </div>
                  </div>
                  <div class="column is-half">
                    <div class="other-actions">
                      <a href="#" class="has-text-info is-size-7" @click="inputModel">Mi modelo no está</a>
                    </div>
                    <div class="button is-large is-white is-fullwidth" :class="{ 'accepted' : search.vehicle }">
                      <span class="icon">
                        <img src="/static/img/icon-car.png">
                      </span>
                      <ul class="is-pulled-left has-text-left">
                        <li><span>Modelo Vehículo</span></li>
                        <li>
                          <span v-if="search.vehicle" v-html="search.vehicle.title"></span>
                        </li>
                      </ul>
                    </div>
                    <v-select v-model="search.vehicle" maxHeight="inherit" placeholder="Seleccione su modelo" :selected="search.vehicle" :options="filtroModelos" label="title">
                      <template slot="no-options">
                        Elija modelo
                      </template>                
                      <template slot="option" slot-scope="option">
                        <div class="d-center">
                          <strong>{{ option.title }}</strong>
                        </div>
                      </template>
                      <template slot="selected-option" scope="option">
                        <div class="selected d-center">
                          <!--strong class="has-text-success">{{ option.title }}</strong-->
                        </div>
                      </template>                  
                    </v-select>                
                  </div>
                </div>

                <div class="columns">
                  <div class="column toggle-type is-half">
                    <div class="columns is-mobile" value="service_type">
                      <div class="column button is-large" :class="{ 'is-white' : search.service_type != 'reparacion' }" value="reparacion" @click="setToggleType">Turno Taller</div>
                      <div class="column button is-large" :class="{ 'is-white' : search.service_type != 'reposiciones-seguros' }" value="reposiciones-seguros" @click="setToggleType">Seguros</div>
                      <div class="column button is-large" :class="{ 'is-white' : search.service_type != 'repuestos' }" value="repuestos" @click="setToggleType">Repuestos</div>
                    </div>
                  </div>
                  <div class="column is-half">
                    <div class="button is-large is-white is-fullwidth" :class="{ 'accepted' : search.dealer }">
                      <span class="icon">
                        <img src="/static/img/icon-building.png">
                      </span>
                      <ul class="is-pulled-left has-text-left">
                      <li><span>Sucursal</span></li>
                      <li>
                        <span v-if="search.dealer" v-html="search.dealer.nombre"></span>
                        <!--span v-else class="has-text-grey" jsb-word="search-origin-placeholder"></span-->
                      </li>
                      </ul>
                    </div>
                    <v-select v-model="search.dealer" maxHeight="inherit" placeholder="Seleccione Sucursal" :selected="search.dealer" :options="filtroDealers" label="nombre" @input="setDealer">
                      <template slot="no-options">
                        Seleccione Sucursal
                      </template>                
                      <template slot="option" slot-scope="option">
                        <div class="d-center">
                          <strong>{{ option.nombre }}</strong> {{ option.localidad }}<br>
                          {{ option.direccion }}
                        </div>
                      </template>
                      <template slot="selected-option" scope="option">
                        <div class="selected d-center">
                          <!-- {{ option.city }} ({{ option.airport_code }}) -->
                        </div>
                      </template>    
                    </v-select>
                  </div>
                </div>

                <div class="columns">
                  <div class="column is-one-quarter">
                    <div class="button is-large is-white is-fullwidth" :class="{ 'accepted' : validateName(search.full_name) }">
                      <span class="icon"><img src="/static/img/pasengers_icon.png"></span>
                      <ul class="is-pulled-left has-text-left">
                        <li><span>Nombre</span></li>
                        <li>
                          <input type="text" v-model="search.full_name">
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="column is-one-quarter">
                    <div class="button is-large is-white is-fullwidth" :class="{ 'accepted' : validateEmail(search.email) }">
                      <span class="icon"><img src="/static/img/icono-email.svg"></span>
                      <ul class="is-pulled-left has-text-left">
                        <li><span>Email</span></li>
                        <li>
                          <input type="email" v-model="search.email">
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="column is-one-quarter">
                    <div class="button is-large is-white is-fullwidth" :class="{ 'accepted' : validatePhone(search.phone) }">
                    <span class="icon"><img src="/static/img/icono-telefono.svg"></span>
                      <ul class="is-pulled-left has-text-left">
                        <li><span>Teléfono</span></li>
                        <li>
                          <input type="phone" v-model="search.phone">
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="column is-one-quarter" :class="{ 'disabled' : search.service_type != 'repuestos' }">
                    <div class="button is-large is-white is-fullwidth" :class="{ 'accepted' : search.repuesto }">
                      <span class="icon"><img src="/static/img/category_icon.svg"></span>
                      <ul class="is-pulled-left has-text-left">
                        <li><span>Repuesto</span></li>
                        <li>
                          <input type="text" v-model="search.repuesto">
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="columns">
                  <div class="column is-one-quarter turno-date">
                    <div class="button is-large is-white is-fullwidth" @click="showDepartDate" :class="{ 'accepted' : search.turno_date }">
                      <span class="icon">
                        <img src="/static/img/calendar_icon.png">
                      </span>
                      <ul class="is-pulled-left has-text-left">
                      <li><span>Fecha turno</span></li>
                      <li>
                        <span v-if="search.turno_date" class="has-text-black" v-html="search.turno_date"></span>
                        <span v-else class="has-text-grey">aaaa/mm/dd</span>
                      </li>
                      </ul>
                    </div>
                    <vue-datepicker-local :local="$root.datepicker" v-model="search.turno_date" format="YYYY-MM-DD"></vue-datepicker-local>
                  </div>
                  <div class="column is-one-quarter turno-time">
                    <div class="button is-large is-white is-fullwidth" @click="showReturnDate" :class="{ 'accepted' : search.turno_time }">
                      <span class="icon">
                        <img src="/static/img/calendar_icon.png">
                      </span>
                      <ul class="is-pulled-left has-text-left">
                        <li><span>Horario</span></li>
                        <li>
                          <span v-if="search.turno_time" class="has-text-black" v-html="search.turno_time"></span>
                          <span v-else class="has-text-grey"></span>
                        </li>
                      </ul>
                    </div>
                    <v-select v-model="search.turno_time" maxHeight="inherit" :selected="search.turno_time" :options="schedules" label="value">
                      <template slot="no-options">
                        Seleccione Sucursal
                      </template>                
                      <template slot="option" slot-scope="option">
                        <div class="d-center">
                          <strong>{{ option.value }}</strong>
                        </div>
                      </template>
                      <template slot="selected-option" scope="option">
                        <div class="selected d-center">
                          <!-- {{ option.city }} ({{ option.airport_code }}) -->
                        </div>
                      </template>    
                    </v-select>
                  </div>

                  <div class="column is-half has-text-right">
                    <button class="button is-expanded" @click="submit" :disabled="!canShowResults">Solicitar turno</button>
                  </div>                  
                </div>
                <p v-if="search.turno_time == '17:00'" class="has-warning-background has-text-white is-size-7">
                  <span class="fa fa-warning"></span>
                  <span>Es posible que retire su vehículo al día siguiente del turno debido al horario seleccionado.</span>
                </p>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="board">
              <div class="content"><a href="whatsapp://send?phone=+54 9 11 5718-2736&amp;text=Hola, estoy interesado en obtener un turno en Klasse"><span class="fa fa-whatsapp has-text-white"></span> <span class="has-text-white">+54 9 11 5718-2736</span></a></div>
            </div>
          </div>
        </div>
      </div>
      <div class="container dealers">
        <div class="columns">
          <div class="column has-text-left">
            <h1 class="has-text-info">Conozca nuestras sucursales</h1>
          </div>
        </div>
        <div class="columns is-multiline">
          <div v-for="dealer in dealers" class="column is-3">
            <router-link class="dealer" :to="'/dealers/' + dealer.slug">
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
import moment from 'moment';
import qs from 'qs';
import _ from 'lodash';
import { snackbar } from '@/components/Snackbar';

export default {
  name: 'TurnosKlasse',
  data () {
    return {
      err: false,
      sent: false,
      sending: false,
      loading: true,
      announcement: {},
      models: [],
      dealers: [],
      schedules: [],
      canShowResults: false,
      search: {
          vehicle: null,
          vehicle_type: "auto",
          service_type: "reparacion",
          turno_date: null,
          turno_time: null,
          dealer: null
      },
      swiperOptions: {
          navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
          }
      }
    }
  },                 
  mounted: function() {
    var that = this
    axios.get('/static/dummy/mercedes-models.json').then(function(res){
      that.models = res.data
      axios.get('/static/dummy/mercedes-dealers.json').then(function(res){
        that.dealers = res.data
      })
    })
    this.loading = false
  },
  computed: {
      filtroModelos: function() {
          var t = this;
          return _.filter(this.models, function(e) {
              return e.vehicle_type === t.search.vehicle_type
          })
      },
      filtroDealers: function() {
          var t = this;
          return _.filter(this.dealers, function(e) {
              return e.servicios[t.search.vehicle_type] && e.servicios[t.search.vehicle_type].indexOf(t.search.service_type) > -1
          })
      }
  },
  watch: {
      search: {
          handler: function(t, e) {
              this.handleSearchUpdate(t)
          },
          immediate: true,
          deep: true
      }
  },
  methods: {
    handleSearchUpdate: function(t) {
        this.search.turno_date = this.search.turno_date && moment(this.search.turno_date).format("YYYY-MM-DD")
        this.canShowResults = !1, t.turno_date && t.turno_time && t.dealer && this.validateEmail(t.email) && this.validateName(t.full_name) && this.validatePhone(t.phone) && (this.canShowResults = !0)
    },
    validateEmail: function(t) {
        return /\S+@\S+\.\S+/.test(t)
    },
    validateName: function(t) {
        return t && t.length
    },
    validatePhone: function(t) {
        return /\d+/.test(t)
    },
    setToggleType: function(t) {
      t.type;
      var e = t.target;
      this.search[e.parentNode.getAttribute("value")] = e.getAttribute("value")
    },
    setDealer: function(t) {
      if(t.horarios){
        this.schedules = t.horarios
      }
    },
    inputModel: function() {
        var t = prompt("Por favor ingrese su modelo a mano.", "");
        null == t || "" == t || (this.search.vehicle || (this.search.vehicle = {}), this.search.vehicle.title = t)
    },
    solicitarNuevo: function() {
        this.err = !1, this.sent = !1, this.search.vehicle = null, this.search.vehicle_type = "auto", this.search.service_type = "reparacion", this.search.turno_date = null, this.search.turno_time = null, this.search.full_name = null, this.search.email = null, this.search.phone = null, this.search.repuesto = null, this.search.dealer = null
    },
    showDepartDate: function(t) {
        t.type, t.target;
        document.querySelector(".turno-date input").click()
    },
    showReturnDate: function(t) {
        t.type, t.target;
        document.querySelector(".turno-time input").click()
    },
    showPassengers: function() {
        this.passengersToggle = !this.passengersToggle
    },
    showCategory: function() {},
    submit: function(t) {
      var that = this
      this.sending = true
      axios.post(this.$root.storage.endpoint + '/pilot', this.search).then(function(res) {
          that.sending = false
          if(res.data.status==="success"){
            that.sent = true;
          } else {
            that.err = true;
          }
      }).catch(function(t) {
          console.log(t)
      })
    }
  }
}
</script>
