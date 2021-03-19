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
      console.log("record button data:", data.blob);
      console.log("Sound in ms:", data.duration);
    }
  }
};
</script>

<style>
.record{
  width: 200px;
  height: 100px;
   border-radius: 100px;
}
.record.active {
  background: red;
}
</style>