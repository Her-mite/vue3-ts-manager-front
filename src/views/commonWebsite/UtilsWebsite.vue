<template>
    <website-component :websiteType="websiteType" :websiteName="websiteName" :needRemarks="needRemarks" />
</template>

<script>
import {  defineComponent } from 'vue';
import WebsiteComponent from './WebsiteComponent';
export default defineComponent({

  setup(){
    const websiteType = 'Utils';
    const websiteName = '常用工具';
    const needRemarks = false;

    return {websiteType, websiteName, needRemarks};
  },
  components: {
    WebsiteComponent,
  },
});
</script>

<style></style>
