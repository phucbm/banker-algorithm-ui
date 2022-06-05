<template>
  <v-app>

    <v-app-bar app>
      <v-app-bar-title>Banker Algorithm UI</v-app-bar-title>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container>


        <v-table>
          <thead>
          <tr>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              Calories
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="item in desserts"
              :key="item.name"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.calories }}</td>
          </tr>
          </tbody>
        </v-table>


      </v-container>
    </v-main>

    <v-footer app>
      Made with ❤️ by PHUCBM
    </v-footer>


  </v-app>
</template>
<script>
import {Banker} from "@/plugins/banker-algorithm";

export default {
  name: 'App',
  data(){
    return {
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
      ],
    }
  },
  mounted(){
    const a = {
      allocation: [
        [0, 0, 1, 2],
        [1, 0, 0, 0],
        [1, 3, 5, 4],
        [0, 6, 3, 2],
        [0, 0, 1, 4]
      ],
      max: [
        [0, 0, 1, 2],
        [1, 7, 5, 0],
        [2, 3, 5, 6],
        [0, 6, 5, 2],
        [0, 6, 5, 6]
      ],
      available: [1, 5, 2, 0]
    };

    const systems = new Banker(a);
    console.log(systems.isSystemSafe())
    systems.request(1, [0, 4, 2, 0]);
  }
}
</script>
<style>
</style>
