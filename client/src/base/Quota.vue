<template>
  <div style="margin-top: 10px;text-align: center;">
    <el-button @click="toggleShow" type="primary">{{ showWorld }}</el-button>
    <div v-if="show" :class="className" :style="{ height: height, width: width }" ref="myEchart"></div>
    <p class="quota-primary">* 轮询周期为: {{ origData.intervalTime }} 分钟*</p>
    <p class="quota-primary warning">* 注意: 内容已经  <span>{{ passTime }} 分钟</span> 没有更新 *</p>
  </div>
</template>

<script>
import echarts from 'echarts'
import { fireFoxNewDate, getTime } from 'js/util'
// import * as Api from 'api'
export default {
  name: 'Quota',
  // mounted () {
  //   // this.passTimes()
  //   // this.initChart()
  // },
  data () {
    return {
      show: false,
      showWorld: `显示${this.origData.name}`,
      chart: null,
      passTime: null,
      hasShowError: false,
      options: {
        title: {
          text: `${this.origData.name}`, // 标题
          top: 10,
          left: 40
        },
        color: ['#3398DB'], // 柱的颜色
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] }
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          // X轴的数值:time
          data: this.getTime(),
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value'
        }],
        // 上下限设置
        visualMap: {
          top: 10,
          right: 90,
          pieces: [{
            gt: 0,
            lte: this.origData.downLimit, // 下限
            color: '#F56C6C'
          }, {
            gt: this.origData.downLimit, // 下限
            lte: this.origData.upLimit, // 上限
            color: '#409EFF'
          }],
          outOfRange: {
            color: '#F56C6C'
          }
        },
        series: [{
          name: '数值',
          type: 'line',
          barWidth: '60%',
          markLine: {
            silent: false,
            data: [{
              yAxis: this.origData.upLimit
            }, {
              yAxis: this.origData.downLimit
            }]
          },
          // 数值
          data: this.origData.values
        }]
      }
    }
  },
  props: {
    origData: {
      type: Object
    },
    className: {
      type: String,
      default: 'echart'
    },
    width: {
      type: String,
      default: '1100px'
    },
    height: {
      type: String,
      default: '500px'
    }
  },
  methods: {
    initChart () {
      this.$nextTick(() => {
        const _this = this
        setTimeout(() => {
          _this.chart = echarts.init(_this.$refs.myEchart)
          _this.flushChart()
        }, 24)
      })
    },
    toggleShow () {
      if (this.show) {
        // this.passTimes()
        // this.initChart()
        this.showWorld = `显示${this.origData.name}`
      } else {
        this.passTimes()
        this.initChart()
        this.showWorld = '收起'
      }
      this.show = !this.show
    },
    // 由于在data中不能好像没办法使用computed
    // 所以只能用methods进行替代.有一定性能亏损
    getTime () {
      const arr = []
      for (const item of this.origData.times) {
        const date = new Date(item)
        arr.push(getTime(date))
      }
      return arr
    },
    flushChart () {
      // 把配置和数据放这里
      this.chart.setOption(this.options)
    },
    updateOptions () {
      this.options.series[0].data = this.origData.values
      this.options.xAxis[0].data = this.getTime()
    },
    // 由于new Date()是动态变化的,不能用computed
    passTimes () {
      const updateTime = fireFoxNewDate(this.origData.updatedAt)
      const timestamp = new Date() - updateTime
      this.passTime = parseInt(timestamp / (1000 * 60))
      if (this.passTime - 2 > this.origData.intervalTime) {
        if (!this.hasShowError) {
          this.$notify.error({
            title: '指标超时未更新',
            duration: 0,
            onClose: this.onClose,
            message: `${this.origData.name} 超时 至少 ${this.passTime} 分钟未更新`
          })
          this.hasShowError = true
        }
      }
    },
    onClose () {
      this.hasShowError = false
    }
  },
  watch: {
    origData () {
      if (this.show) {
        this.updateOptions()
        this.passTimes()
        this.flushChart()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.quota-primary {
  font-size: 17px;
  text-align: center;
  line-height: 10px;
}
.quota-primary.warning {
  color: red;
}
.echart {
  margin: 0 auto;
}
</style>
