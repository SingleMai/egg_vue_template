import * as types from './mutation-types'

const mutations = {
  [types.SET_CATEGORY] (state, category) {
    state.category = category
  },
  [types.SET_OFFICE] (state, office) {
    state.office = office
  },
  [types.SET_HAS_RELATION] (state, boolean) {
    state.hasRelation = boolean
  }
}

export default mutations
