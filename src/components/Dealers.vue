<template>
  <section class="hero">
    <div class="has-background-white">
      <div class="container has-text-left">
        <h2 class="title">
          <span jsb-word="terms"></span>
        </h2>
      </div>
    </div>
    <div class="hero-body">
      <div class="container dealers">
        <div class="columns">
          <div class="column has-text-left">
            <h1>Conozca nuestras sucursales</h1>
          </div>
        </div> 
        <div class="columns is-multiline">
          <div class="column is-3">
            <a href="/dealers/klasse-nunez" class="dealer">
              <div class="has-background-image dealer-image-list" style="background-image: url(&quot;/static/dummy/img/dealers/SUCURSAL_2.jpg&quot;);"></div> 
                <div class="has-text-left">
                  <h1 class="has-text-info has-text-weight-semibold">Klasse - NUÑEZ</h1> 
                  <h6 class="has-text-dark">4702-2095</h6> 
                  <h6 class="has-text-dark">Grecia 3633, Nuñez</h6>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'Dealers',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
