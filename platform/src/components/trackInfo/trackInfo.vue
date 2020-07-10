<template>
    
</template>

<script>
    export default {
      name: "track-info",
      props: {
        saoId: Number
      },
      data() {
        return {
          info: null,
          fake_info: {
            pushDate: '2020-07-06 13:05:40.0',
            trackNoDate: '2020-07-07 13:05:40.0',
            fulfillmentDate: '2020-07-08 13:05:40.0',
            deliverySt: '4',
            trackingNumber: 'S123413879832684237684',
            wspName: 'SF Holding',
          }
        }
      },
      created() {
        this.info = this.fake_info;
      }
    }
</script>

<style scoped>

</style>
