<template>
  <q-layout
    view="lHh Lpr lFf"
    class="bg-white"
  >
    <q-header class="bg-primary text-white shadow-2" style="min-height: 50px; padding: 0 24px;">
      <q-toolbar class="q-pa-md">
        <q-toolbar-title> Let's Vote </q-toolbar-title>
        <q-space />
        <!----
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn
            square
            dense
            flat
            color="text-grey-7"
            to="/"
            label="Dashboard"
            icon="dashboard"
          >
            <q-tooltip>Dashboard</q-tooltip>
          </q-btn>
          <q-btn
            square
            dense
            flat
            color="text-grey-7"
            to="/Pricing"
            label="Vote"
            icon="how_to_vote"
          >
            <q-tooltip>Voting</q-tooltip>
          </q-btn>
          <q-btn
            square
            dense
            flat
            color="text-grey-7"
            to="/Lock-2"
            label="Results"
            icon="bar_chart"
          >
            <q-tooltip>Results</q-tooltip>
          </q-btn>
        </div>
      -->

        <!-- ✅ Results Button -->
        <q-btn
          square
          dense
          flat
          color="text-white"
          icon="bar_chart"
          label="Results"
          to="/Lock-2"
        />
        <!-- ✅ Logout Button -->
        <q-btn
          square
          dense
          flat
          color="text-white"
          icon="logout"
          label="Logout"
          @click="handleLogout"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <section style="min-height: 25vh;" class="flex text-dark flex-center">

        <div style="position: relative">
          <div class="text-h4 text-center text-bold">Cast Your Vote for a Better Tomorrow</div>
          <div class="text-subtitle2 q-pt-sm text-center">
            Click on the button below your preferred candidate to submit your vote.
          </div>
        </div>
      </section>
      <section class="q-pb-lg">
        <div class="row q-col-gutter-sm q-px-sm">
          <div
            class="col-lg-3 col-md-3 col-xs-12 col-sm-12"
            v-for="(pricing_item, pricing_index) in pricing_data"
            :key="pricing_index"
          >
            <card-pricing
              :title="pricing_item.title"
              :icon="pricing_item.icon"
              :votepercentage="pricing_item.votepercentage"
              :show-percentage="hasVoted"
              :background_image="pricing_item.background_image"
              :text="pricing_item.text"
              :image="pricing_item.image"
              @vote="handleVote"
            ></card-pricing>
          </div>
        </div>
      </section>
    </q-page-container>
    <section v-if="isAdmin">
      <table-actions class="q-mt-lg"></table-actions>
    </section>

    <div class="text-h6 text-grey-8">
      <q-btn
        @click="showLogs"
        label="Vote Logs"
        class="float-center text-capitalize text-indigo-8 shadow-3"
        icon="person"
      />
    </div>
    <div id="voteLogsContainer" class="q-pa-md"></div>

    <section class="flex row flex-center q-py-sm">
      <div class="text-weight-bold text-subtitle2 text-white">
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
          <div class="text-subtitle1">
            Are you sure you want to vote for {{ selectedParty }}?
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" @click="dialogVisible = false"></q-btn>
          <q-btn
            color="primary"
            label="Confirm"
            @click="sendMessage(1, selectedParty)"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import {
  defineComponent,
  defineAsyncComponent,
  ref,
  onMounted,
  onUnmounted,
} from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import axios from "axios"; // Import Axios

const pricing_data = ref([
  {
    title: "Liberal Party",
    votepercentage: 0, // Removed dollar amount
    icon: "balance",
    background_image: "linear-gradient(to right, #D71A21 0%, #A51C30 100%)", // Liberal red
    text: "Emily Carter",
    image: "/candidate-images/Pic1.jpg",
  },
  {
    title: "Conservative Party",
    votepercentage: 0, // Removed dollar amount
    icon: "account_balance",
    background_image: "linear-gradient(-225deg, #1A4782 0%, #0E2C5E 100%)", // Conservative blue
    text: "Michael Bennett",
    image: "/candidate-images/Pic2.jpg",
  },
  {
    title: "New Democratic Party",
    votepercentage: 0, // Removed dollar amount
    icon: "groups",
    background_image: "linear-gradient(to right, #F58220 0%, #E84A27 100%)", // NDP orange
    text: "David Singh",
    image: "/candidate-images/Pic3.jpg",
  },
  {
    title: "Bloc Québécois",
    votepercentage: 0, // Removed dollar amount
    icon: "flag",
    background_image:
      "linear-gradient(87deg, rgb(0, 146, 70), rgb(53, 124, 56))", // Bloc green
    text: "Jean-Luc Tremblay",
    image: "/candidate-images/Pic4.jpg",
  },
]);

export default defineComponent({
  name: "Pricing",
  components: {
    CardPricing: defineAsyncComponent(() =>
      import("components/cards/CardPricing.vue")
    ),
    TableActions: defineAsyncComponent(() =>
      import("components/tables/TableActions.vue")
    ),
  },
  setup() {
    const dialogVisible = ref(false);
    const selectedParty = ref("");
    const hasVoted = ref(false);
    const isAdmin = ref(false); // Add this line

    const citizen1Url = ref("http://10.173.8.113:5001");
    const citizen2Url = ref("http://10.173.8.113:5002");

    const route = useRoute();
    const citizenNumber = ref(route.query.username || "Guest");

    const router = useRouter();
    const handleLogout = () => {
      router.push("/"); // Or wherever your login page is
    };

    const handleVote = (party) => {
      if (hasVoted.value) return;
      selectedParty.value = party;
      dialogVisible.value = true;
    };

    const fetchVoteStatistics = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/voteStatistics"
        );
        const apiData = response.data.parties;

        const voteMap = {};
        apiData.forEach((party) => {
          voteMap[party.party] = party.percentage;
        });

        pricing_data.value = pricing_data.value.map((party) => ({
          ...party,
          votepercentage: voteMap[party.title] || 0,
        }));
      } catch (error) {
        console.error("Error fetching vote statistics:", error);
      }
    };

    const pollingInterval = ref(null);

    const fetchUserByCitizenNumber = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/getUserByCitizenNumber",
          {
            citizenNumber: citizenNumber.value,
          }
        );
        hasVoted.value = response.data[0].voted != 0;
        isAdmin.value = response.data[0].name == "admin"; // Add this line to check if user is admin
        debugger;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const sendMessage = async (citizenId, party) => {
      try {
        const response = await fetch(
          `${
            citizenId === 1 ? citizen1Url.value : citizen2Url.value
          }/send/${party}`
        );
        const data = await response.json();
        hasVoted.value = true;
        dialogVisible.value = false;
        debugger;

        await axios.post("http://localhost:3000/updateVoteStatus", {
          citizenNumber: citizenNumber.value,
          voted: 1,
          party: party,
        });
        fetchVoteStatistics();
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const showLogs = async () => {
      try {
        debugger;
        const response = await fetch(`http://10.173.8.113:5001/votes`);
        const votes = await response.json();
        const container = document.getElementById("voteLogsContainer");
        container.innerHTML = "";
        debugger;
        votes.forEach((vote) => {
          const voteElement = document.createElement("div");
          voteElement.className = "vote-entry";

          const [id, citizenId, message, timestamp] = vote;
          voteElement.textContent = `ID: ${id} | Vote: ${message} | Time: ${timestamp}`;

          container.appendChild(voteElement);
        });
      } catch (error) {
        console.error("Error fetching vote logs:", error);
      }
    };

    onMounted(() => {
      fetchUserByCitizenNumber();
      fetchVoteStatistics();
      pollingInterval.value = setInterval(fetchVoteStatistics, 5000);
    });

    onUnmounted(() => {
      if (pollingInterval.value) {
        clearInterval(pollingInterval.value);
      }
    });

    return {
      citizenNumber,
      year: new Date().getFullYear(),
      dialogVisible,
      selectedParty,
      handleVote,
      hasVoted,
      sendMessage,
      isAdmin,
      showLogs,
      pricing_data,
      handleLogout,
    };
  },
  methods: {
    async sendMessage(citizenId, pricing_data) {
      console.log("Citizen Number", this.citizenNumber);
      const message = pricing_data;
      if (!message) return;
      try {
        const response = await fetch(
          `${
            citizenId === 1 ? this.citizen1Url : this.citizen2Url
          }/send/${message}`
        );
        const data = await response.json();
        console.log(data);
        hasVoted.value = true; // Set hasVoted to true after successful vote
        this.dialogVisible = false;
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },
  },
});
</script>

<style scoped>
.q-header {
  padding: 12px 20px;
}
</style>
