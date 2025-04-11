<template>
  <q-card class="text-white" :style="{'background-image': background_image}">
    <q-card-section>
      <div class="text-h6 text-center">
        {{ title }}
      </div>
    </q-card-section>
    <q-card-section>
      <img 
    :src="image" 
    :alt="title + ' candidate'" 
    class="candidate-image"
  />
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
  props: ['background_image', 'title', 'icon', 'voteCount', 'text', 'image'],
  mounted() {
    console.log("Image prop:", this.image);  // ✅ ADD THIS LINE
  },
  methods: {
    sendMessage() {
      this.$emit('vote', this.title);
    }
  }
})
</script>

<style scoped>
/* Add your styles here */
.candidate-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

</style>