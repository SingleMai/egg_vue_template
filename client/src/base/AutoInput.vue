<template>
  <el-row type="flex" align="middle">
    <el-col :span="6">
      <span class="block-left-label">{{ label }}</span>
    </el-col>
    <el-col :span="18">
      <el-autocomplete size="mini"
                        popper-class="autocomplete"
                        v-model="data"
                        placeholder="请输入内容"
                        :fetch-suggestions="configList"
                        @select="handleSelect"       
      >
      <template slot-scope="props">
        <div class="name">{{ props.item.name }}</div>
        <span class="data">{{ props.item.data }}</span>
      </template>
      </el-autocomplete>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      data: ''
    }
  },
  props: {
    label: {
      type: String,
      required: true
    },
    autoTips: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    }
  },
  methods: {
    configList (qs, cb) {
      var autoTips = this.autoTips
      var results = qs ? autoTips.filter(this.createFilter(qs)) : autoTips
      cb(results)
    },
    createFilter (qs) {
      return (autoTips) => {
        return (autoTips.name.toLowerCase().indexOf(qs.toLowerCase()) === 0)
      }
    },
    handleSelect (item, e) {
      this.data = item.data
    }
  },
  watch: {
    data (newVal) {
      this.$emit('dataChange', newVal)
    }
  }
}
</script>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>
.autocomplete li {
  padding: 7px!important;
  line-height: normal!important;
}
.autocomplete .name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.autocomplete .data {
  font-size: 12px;
  color: #b4b4b4;
}
.autocomplete .highlighted .data {
  color: #ddd;
}
</style>

<style scoped>
.block-left-label {
  font-size: 15px;
}
</style>