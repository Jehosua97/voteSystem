<template>
  <q-card class="text-white" :style="{'background-image': background_image}">
    <q-card-section>
      <div class="text-h6 text-center">
        {{ title }}
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-h2 text-weight-bolder text-center">
        <q-icon :name="icon"></q-icon>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <div class="text-h2 text-weight-bolder text-center">
        {{ voteCount }}
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6 text-weight-bolder text-center">
        {{ text }}
      </div>
    </q-card-section>
    <q-card-actions vertical align="center">
      <q-btn outline class="text-capitalize" @click="sendMessage">Vote for this candidate</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: "CardPricing",
  props: {
    background_image: String,
    title: String,
    icon: String,
    voteCount: [String, Number], // Accepts both String and Number
    text: String,
    disabled: {
      type: Boolean,
      default: false // Default value when not provided
    }
  },
  methods: {
    sendMessage() {
      if (!this.disabled) {
        this.$emit('vote', this.title);
      }
    }
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>