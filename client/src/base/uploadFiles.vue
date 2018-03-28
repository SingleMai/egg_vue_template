<template>
  <div>
    <div class="upload-box" :style="styles">
      <input ref="fileInput" id="file-input" type="file" :name="name" :multiple="multiple" @change="addFiles" :accept="accept">
      <slot></slot>
    </div>
    <ul class="files-list">
      <li class="file-item" v-for="(file, key) in files" :key="key">
        <span>{{ file.name }}</span>
        <Icon type="checkmark-round" color="#19be6b"></Icon>
      </li>
      <li class="file-item" v-for="(file, index) in origFiles" :key="index">
        <span>{{ file.file }}</span>
        <Icon type="checkmark-round" color="#19be6b"></Icon>
        <span class="btn-delete" @click.stop="deleteFiles(file.id, index)">删除</span>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  data () {
    return {
      files: {}
    }
  },
  props: ['multiple', 'styles', 'origFiles', 'name', 'accept'],
  methods: {
    addFiles (event) {
      const files = this.$refs.fileInput.files
      this.files = files
    },
    deleteFiles (id, index) {
      this.$emit('deleteFiles', id, index)
    }
  },
  watch: {
    files () {
      this.$emit('changeFiles', this.files)
    }
  }
}
</script>

<style lang="scss" scoped="" type="text/css">
@import '~common/sass/variable.sass';
  .upload-box {
    position: relative;
    text-align: center;
    width: 300px;
    border: 1px dashed $color-neutral-border;
  }
  #file-input {
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
    outline: none;
    opacity: 0;
    width: 100%;
    height: 100%;
  }
  .btn-delete {
    cursor: pointer;
    color: $color-assist-error;
    text-decoration: underline;
  }
</style>
