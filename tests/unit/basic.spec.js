import { mount, shallowMount } from '@vue/test-utils'
import App from '../../docs-src/App.vue'
import Docs from '../../docs-src/Docs.vue'

describe('App.vue', () => {
  it('renders Home page', () => {
    const msg = 'vue-highlights'
    const wrapper = mount(App, {
      stubs: ['router-link', 'router-view']
    })
    expect(wrapper.text()).toMatch(msg)
  })
})

describe('Docs.vue', () => {
  it('renders Docs page', () => {
    const msg = 'Documentation'
    const wrapper = shallowMount(Docs, {
      stubs: ['router-link']
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
