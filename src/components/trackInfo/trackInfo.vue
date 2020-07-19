<template>
    <div>
      <div class="flex lg12">
        <va-card no-padding-v title="Tracking information">
          <label class="labels">Courier company: </label>{{info.wspName}}<br>
          <label class="labels">Delivery state: </label>{{getState}}
        </va-card>
      </div>

      <div class="flex lg12">
        <va-card no-padding-v title="Tracking timeline">

          <va-timeline vertical centered style="min-width: 300px;">

            <va-timeline-item active>
              <span
                slot="before"
                class="title title--danger va-timeline-item__text"
                :style="{color: $themes.primary}"
              >
                {{getPushDate('push')}}
              </span>
              <va-card
                slot="after"
                stripe="success"
                class="mb-0"
              >
                <template slot="title">{{ titleFirst }}</template>
                {{ contentFirst }}
              </va-card>
            </va-timeline-item>

            <va-timeline-item active>
              <span
                slot="before"
                class="title title--danger va-timeline-item__text"
                :style="{color: $themes.primary}"
              >
                {{getPushDate('trackNo')}}
              </span>
              <va-card
                slot="after"
                stripe="success"
                class="mb-0"
              >
                <template slot="title">{{ titleSecond }}</template>
                {{ contentSecond + info.trackingNumber }}
              </va-card>
            </va-timeline-item>

            <va-timeline-item active>
              <span
                slot="before"
                class="title title--danger va-timeline-item__text"
                :style="{color: $themes.primary}"
              >
                {{getPushDate('fulfillment')}}
              </span>
              <va-card
                slot="after"
                stripe="success"
                class="mb-0"
              >
                <template slot="title">{{ titleSecond }}</template>
                {{ contentThird }}
              </va-card>
            </va-timeline-item>

          </va-timeline>

          <div class="row">
            <div class="flex lg2 offset--lg10">
              <br>
            </div>
            <div class="flex lg2 offset--lg10">
              <br>
            </div>
            <div class="flex lg2 offset--lg10">
              <va-button outline @click="close"> Close </va-button>
            </div>
          </div>


        </va-card>

      </div>





    </div>
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
          titleFirst: 'Synchronized',
          titleSecond: 'Get tracking number',
          titleThird: 'Fulfilled',
          contentFirst: 'The order has benn synchronized to warehouse.',
          contentSecond: 'The order has been out of stock and shipped. The tracking number is: ',
          contentThird: 'The order has been fulfilled.',
          transMonthObj: {
            '01' : "January",
            '02' : "February",
            '03' : "March",
            '04' : "April",
            '05' : "May",
            '06' : "June",
            '07' : "July",
            '08' : "August",
            '09' : "September",
            '10' : "October",
            '11' : "November",
            '12' : "December"
          }
        }
      },
      methods: {
        // type: push & trackNo & fulfillment
        getPushDate(type) {
          let ym = this.info[type + 'Date'].split('-');
          let year = ym.slice(0, 1);
          let month = ym.slice(1, 2);
          let date = ym.slice(2, 3);
          return this.transMonthObj[month] + ' ' + date + ', ' + year;
        },
        close() {
          this.$emit('close', null);
        }
      },
      computed: {
        getState() {
          if (this.info.deliverySt === '1') {
            return 'Synchronized'
          } else if (this.info.deliverySt === '2') {
            return 'Out of stock'
          } else if (this.info.deliverySt === '3') {
            return 'Shipping'
          } else if (this.info.deliverySt === '4') {
            return 'Fulfilled'
          }
        },
      },
      created() {
        let fake_info = {
            pushDate: '2020-07-06',
            trackNoDate: '2020-07-07',
            fulfillmentDate: '2020-07-08',
            deliverySt: '4',
            trackingNumber: 'S123413879832684237684',
            wspName: 'SF Holding',
        }; // to be deleted

        this.info = fake_info;
      }
    }
</script>

<style scoped>
  .labels {
    font-weight: bold;
  }
</style>
