
import Vue from 'vue'
import axios from 'axios';
import App from './App'
import router from './router'
import moment from 'moment';
import VueDatepickerLocal from 'vue-datepicker-local'
import Passengerpicker from '@/components/Passengerpicker';
import vSelect from 'vue-select'
import { snackbar } from '@/components/Snackbar';
// Require the main Sass manifest file
require('../static/sass/main.scss');

Vue.config.productionTip = false;
Vue.component('vue-datepicker-local', VueDatepickerLocal);
Vue.component('v-select', vSelect)
Vue.component('passengerpicker', Passengerpicker);

new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {App},
	mounted: function(){

		var that = this
	    axios.get('/static/dummy/storage.json').then(function(res){
    	  that.storage = res.data
    	})

		this.ready = true;
	},
	data: function() {
    	return{
    		ready: false,
		    datepicker: {
                monthsHead: "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Deciembre".split("_"),
                months: "Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic".split("_"),
		        weeks: 'D_L_M_X_J_V_S'.split('_'), // weeks,      
		        dow: 0, // Sunday is the first day of the week
		        hourTip: 'Select Hour', // tip of select hour
		        minuteTip: 'Select Minute', // tip of select minute
		        secondTip: 'Select Second', // tip of select second
		        yearSuffix: '' // suffix of head year
		        //monthsHead: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
		        //months: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'), 
		        //weeks: 'S_M_T_W_T_F_S'.split('_') 
		    }			
		}
	}	
});

