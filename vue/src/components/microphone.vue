<!-- 
microhpone source code: 
https://github.com/loquiry/vue-record-audio

install:  npm i @loquiry/vue-record-audio

-->

<template>

  <VueRecord class="record" @result="onResult">
    Record
    <template slot="isInitiating">
      Grant microphone permissions
    </template>
    <template slot="isRecording">
      Stop
    </template>
    <template slot="isCreating">
      Creating Sound...
    </template>
    
  </VueRecord>
</template>

<script>
import VueRecord from "@loquiry/vue-record-audio";

export default {
  name: 'mic',
  components: { VueRecord },
  methods: {
    onResult(data) {
      console.log("record button data:", data);
      console.log("Sound in ms:", data.duration);
      console.log(URL.createObjectURL(data.blob));



    }
  }
};
</script>

<style>
#test {
  height: 200px;
  width: 200px;
  background-color: burlywood;
}
.record{
  width: 200px;
  height: 100px;
  border-radius: 100px;
}
.record.active {
  background: red;
}
</style>