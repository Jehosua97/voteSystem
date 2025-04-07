<template>
  <div class="row q-col-gutter-sm  q-py-sm">
    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
      <q-card class="q-ma-xs no-shadow" bordered style="background-color: #38b1c5">
        <q-card-section class="text-h6 text-white">
          Today's View
        </q-card-section>
        <q-card-section class="q-pa-none">
          <ECharts :option="LineChart2"
                   class="q-mt-md"
                   :resizable="true"
                   autoresize style="height: 250px;"
          />
        </q-card-section>
      </q-card>
    </div>
    <div>
    <input type="text" id="message1" placeholder="Enter message for Citizen 1" />
    <button @click="sendMessage(1)">Send to Citizen 1</button>
    
    <input type="text" id="message2" placeholder="Enter message for Citizen 2" />
    <button @click="sendMessage(2)">Send to Citizen 2</button>
    
    <div id="messageLog"></div>
    <div id="votes1"></div>
    <div id="votes2"></div>
  </div>
    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
      <q-card class="q-ma-xs no-shadow" bordered style="background-color: #ea4b64">
        <q-card-section class="text-h6 text-white">
          Daily Sales
        </q-card-section>
        <q-card-section class="q-pa-none">
          <ECharts :option="BarChart"
                   class="q-mt-md"
                   :resizable="true"
                   autoresize style="height: 250px;"
          />
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
      <q-card class="q-ma-xs no-shadow" bordered style="background-color: #1e88e5">
        <q-card-section class="text-h6 text-white">
          Today's User Visit
        </q-card-section>
        <q-card-section class="q-pa-none">
          <ECharts :option="LineChart"
                   class="q-mt-md"
                   :resizable="true"
                   autoresize style="height: 250px;"
          />
        </q-card-section>
      </q-card>
    </div>

  </div>
</template>

<script>
import {defineComponent, defineAsyncComponent} from 'vue';
import * as echarts from 'echarts';
import ECharts from "vue-echarts";

export default defineComponent({
  name: 'CardCharts',
  components:{
    ECharts
  },
  data() {
    return {
      citizen1Url: 'http://10.173.8.113:5001',
      citizen2Url: 'http://10.173.8.113:5002',
      frontendUrl: 'http://10.173.8.113:9000'
    };
  },
  setup () {
    return {
      BarChart: {
        "tooltip": {"show": true},
        "title": {"show": true, "textStyle": {"color": "rgba(0, 0, 0 , .87)", "fontFamily": "sans-serif"}},
        "grid": {"containLabel": true, "bottom": "10%", "top": "5%"},
        "xAxis": {
            "show": false,
            "type": "category",
            "axisLine": {"lineStyle": {"color": "rgba(0, 0, 0 , .54)", "type": "dashed"}},
            "axisTick": {
                "show": true,
                "alignWithLabel": true,
                "lineStyle": {"show": true, "color": "rgba(0, 0, 0 , .54)", "type": "dashed"}
            },
            "axisLabel": {"show": false}
        },
        "yAxis": {
            "show": false,
            "type": "value",
            "axisLine": {"lineStyle": {"color": "rgba(0, 0, 0 , .54)", "type": "dashed"}},
            "axisLabel": {"show": false},
            "splitLine": {"lineStyle": {"type": "dashed"}},
            "axisTick": {
                "show": true,
                "lineStyle": {"show": true, "color": "rgba(0, 0, 0 , .54)", "type": "dashed"}
            }
        },
        "series": [{
            "type": "bar",
            "barGap": "-100%",
            "itemStyle": {"normal": {"color": "rgba(0,0,0,0.1)"}},
            "barWidth": "50%"
        }, {"barWidth": "50%", "type": "bar", "itemStyle": {"normal": {"color": "#ffffff"}}}],
        "dataset": {
            "source": [{"label": "0D", "max": 500, "sales": 220}, {
                "label": "1D",
                "max": 500,
                "sales": 182
            }, {"label": "2D", "max": 500, "sales": 191}, {
                "label": "3D",
                "max": 500,
                "sales": 234
            }, {"label": "4D", "max": 500, "sales": 290}, {
                "label": "5D",
                "max": 500,
                "sales": 330
            }, {"label": "6D", "max": 500, "sales": 310}, {
                "label": "7D",
                "max": 500,
                "sales": 123
            }, {"label": "8D", "max": 500, "sales": 442}, {
                "label": "9D",
                "max": 500,
                "sales": 321
            }, {"label": "10D", "max": 500, "sales": 90}, {
                "label": "11D",
                "max": 500,
                "sales": 149
            }, {"label": "12D", "max": 500, "sales": 210}, {
                "label": "13D",
                "max": 500,
                "sales": 122
            }, {"label": "14D", "max": 500, "sales": 133}, {
                "label": "15D",
                "max": 500,
                "sales": 334
            }, {"label": "16D", "max": 500, "sales": 198}, {
                "label": "17D",
                "max": 500,
                "sales": 123
            }, {"label": "18D", "max": 500, "sales": 125}, {"label": "19D", "max": 500, "sales": 220}]
        }
    },
      LineChart: {
        "tooltip": {"show": true},
        "title": {"show": true, "textStyle": {"color": "rgba(0, 0, 0 , .87)", "fontFamily": "sans-serif"}},
        "grid": {"containLabel": true, "left": "0", "bottom": "0", "right": "0"},
        "xAxis": {
            "show": false,
            "type": "category",
            "axisLine": {"lineStyle": {"color": "rgba(0, 0, 0 , .54)", "type": "dashed"}},
            "axisTick": {
                "show": true,
                "alignWithLabel": true,
                "lineStyle": {"show": true, "color": "rgba(0, 0, 0 , .54)", "type": "dashed"}
            },
            "axisLabel": {"show": false},
            "boundaryGap": false
        },
        "yAxis": {
            "show": false,
            "type": "value",
            "axisLine": {"lineStyle": {"color": "rgba(0, 0, 0 , .54)", "type": "dashed"}},
            "axisLabel": {"show": false},
            "splitLine": {"lineStyle": {"type": "dashed"}},
            "axisTick": {
                "show": true,
                "lineStyle": {"show": true, "color": "rgba(0, 0, 0 , .54)", "type": "dashed"}
            }
        },
        "series": [{"type": "line", "areaStyle": {}, "smooth": true}],
        "dataset": {
            "source": [{"month": "Jan", "Unique Visit": 296, "Page View": 548}, {
                "month": "Feb",
                "Unique Visit": 1181,
                "Page View": 714
            }, {"month": "Mar", "Unique Visit": 235, "Page View": 961}, {
                "month": "Apr",
                "Unique Visit": 294,
                "Page View": 580
            }, {"month": "May", "Unique Visit": 765, "Page View": 730}, {
                "month": "Jun",
                "Unique Visit": 412,
                "Page View": 1249
            }, {"month": "Jul", "Unique Visit": 1125, "Page View": 267}, {
                "month": "Aug",
                "Unique Visit": 800,
                "Page View": 251
            }, {"month": "Sep", "Unique Visit": 948, "Page View": 1043}, {
                "month": "Oct",
                "Unique Visit": 1046,
                "Page View": 1118
            }, {"month": "Nov", "Unique Visit": 363, "Page View": 573}, {
                "month": "Dec",
                "Unique Visit": 909,
                "Page View": 283
            }]
        },
        "color": ["#2196f3"]
    },
      LineChart2: {
        "tooltip": {"show": true},
        "title": {"show": true, "textStyle": {"color": "rgba(0, 0, 0 , .87)", "fontFamily": "sans-serif"}},
        "grid": {"containLabel": true, "left": "0", "bottom": "0", "right": "0"},
        "xAxis": {
            "show": false,
            "type": "category",
            "axisLine": {"lineStyle": {"color": "rgba(0, 0, 0 , .54)", "type": "dashed"}},
            "axisTick": {
                "show": true,
                "alignWithLabel": true,
                "lineStyle": {"show": true, "color": "rgba(0, 0, 0 , .54)", "type": "dashed"}
            },
            "axisLabel": {"show": false},
            "boundaryGap": false
        },
        "yAxis": {
            "show": false,
            "type": "value",
            "axisLine": {"lineStyle": {"color": "rgba(0, 0, 0 , .54)", "type": "dashed"}},
            "axisLabel": {"show": false},
            "splitLine": {"lineStyle": {"type": "dashed"}},
            "axisTick": {
                "show": true,
                "lineStyle": {"show": true, "color": "rgba(0, 0, 0 , .54)", "type": "dashed"}
            }
        },
        "series": [{"type": "line", "areaStyle": {}, "smooth": false}],
        "dataset": {
            "source": [{"month": "Jan", "Unique Visit": 296, "Page View": 548}, {
                "month": "Feb",
                "Unique Visit": 1181,
                "Page View": 714
            }, {"month": "Mar", "Unique Visit": 235, "Page View": 961}, {
                "month": "Apr",
                "Unique Visit": 294,
                "Page View": 580
            }, {"month": "May", "Unique Visit": 765, "Page View": 730}, {
                "month": "Jun",
                "Unique Visit": 412,
                "Page View": 1249
            }, {"month": "Jul", "Unique Visit": 1125, "Page View": 267}, {
                "month": "Aug",
                "Unique Visit": 800,
                "Page View": 251
            }, {"month": "Sep", "Unique Visit": 948, "Page View": 1043}, {
                "month": "Oct",
                "Unique Visit": 1046,
                "Page View": 1118
            }, {"month": "Nov", "Unique Visit": 363, "Page View": 573}, {
                "month": "Dec",
                "Unique Visit": 909,
                "Page View": 283
            }]
        },
        "color": ["#45c2c5"]
    },
    }
  },
  methods: {
    // URLs de los servicios (ajusta según tu configuración)
    

    // Función para enviar mensajes
    async sendMessage(citizenId) {
      const messageInput = document.getElementById(`message${citizenId}`);
      const message = messageInput.value;

      if (!message) return;

      try {
        const response = await fetch(`${citizenId === 1 ? this.citizen1Url : this.citizen2Url}/send/${message}`);
        const data = await response.json();

        this.logMessage(citizenId, message, 'sent');
        messageInput.value = '';

        // Actualizar las vistas de la base de datos
        this.updateVotesView();
      } catch (error) {
        console.error('Error sending message:', error);
      }
    },

    // Función para registrar mensajes en el log
    logMessage(citizenId, message, direction) {
      const messageLog = document.getElementById('messageLog');
      const messageElement = document.createElement('div');
      messageElement.className = `message citizen${citizenId}`;

      const directionText = direction === 'sent' ? 'sent to' : 'received from';
      messageElement.textContent = `Citizen ${citizenId} ${directionText} Citizen ${citizenId === 1 ? 2 : 1}: ${message}`;

      messageLog.appendChild(messageElement);
      messageLog.scrollTop = messageLog.scrollHeight;
    },

    // Función para actualizar la vista de votos
    async updateVotesView() {
      try {
        // Obtener votos de Citizen 1
        const response1 = await fetch(`${this.citizen1Url}/votes`);
        const votes1 = await response1.json();
        this.displayVotes('votes1', votes1);

        // Obtener votos de Citizen 2
        const response2 = await fetch(`${this.citizen2Url}/votes`);
        const votes2 = await response2.json();
        this.displayVotes('votes2', votes2);
      } catch (error) {
        console.error('Error updating votes:', error);
      }
    },

    // Función para mostrar votos en el contenedor especificado
    displayVotes(containerId, votes) {
      const container = document.getElementById(containerId);
      container.innerHTML = '';

      votes.forEach(vote => {
        const voteElement = document.createElement('div');
        voteElement.className = 'vote-entry';

        const [id, citizenId, message, timestamp] = vote;
        voteElement.textContent = `ID: ${id} | Vote: ${message} | Time: ${timestamp}`;

        container.appendChild(voteElement);
      });
    }
  },
})
</script>
