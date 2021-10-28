<template>
  <div class="about">
    <h1 class="subtitle-1 grey--text">About</h1>
    <v-container>
      <v-row class="my-5">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="grey"
                   small
                   text
                   v-on="on"
                   v-bind="attrs"
                   @click="sortBy('title')">
              <v-icon left>mdi-folder</v-icon>
              <span class="caption text-lowercase">By project title</span>
            </v-btn>
          </template>
          <span>sort by project title</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{on,attrs}">
            <v-btn color="grey"
                   small
                   text
                   v-on="on"
                   v-bind="attrs"
                   @click="sortBy('person')">
              <v-icon left>mdi-account</v-icon>
              <span class="caption text-lowercase">By person</span>
            </v-btn>
          </template>
          <span>sort by person</span>
        </v-tooltip>
      </v-row>

      <v-card flat
              v-for="project in projects"
              :key="project.title">
        <v-row :class="`ma-0 project ${project.status}`">
          <v-col cols="12"
                 md="6">
            <h1 class="text-caption grey--text">About title</h1>
            <p>{{project.title}}</p>
          </v-col>
          <v-col cols="6"
                 sm="4"
                 md="2">
            <h1 class="text-caption grey--text">Person</h1>
            <p>{{project.person}}</p>
          </v-col>
          <v-col cols="6"
                 sm="4"
                 md="2">
            <h1 class="text-caption grey--text">Due by</h1>
            <p>{{project.due}}</p>
          </v-col>
          <v-col cols="2"
                 sm="4"
                 md="2">
            <div class="float-right">
              <v-chip :class="`${project.status}  text-caption my-2 white--text`">{{project.status}}</v-chip>
            </div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'About',
  components: {

  },
  data () {
    return {
      projects: [
        { title: 'Design a new website.', person: 'Simon', due: '1st Jan 2022', status: 'ongoing', content: 'Hello World' },
        { title: 'Design a new website1.', person: 'Simon3', due: '1st Jan 2022', status: 'complete', content: 'Hello World1' },
        { title: 'Design a new website2.', person: 'Simon2', due: '1st Jan 2022', status: 'complete', content: 'Hello World2' },
        { title: 'Design a new website3.', person: 'Simon1', due: '1st Jan 2022', status: 'overdue', content: 'Hello World3' },
      ],
      attrs: true
    };
  },
  computed: {

  },
  created () {

  },
  mounted () {

  },
  methods: {
    sortBy (prop) {
      this.projects.sort((a, b) => a[prop] > b[prop] ? -1 : 1)
    }
  },
};
</script>

<style scoped>
.ongoing {
  border-left: 4px solid #3cd1c2;
}
.project.complete {
  border-left: 4px solid orange;
}
.project.overdue {
  border-left: 4px solid tomato;
}
.v-chip.v-chip--no-color.ongoing {
  background-color: #3cd1c2;
}
.v-chip.v-chip--no-color.complete {
  background-color: orange;
}
.v-chip.v-chip--no-color.overdue {
  background-color: tomato;
}
</style>
