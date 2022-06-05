<template>
  <v-app>

    <v-app-bar app>
      <v-app-bar-title>Banker Algorithm UI</v-app-bar-title>
      <v-btn-group divided="">
        <!--        <v-btn color="info" variant="outlined" v-on:click="showRequest=!showRequest">-->
        <!--          Yêu cầu tài nguyên-->
        <!--        </v-btn>-->
        <v-btn color="primary" variant="outlined" v-on:click="checkSystem">
          Xử lý input
        </v-btn>
        <v-btn color="red" variant="outlined" v-on:click="deleteLocalStorage">
          Xoá input
        </v-btn>
      </v-btn-group>
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

                      Min="0"
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

                      Min="0"
                  ></v-text-field>
                </v-col>

                <v-col
                    cols="12"
                    md="3"
                >
                  <v-btn color="green" variant="outlined" v-on:click="updateTables(true)" height="55">
                    Cập nhật
                  </v-btn>

                </v-col>

              </v-row>
            </v-form>
          </v-col>
        </v-row>


        <!-- EDIT TABLE -->
        <v-row>
          <v-col
              cols="12"
          >
            <h2>Input</h2>
          </v-col>
          <v-col
              cols="12"
              md="3"
          >
            <h3>MAX</h3>
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
                  <input data-max-resource :value="resource" style="width:35px" v-on:change="updateData">
                </td>
              </tr>
              </tbody>
            </v-table>
          </v-col>

          <v-col
              cols="12"
              md="3"
          >
            <h3>Allocation</h3>
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
                  <input data-allocation-resource :value="resource" style="width:35px"
                         v-on:change="updateData">
                </td>
              </tr>
              </tbody>
            </v-table>
          </v-col>

          <v-col
              v-if="showNeed"
              cols="12"
              md="3"
          >
            <h3>Need</h3>
            <v-table>
              <thead>
              <tr>
                <th class="text-left" v-for="(resource,index) in data.need[0]" :key="index">
                  R{{ index + 1 }}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(process,i) in data.need" :key="i">
                <td v-for="(resource,j) in process" :key="j">
                  <div>{{ resource }}</div>
                </td>
              </tr>
              </tbody>
            </v-table>
          </v-col>

          <v-col
              cols="12"
              md="3"
          >
            <h3>Work (Available)</h3>
            <v-table>
              <thead>
              <tr>
                <th class="text-left" v-for="(resource,index) in data.allocation[0]" :key="index">
                  R{{ index + 1 }}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td v-for="(resource,i) in data.available" :key="i">
                  <input data-available :value="resource" style="width:35px"
                         v-on:change="updateData">
                </td>
              </tr>
              </tbody>
            </v-table>
          </v-col>

        </v-row>

        <v-row v-if="showRequest">
          <v-col
              cols="12"
              md="4"
          >
            <h3>Yêu cầu tài nguyên</h3>
            <v-radio-group inline v-model="requestProcessIndex">
              <v-radio
                  v-for="(process,index) in data.allocation"
                  :key="index"
                  :label="`P${parseInt(index)+1}`"
                  :value="index"
              ></v-radio>
            </v-radio-group>
          </v-col>
          <v-col
              cols="12"
              md="4"
          >
            <v-table>
              <thead>
              <tr>
                <th class="text-left" v-for="(resource,index) in data.allocation[0]" :key="index">
                  R{{ index + 1 }}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td v-for="(resource,i) in data.available" :key="i">
                  <input data-request :value="resource" style="width:35px"
                         v-on:change="updateData">
                </td>
              </tr>
              </tbody>
            </v-table>
            <v-btn color="blue" variant="outlined" v-on:click="request">
              Thực hiện yêu cầu
            </v-btn>
          </v-col>
        </v-row>

        <v-row v-for="(log,i) in logs" :key="i">
          <v-col>
            <v-alert variant="outlined" density="compact" :color="log.type==='warning'?'red':''">{{
                log.string
              }}
            </v-alert>
          </v-col>
        </v-row>

        <v-row v-if="showNeed&& !isSystemSafe">
          <v-col>
            <v-alert type="warning">Hệ thống không an toàn.</v-alert>
          </v-col>
        </v-row>
        <v-row v-if="showNeed && isSystemSafe">
          <v-col>
            <v-alert type="success">Hệ thống an toàn.</v-alert>
          </v-col>
        </v-row>

      </v-container>
    </v-main>

    <v-footer app>
      Minh hoạ cuối kỳ môn Hệ Điều Hành 2022 - Giảng viên Trần Đức Tâm
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
      showNeed: false,
      hasLocalData: false,
      data: {
        max: [],
        allocation: [],
        available: []
      },
      isSystemSafe: false,
      logs: [],
      showRequest: false,
      requestProcessIndex: 0
    }
  },
  methods: {
    deleteLocalStorage(){
      localStorage.removeItem("banker-algorithm-ui");
    },
    loadLocalData(){
      const data = JSON.parse(localStorage.getItem("banker-algorithm-ui"));

      if(!data) return;

      if(data.processCount) this.processCount = data.processCount;
      if(data.resourceCount) this.resourceCount = data.resourceCount;

      if(!data.data) return;
      if(data.data.max) this.data.max = this.parseArray(data.data.max);
      if(data.data.allocation) this.data.allocation = this.parseArray(data.data.allocation);
      if(data.data.available) this.data.available = this.parseArray(data.data.available);

      this.hasLocalData = true;
    },
    saveLocalData(){
      const data = {
        processCount: this.processCount,
        resourceCount: this.resourceCount,
        data: this.data
      };
      localStorage.setItem("banker-algorithm-ui", JSON.stringify(data));
    },
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

      // update Available
      const available = [];
      document.querySelectorAll('[data-available]').forEach(r => {
        available.push(parseInt(r.value));
      });
      this.data.available = [...available];

      // save data
      this.saveLocalData();
    },
    updateTables(reset = false){
      console.log('reset', reset)
      if(!reset){
        const allocationMatrix = [], maxMatrix = [];
        for(let i = 0; i < this.processCount; i++){
          const p_allocation = [];
          const p_max = [];
          for(let j = 0; j < this.resourceCount; j++){
            const max_val = this.hasLocalData ? this.data.max[i][j] : 0;
            const allocation_val = this.hasLocalData ? this.data.allocation[i][j] : 0;

            p_max.push(max_val);
            p_allocation.push(allocation_val);
          }
          allocationMatrix.push(p_allocation);
          maxMatrix.push(p_max);
        }
        this.data.max = [...maxMatrix];
        this.data.allocation = [...allocationMatrix];
      }else{
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
      }

      const available = [];
      for(let i = 0; i < this.resourceCount; i++){
        available.push(this.hasLocalData ? this.data.available[i] : 0);
      }
      this.data.available = [...available];

      // save data
      this.saveLocalData();
    },
    parseArray(object){
      const array = [];
      for(const [key, value] of Object.entries(object)){
        if(typeof value === 'object'){
          array.push(this.parseArray(value));
        }else{
          array.push(value);
        }
      }
      return array;
    },
    checkSystem(){
      const input = {
        allocation: this.parseArray(this.data.allocation),
        max: this.parseArray(this.data.max),
        available: this.parseArray(this.data.available)
      };

      const systems = new Banker(input);

      const need = systems.need;
      if(need){
        this.showNeed = true;
        this.data.need = [...need];
      }

      this.isSystemSafe = systems.isSystemSafe();

      this.logs = systems.logs;
      console.log('logs', systems.logs)


    },
    request(){
      // update Available
      const request = [];
      document.querySelectorAll('[data-request]').forEach(r => {
        request.push(parseInt(r.value));
      });

      if(!request) return;

      const input = {
        allocation: this.parseArray(this.data.allocation),
        max: this.parseArray(this.data.max),
        available: this.parseArray(this.data.available)
      };

      const systems = new Banker(input);
      systems.request(this.requestProcessIndex, request);
    }
  },
  mounted(){
    this.loadLocalData();
    this.updateTables();
  }
}
</script>
<style>
</style>
