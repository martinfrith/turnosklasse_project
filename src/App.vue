<template>
  <div id="app">

    <!-- navbar -->
    <nav class="navbar is-transparent" v-show="$parent.ready">
      <div class="container">
        <div class="navbar-brand">
          <router-link class="navbar-item" to="/">
            <img :src="$root.storage.header.logo">
            <span class="is-size-5 has-text-weight-bold" v-html="$root.storage.header.text"></span> <span class="is-size-6 is-slogan is-capitalize" v-html="$root.storage.header.subtext"></span>
          </router-link>
          <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div id="navbarExampleTransparentExample" class="navbar-menu">
          <div class="navbar-start">
            <router-link v-for="item in $root.storage.header.options" :key="item.link" class="navbar-item" :to="item.link" v-html="item.text"></router-link>
          </div>
        </div>
      </div>
    </nav>    

    <!-- template -->
    <keep-alive>
      <transition>
        <router-view/>
      </transition>
    </keep-alive>    

    <!-- footer -->
    <div class="footer" v-show="$parent.ready"><hr>
      <div class="container">  
        <div class="columns">
          <div v-for="group in $root.storage.footer.options" :key="group.text" class="column has-text-left">
            <strong v-html="group.text"></strong>
            <p v-for="item in group.options">
              <router-link v-if="!item.is_blank && !item.target" :to="item.link">
                <span v-show="item.faicon" :class="'fa fa-' + item.faicon"></span>
                <span :title="item.title" v-html="item.text"></span>
              </router-link>
              <a v-if="item.is_blank" :href="item.link">
                <span v-show="item.faicon" :class="'fa fa-' + item.faicon"></span>
                <span :title="item.title" v-html="item.text"></span>
              </a>
              <a v-if="item.target" href="#" :data-target="item.target" class="modal-button">
                <span v-show="item.faicon" :class="'fa fa-' + item.faicon"></span>
                <span :title="item.title" v-html="item.text"></span>
              </a>
            </p>
          </div>
        </div>
        <div class="has-text-center is-size-6">
          <strong v-html="$root.storage.footer.text"></strong> <span v-html="$root.storage.footer.subtext"></span>
        </div>
      </div>
    </div>

    <!-- modals -->
    <div id="modal-terminos" class="modal">
        <div class="modal-background"></div>
        <button aria-label="close" class="delete is-large"></button>
        <div class="modal-content has-background-white">
            <div class="section">
                <div class="has-text-centered">
                    <h1 class="is-size-4 has-text-weight-semibold">Klasse</h1>
                    <h1 class="is-size-5 has-text-weight-semibold">Cigliutti Guerini</h1>
                    <h4 class="is-size-6">Términos y Condiciones</h4></div>
                <div class="has-text-left">
                    <h1 class="garantia--h">Términos y Condiciones de uso</h1>
                    <h5 class="titlesection"></h5>
                    <p>La plataforma web de turnos online de Klasse Concesionario Oficial Mercedes-Benz www.TurnosKlasse.com.ar, a partir de ahora "La plataforma" es de uso exclusivo para clientes Mercedes-Benz de la república Argentina.</p>
                    <p>La plataforma es de uso estrictamente de contacto para establecer un vínculo directo con el asesor comercial que lo contactará a la brevedad para confirmar el turno y el horario deseado, no generando un compromiso ni obligación de turno por la selección realizada hasta en tanto el asesor comercial no se contacte de manera directa. </p>
                    <p>Ante cualquier consulta, necesidad o sugerencia puede contactarnos de forma directa a <a href="mailto:mercedesbenz@atencionweb.com">MercedesBenz@atencionweb.com</a> o por telefóno al número <a href="tel:+54 11 5718 2736">+54 11 5718 2736</a></p>
                    <p></p>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app'
}

</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
