<template>
  <q-card class="text-white" :style="{ 'background-image': background_image }">
    <q-card-section>
      <div class="text-h6 text-center">
        {{ title }}
      </div>
    </q-card-section>
    <q-card-section class="flex flex-center">
      <img :src="image" :alt="title + ' candidate'" class="candidate-image" />
    </q-card-section>
    <q-card-section class="q-pa-none">
      <div v-if="showPercentage" class="text-h2 text-weight-bolder text-center">
        {{ votepercentage }}%
      </div>
      <div v-else class="text-h6 text-weight-light text-center q-pt-md">
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6 text-weight-bolder text-center">
        {{ text }}
      </div>
    </q-card-section>
    <q-card-actions vertical align="center">
      <q-btn 
        outline 
        class="text-capitalize" 
        @click="sendMessage"
        :disabled="disabled || hasVoted"
      >
        {{ hasVoted ? 'Already Voted' : 'Vote for me' }}
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CardPricing",

  props: {
    background_image: String,
    title: String,
    icon: String,
    image: String,
    votepercentage: [String, Number],
    text: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    showPercentage: {
      type: Boolean,
      default: false,
    },
    hasVoted: {
      type: Boolean,
      default: false,
    }
  },

  methods: {
    sendMessage() {
      if (!this.disabled && !this.hasVoted) {
        this.$emit("vote", this.title);
      }
    },
  },
});
</script>

<style scoped>
.candidate-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.q-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>