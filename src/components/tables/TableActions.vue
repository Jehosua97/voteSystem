<template>
  <q-card class="no-shadow" bordered>
    <q-card-section>
      <div class="text-h6 text-grey-8">
        Citizen List
        <q-btn label="Export" class="float-right text-capitalize text-indigo-8 shadow-3" icon="person"/>
      </div>
    </q-card-section>
    <q-separator></q-separator>
    <q-card-section>
      <q-input v-model="search" placeholder="Search..." class="q-mb-md" />
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-table :rows="paginatedUsers" :columns="columns" hide-bottom class="no-shadow">
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <q-item style="max-width: 420px">
              <q-item-section avatar>
                <q-avatar>
                  <img src="profile.svg">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ props.row.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>
        <template v-slot:body-cell-Voted="props">
          <q-td :props="props">
            <q-item-section>
              <q-item-label>{{ props.row.voted === 1 ? 'Yes' : 'No' }}</q-item-label>
            </q-item-section>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="database" size="sm" flat dense @click="showMessage"/>
          </q-td>
        </template>
      </q-table>
      <q-pagination
        v-model="page"
        :max="maxPage"
        max-pages="7"
        boundary-numbers
        class="q-mt-md"
      />
    </q-card-section>
  </q-card>

  <!-- Dialog component -->
  <q-dialog v-model="dialogVisible" class="dialog-wide">
    <q-card>
      <q-card-section>
        <div class="text-h6">Votes</div>
      </q-card-section>
      <q-card-section>
        <pre id="votes1" class="json-viewer"></pre>
        <pre id="votes2" class="json-viewer"></pre>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Close" @click="dialogVisible = false" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import axios from 'axios'

const columns = [
  { name: 'Name', label: 'Name', field: 'name', sortable: true, align: 'left' },
  { name: 'voting_id', label: 'Voter ID', field: 'voting_id', sortable: true, align: 'left' },
  { name: 'phone_number', label: 'Phone Number', field: 'phone_number', sortable: true, align: 'left' },
  { name: 'Voted', label: 'Already Voted?', field: 'voted', sortable: true, align: 'left' },
  { name: 'Action', label: '', field: 'Action', sortable: false, align: 'center' }
];

export default defineComponent({
  name: "TableActions",
  setup() {
    const users = ref([])
    const search = ref('')
    const page = ref(1)
    const rowsPerPage = ref(10) // Ensure this is set to 10
    const dialogVisible = ref(false)

    const fetchUsers = () => {
      axios.get('http://localhost:3000/users')
        .then(response => {
          users.value = response.data
          console.log(users.value)
        })
        .catch(error => {
          console.error('Error fetching users:', error)
        })
    }

    const filteredUsers = computed(() => {
      return users.value.filter(user => {
        return user.name.toLowerCase().includes(search.value.toLowerCase()) ||
               user.voting_id.toLowerCase().includes(search.value.toLowerCase()) ||
               user.phone_number.includes(search.value)
      })
    })

    const paginatedUsers = computed(() => {
      const start = (page.value - 1) * rowsPerPage.value
      const end = start + rowsPerPage.value
      return filteredUsers.value.slice(start, end)
    })

    const maxPage = computed(() => {
      return Math.ceil(filteredUsers.value.length / rowsPerPage.value)
    })

    const showMessage = () => {
      dialogVisible.value = true
      updateVotesView()
    }

    const updateVotesView = async () => {
      try {
        // Obtener votos de Citizen 1
        const response1 = await fetch(`http://10.173.8.113:5001/votes`);
        const votes1 = await response1.json();
        displayVotes('votes1', votes1);

        // Obtener votos de Citizen 2
        const response2 = await fetch(`${citizen2Url}/votes`);
        const votes2 = await response2.json();
        displayVotes('votes2', votes2);
      } catch (error) {
        console.error('Error updating votes:', error);
      }
    }

    const displayVotes = (containerId, votes) => {
      const container = document.getElementById(containerId);
      container.innerHTML = '';

      const votesJson = JSON.stringify(votes, null, 2);
      const preElement = document.createElement('pre');
      preElement.textContent = votesJson;
      preElement.className = 'json-viewer';

      container.appendChild(preElement);
    }

    return {
      columns,
      users,
      search,
      page,
      rowsPerPage,
      fetchUsers,
      filteredUsers,
      paginatedUsers,
      maxPage,
      dialogVisible,
      showMessage,
      citizen1Url: 'http://10.173.8.113:5001',
      citizen2Url: 'http://10.173.8.113:5002',
      frontendUrl: 'http://10.173.8.113:9000'
    }
  },
  mounted() {
    this.fetchUsers()
  }
})
</script>

<style scoped>
.dialog-wide {
  width: 70vw; /* 70% of the viewport width */
  height: 70vh; /* 70% of the viewport height */
}

.json-viewer {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  font-family: monospace;
  white-space: pre-wrap;
}
</style>