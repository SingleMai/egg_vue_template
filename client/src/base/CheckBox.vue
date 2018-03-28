<template>
  <div>
    <p class="config-world">{{ title }}</p>
    <el-col :span="24">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <el-checkbox-group v-model="checks" @change="handleCheckedChange" class="switch-group">
        <el-checkbox v-for="item in options" :label="item" :key="item">{{ item }}</el-checkbox>
      </el-checkbox-group>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'CheckBox',
  data () {
    return {
      isIndeterminate: false,
      checkAll: false,
      checks: [],
      allChecks: []
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },
  created () {
    this.allChecks = this.options.map((val) => val)
  },
  methods: {
    handleCheckAllChange (val) {
      this.checks = val ? this.allChecks : []
      this.isIndeterminate = false
    },
    handleCheckedChange (val) {
      let checkedCount = val.length
      this.checkAll = checkedCount === this.options.length
      this.isIndeterminate = checkedCount > 0 && (checkedCount < this.options.length)
    }
  },
  watch: {
    checks (newVal) {
      this.$emit('checkChange', newVal)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
.config-world {
  font-size: 16px;
  margin: 10px 0;
}
.switch-group {
  display: inline;
  margin-left: 15px;
}
.el-checkbox+.el-checkbox {
  margin-left: 15px;
}
</style>
