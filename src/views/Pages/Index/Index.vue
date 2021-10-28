<template>
  <div class="home">
    <h1 class="subtitle-1 grey--text">Home</h1>

    <v-expansion-panels>
      <v-expansion-panel v-for="project in projects"
                         :key="project.title">
        <v-expansion-panel-header>{{project.title}}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card flat>
            <v-card-text class="px-4 grey--text">
              <div class="font-weight-bold">{{project.due}}</div>
              <div>{{project.content}}</div>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {

  },
  data () {
    return {
      projects: [
        { title: 'Design a new website.', person: 'Simon', due: '1st Jan 2022', status: 'ongoing', content: 'Hello World' },
        { title: 'Design a new website1.', person: 'Simon3', due: '1st Jan 2022', status: 'complete', content: 'Hello World1' },
        { title: 'Design a new website2.', person: 'Simon2', due: '1st Jan 2022', status: 'complete', content: 'Hello World2' },
        { title: 'Design a new website3.', person: 'Simon1', due: '1st Jan 2022', status: 'overdue', content: 'Hello World3' },
      ]
    };
  },
  computed: {

  },
  created () {

  },
  mounted () {

  },
  methods: {

  },
};
</script>

<style scoped>
</style>
