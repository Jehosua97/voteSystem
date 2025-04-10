<template>
  <q-layout view="lHh Lpr lFf" style="background:linear-gradient( 135deg, #5B6A82 10%, #162b4d 100%)">
    <q-header class="bg-transparent text-white">
      <q-toolbar class="q-pa-md">
        <q-toolbar-title>
          Canadian Federal Election 2025
        </q-toolbar-title>
        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn square dense flat color="text-grey-7" to="/" label="Dashboard" icon="dashboard">
            <q-tooltip>Dashboard</q-tooltip>
          </q-btn>
          <q-btn square dense flat color="text-grey-7" to="/Pricing" label="Vote" icon="how_to_vote">
            <q-tooltip>Voting</q-tooltip>
          </q-btn>
          <q-btn square dense flat color="text-grey-7" to="/Lock-2" label="Results" icon="bar_chart">
            <q-tooltip>Results</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <section style="min-height: 25vh;" class="flex text-white flex-center layout_bg">
        <div style="position: relative">
          <div class="text-h4 text-center">
            Select Your Preferred Party
          </div>
          <div class="text-subtitle2 q-pt-sm text-center">
            Review each party's logo and cast your vote below.
          </div>
        </div>
      </section>
      <section class="q-pb-lg">
        <div class="row q-col-gutter-sm q-px-sm">
          <div class="col-lg-3 col-md-3 col-xs-12 col-sm-12" v-for="pricing_item, pricing_index in pricing_data" :key="pricing_index">
            <card-pricing :title="pricing_item.title" :icon="pricing_item.icon" :price="pricing_item.price"
              :background_image="pricing_item.background_image" :text="pricing_item.text" @vote="handleVote"></card-pricing>
          </div>
        </div>
      </section>
    </q-page-container>
    <section>
      <table-actions class="q-mt-lg"></table-actions>
    </section>
    <section class="flex row flex-center q-py-sm ">
      <div class="text-weight-bold text-subtitle2 text-white ">
        Copyright © {{ year }}, made with
        <q-icon name="fas fa-heart"></q-icon>
        by Group 5
      </div>
    </section>

    <q-dialog v-model="dialogVisible">
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirm Your Vote</div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle1">Are you sure you want to vote for {{ selectedParty }}?</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" @click="dialogVisible = false"></q-btn>
          <q-btn color="primary" label="Confirm" @click="sendMessage(1, selectedParty)"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref } from 'vue'

const pricing_data = [
  {
    title: 'Liberal Party',
    price: '', // Removed dollar amount
    icon: 'balance',
    background_image: 'linear-gradient(to right, #D71A21 0%, #A51C30 100%)', // Liberal red
    text: 'Name 1',
    image: '../assets/Pic1.jpg'
  },
  {
    title: 'Conservative Party',
    price: '', // Removed dollar amount
    icon: 'account_balance',
    background_image: 'linear-gradient(-225deg, #1A4782 0%, #0E2C5E 100%)', // Conservative blue
    text: 'Name 1',
    image: '../../assets/Pic2.jpg'
  },
  {
    title: 'New Democratic Party',
    price: '', // Removed dollar amount
    icon: 'groups',
    background_image: 'linear-gradient(to right, #F58220 0%, #E84A27 100%)', // NDP orange
    text: 'Name 1',
    image: '../../assets/Pic3.jpg'
  },
  {
    title: 'Bloc Québécois',
    price: '', // Removed dollar amount
    icon: 'flag',
    background_image: 'linear-gradient(87deg, rgb(0, 146, 70), rgb(53, 124, 56))', // Bloc green
    text: 'Name 1',
    image: '../../assets/Pic4.jpg'
  },
]

export default defineComponent({
  name: "Pricing",
  components: {
    CardPricing: defineAsyncComponent(() => import('components/cards/CardPricing.vue')),
    TableActions: defineAsyncComponent(() => import('components/tables/TableActions.vue'))
  },
  setup() {
    const dialogVisible = ref(false);
    const selectedParty = ref('');

    const handleVote = (party) => {
      selectedParty.value = party;
      dialogVisible.value = true;
    };

    //const submitVote = () => {
    //  console.log(`Vote confirmed for: ${selectedParty.value}`);
    //  dialogVisible.value = false;
    //  // Add your message sending logic here
    //};
//
    return {
      year: (new Date()).getFullYear(),
      pricing_data,
      dialogVisible,
      selectedParty,
      handleVote,
      citizen1Url: 'http://10.173.8.113:5001',
      citizen2Url: 'http://10.173.8.113:5002',
      frontendUrl: 'http://10.173.8.113:9000'
    }
  },
  methods: {
    // URLs de los servicios (ajusta según tu configuración)
        // Función para enviar mensajes
    async sendMessage(citizenId, pricing_data) {
      debugger
      const message = pricing_data;

      if (!message) return;

      try {
        const response = await fetch(`${citizenId === 1 ? this.citizen1Url : this.citizen2Url}/send/${message}`);
        const data = await response.json();
        console.log(data);
        this.dialogVisible = false;
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  }  
})
</script>

<style scoped></style>