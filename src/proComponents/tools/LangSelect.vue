<template>
  <a-dropdown>
    <span class="action global-lang">
      <a-icon
        type="global"
        style="font-size: 16px;margin-right:5px"
      />{{ txt }}
    </span>
    <a-menu
      slot="overlay"
      style="width: 150px;"
      @click="SwitchLang"
    >
      <a-menu-item key="cn">
        <a rel="noopener noreferrer">
          {{ cnTxt }}
        </a>
      </a-menu-item>
      <a-menu-item key="en">
        <a rel="noopener noreferrer">
          {{ enTxt }}
        </a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
// import { mixin as langMixin } from '@/store/i18n-mixin'
export default {
  name: 'LangSelect',
  // mixins: [langMixin],
  data () {
    return {
      txt: null,
      cnTxt: '简体中文',
      enTxt: 'English'
    }
  },
  created () {
    this.txt = window.localStorage.getItem('lang') === 'en' ? this.enTxt : this.cnTxt
  },
  methods: {
    SwitchLang ({ key }) {
      window.localStorage.setItem('lang', key)
      this.txt = key === 'en' ? this.enTxt : this.cnTxt
      window.location.reload()
    }
  }
}
</script>
