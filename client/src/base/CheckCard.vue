<template>
  <div>
    <el-card class="box-card" :body-style="cardStyle">
      <div slot="header" class="header">
        <span>{{ title }}</span>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      </div>
      <el-checkbox-group v-model="checks" @change="handleCheckedChange">
        <ul class="card-list">
          <li class="card-item" v-for="item in options" :key="item">
            <label @click="choseLabel(item)">{{ item }} Debug</label>
            <el-checkbox :label="item" :ref="item">{{''}}</el-checkbox>
          </li>
        </ul>
      </el-checkbox-group>
    </el-card>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      isIndeterminate: false,
      checkAll: false,
      checks: [],
      allChecks: [],
      cardStyle: {
        padding: '10px'
      }
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
    this.$bus.$on('checkAll', this.checkAllDebug)
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
    },
    choseLabel (item) {
      let index = this.indexOfArray(this.checks, item)
      if (index === -1) {
        this.checks.push(item)
      } else {
        this.checks.splice(index, 1)
      }
    },
    indexOfArray (array, item) {
      for (let i = 0; i < array.length; i++) {
        const one = array[i]
        if (item === one) {
          return i
        }
      }
      return -1
    },
    checkAllDebug (val) {
      this.checkAll = val
      this.handleCheckAllChange(val)
    }
  },
  beforeDestroy () {
    this.$bus.$off('checkAll')
  },
  watch: {
    checks (newVal) {
      this.$emit('checkChange', newVal, this.title)
    }
  }
}
</script>

<style lang="scss" type="text/css">
.el-card__header {
  padding: 10px 5px;
}
</style>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
.box-card {
  box-sizing: border-box;
  margin: 10px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }
  .card-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    .card-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      label {
        font-size: 14px;
        margin: 5px;
      }
    }
  }
}
</style>