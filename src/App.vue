<template>
  <v-app>

    <v-app-bar app>
      <v-app-bar-title>Banker Algorithm UI</v-app-bar-title>
      <!--      <v-btn-group>-->
      <!--        <v-btn color="primary" variant="outlined">-->
      <!--          Thêm Tiến Trình-->
      <!--        </v-btn>-->

      <!--        <v-btn color="primary" variant="outlined">-->
      <!--          Thêm Tài Nguyên-->
      <!--        </v-btn>-->
      <!--      </v-btn-group>-->
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container>


        <v-row>
          <v-col cols="12">
            <h2>Nhập số lượng tiến trình và tài nguyên:</h2>
          </v-col>
          <v-col cols="12">
            <v-form v-model="valid">
              <v-row>
                <v-col
                    cols="12"
                    md="3"
                >
                  <v-text-field
                      v-model="processCount"
                      :rules="processCountRules"
                      :counter="1"
                      label="Tiến trình"
                      required
                      type="number"
                      Min="0"
                      v-on:keyup="updateTables"
                  ></v-text-field>
                </v-col>

                <v-col
                    cols="12"
                    md="3"
                >
                  <v-text-field
                      v-model="resourceCount"
                      :rules="resourceCountRules"
                      :counter="1"
                      label="Tài nguyên"
                      required
                      type="number"
                      Min="0"
                      v-on:keyup="updateTables"
                  ></v-text-field>
                </v-col>

              </v-row>
            </v-form>
          </v-col>
        </v-row>


        <!-- EDIT TABLE -->
        <v-row>

          <v-col
              cols="12"
              md="3"
          >
            <h2>MAX</h2>
            <v-table>
              <thead>
              <tr>
                <th class="text-left" v-for="(resource,index) in data.max[0]" :key="index">
                  R{{ index + 1 }}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr data-max-process v-for="(process,i) in data.max" :key="i">
                <td v-for="(resource,j) in process" :key="j">
                  <input data-max-resource type="number" :value="resource" style="width:50px" v-on:change="updateData">
                </td>
              </tr>
              </tbody>
            </v-table>
          </v-col>

          <v-col
              cols="12"
              md="3"
          >
            <h2>Allocation</h2>
            <v-table>
              <thead>
              <tr>
                <th class="text-left" v-for="(resource,index) in data.allocation[0]" :key="index">
                  R{{ index + 1 }}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr data-allocation-process v-for="(process,i) in data.allocation" :key="i">
                <td v-for="(resource,j) in process" :key="j">
                  <input data-allocation-resource type="number" :value="resource" style="width:50px"
                         v-on:change="updateData">
                </td>
              </tr>
              </tbody>
            </v-table>
          </v-col>

          <v-col
              cols="12"
              md="3"
          >
            <h2>Need</h2>
          </v-col>

          <v-col
              cols="12"
              md="3"
          >
            <h2>Work (Available)</h2>
          </v-col>

        </v-row>

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
      valid: false,
      processCount: 2,
      processCountRules: [
        v => v >= 2 || 'Nhập ít nhất 2 tiến trình.'
      ],
      resourceCount: 3,
      resourceCountRules: [
        v => v >= 2 || 'Nhập ít nhất 2 tài nguyên.'
      ],
      data: {
        max: [],
        allocation: [],
        need: [],
        available: []
      }
    }
  },
  methods: {
    updateData(){
      // update Max table
      const max = [];
      document.querySelectorAll(`[data-max-process]`).forEach(p => {
        const p_max = [];
        p.querySelectorAll('[data-max-resource]').forEach(r => {
          p_max.push(parseInt(r.value));
        });
        max.push(p_max);
      });
      this.data.max = {...max};

      // update Allocation table
      const allocation = [];
      document.querySelectorAll(`[data-allocation-process]`).forEach(p => {
        const p_allocation = [];
        p.querySelectorAll('[data-allocation-resource]').forEach(r => {
          p_allocation.push(parseInt(r.value));
        });
        allocation.push(p_allocation);
      });
      this.data.allocation = {...allocation};

      console.log(this.data)
    },
    updateTables(){
      const emptyMatrix = [];
      for(let i = 0; i < this.processCount; i++){
        const process = [];
        for(let j = 0; j < this.resourceCount; j++){
          process.push(0);
        }
        emptyMatrix.push(process);
      }
      this.data.max = [...emptyMatrix];
      this.data.allocation = [...emptyMatrix];
      this.data.need = [...emptyMatrix];
    }
  },
  mounted(){
    this.updateTables();

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

    //const systems = new Banker(a);
    //console.log(systems.isSystemSafe())
    //systems.request(1, [0, 4, 2, 0]);
  }
}
</script>
<style>
</style>
