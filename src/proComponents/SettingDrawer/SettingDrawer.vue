<template>
  <div class="setting-drawer">
    <a-drawer
      width="300"
      placement="right"
      @close="onClose"
      :closable="false"
      :visible="visible"
      :drawer-style="{ position: 'absolute' }"
      style="position: absolute"
    >
      <div class="setting-drawer-index-content">
        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">{{ $t('settingDrawer.globalStyleSetting') }}</h3>

          <div class="setting-drawer-index-blockChecbox">
            <a-tooltip>
              <template slot="title">{{ $t('settingDrawer.darkStyle') }}</template>
              <div class="setting-drawer-index-item" @click="handleMenuTheme('dark')">
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg"
                  alt="dark"
                />
                <div class="setting-drawer-index-selectIcon" v-if="navTheme === 'dark'">
                  <a-icon type="check" />
                </div>
              </div>
            </a-tooltip>

            <a-tooltip>
              <template slot="title">{{ $t('settingDrawer.lightStyle') }}</template>
              <div class="setting-drawer-index-item" @click="handleMenuTheme('light')">
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg"
                  alt="light"
                />
                <div class="setting-drawer-index-selectIcon" v-if="navTheme !== 'dark'">
                  <a-icon type="check" />
                </div>
              </div>
            </a-tooltip>
          </div>
        </div>

        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">{{ $t('settingDrawer.theme') }}</h3>
          <div style="height: 20px">
            <a-tooltip
              class="setting-drawer-theme-color-colorBlock"
              v-for="(item, index) in colorList"
              :key="index"
            >
              <template slot="title">{{ item.key }}</template>
              <a-tag :color="item.color" @click="changeColor(item.color)">
                <a-icon type="check" v-if="item.color === primaryColor"></a-icon>
              </a-tag>
            </a-tooltip>
          </div>
        </div>
        <a-divider />

        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">{{ $t('settingDrawer.navigationMode') }}</h3>

          <div class="setting-drawer-index-blockChecbox">
            <a-tooltip>
              <template slot="title">{{ $t('settingDrawer.sidebarNavigater') }}</template>
              <div class="setting-drawer-index-item" @click="handleLayout('sidemenu')">
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg"
                  alt="sidemenu"
                />
                <div class="setting-drawer-index-selectIcon" v-if="layoutMode === 'sidemenu'">
                  <a-icon type="check" />
                </div>
              </div>
            </a-tooltip>

            <a-tooltip>
              <template slot="title">{{ $t('settingDrawer.topNavigater') }}</template>
              <div class="setting-drawer-index-item" @click="handleLayout('topmenu')">
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg"
                  alt="topmenu"
                />
                <div class="setting-drawer-index-selectIcon" v-if="layoutMode !== 'sidemenu'">
                  <a-icon type="check" />
                </div>
              </div>
            </a-tooltip>
          </div>
          <div :style="{ marginTop: '24px' }">
            <a-list :split="false">
              <a-list-item>
                <a-tooltip slot="actions">
                  <template slot="title">{{ $t('settingDrawer.onlyValid') }}</template>
                  <a-select
                    size="small"
                    style="width: 80px;"
                    :defaultValue="contentWidth"
                    @change="handleContentWidthChange"
                  >
                    <a-select-option value="Fixed">{{ $t('settingDrawer.fixation') }}</a-select-option>
                    <a-select-option
                      value="Fluid"
                      v-if="layoutMode !== 'sidemenu'"
                    >{{ $t('settingDrawer.fluid') }}</a-select-option>
                  </a-select>
                </a-tooltip>
                <a-list-item-meta>
                  <div slot="title">{{ $t('settingDrawer.contentWidth') }}</div>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-switch
                  slot="actions"
                  size="small"
                  :defaultChecked="fixedHeader"
                  @change="handleFixedHeader"
                />
                <a-list-item-meta>
                  <div slot="title">{{ $t('settingDrawer.fixHeader') }}</div>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-switch
                  slot="actions"
                  size="small"
                  :disabled="!fixedHeader"
                  :defaultChecked="autoHideHeader"
                  @change="handleFixedHeaderHidden"
                />
                <a-list-item-meta>
                  <a-tooltip slot="title" placement="left">
                    <template slot="title">{{ $t('settingDrawer.configurableWhenFixingHeaders') }}</template>
                    <div
                      :style="{ opacity: !fixedHeader ? '0.5' : '1' }"
                    >{{ $t('settingDrawer.hideHeaders') }}</div>
                  </a-tooltip>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-switch
                  slot="actions"
                  size="small"
                  :disabled="(layoutMode === 'topmenu')"
                  :defaultChecked="fixSiderbar"
                  @change="handleFixSiderbar"
                />
                <a-list-item-meta>
                  <div
                    slot="title"
                    :style="{ textDecoration: layoutMode === 'topmenu' ? 'line-through' : 'unset' }"
                  >{{ $t('settingDrawer.fixedSideMenu') }}</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </div>
        </div>
        <a-divider />

        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">{{ $t('settingDrawer.otherSettings') }}</h3>
          <div>
            <a-list :split="false">
              <a-list-item>
                <a-switch
                  slot="actions"
                  size="small"
                  :defaultChecked="colorWeak"
                  @change="onColorWeak"
                />
                <a-list-item-meta>
                  <div slot="title">{{ $t('settingDrawer.colorBlindness') }}</div>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-switch
                  slot="actions"
                  size="small"
                  :defaultChecked="grayMode"
                  @change="onGrayMode"
                />
                <a-list-item-meta>
                  <div slot="title">{{ $t('settingDrawer.grayMode') }}</div>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-switch
                  slot="actions"
                  size="small"
                  :defaultChecked="multiTab"
                  @change="onMultiTab"
                />
                <a-list-item-meta>
                  <div slot="title">{{ $t('settingDrawer.multiTab') }}</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </div>
        </div>
        <!-- 试验功能 -->
        <a-divider v-if="!production" />
        <div :style="{ marginBottom: '24px' }" v-if="!production">
          <h3 class="setting-drawer-index-title">{{ $t('settingDrawer.testFun') }}</h3>
          <div>
            <a-list :split="false">
              <a-list-item>
                <a-switch
                  slot="actions"
                  size="small"
                  :defaultChecked="darkMode"
                  @change="onDarkMode"
                />
                <a-list-item-meta>
                  <div slot="title">{{ $t('settingDrawer.darkMode') }}</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </div>
        </div>
        <a-divider v-if="!production" />
        <div :style="{ marginBottom: '24px' }" v-if="!production">
          <a-button @click="doCopy" icon="copy" block>{{ $t('settingDrawer.copySettings') }}</a-button>
          <a-alert type="warning" :style="{ marginTop: '24px' }">
            <span slot="message">
              {{ $t('settingDrawer.words') }}
              <a
                href="https://github.com/sendya/ant-design-pro-vue/blob/master/src/config/defaultSettings.js"
                target="_blank"
              >src/config/defaultSettings.js</a>
            </span>
          </a-alert>
        </div>
      </div>
      <div
        class="setting-drawer-index-handle"
        slot="handle"
        v-if="visible"
        @click="hideSystemSetting"
      >
        <a-icon type="close" />
      </div>
    </a-drawer>
  </div>
</template>

<script>
import { DetailList } from '@/proComponents'
import SettingItem from './SettingItem'
import config from '@/config/defaultSettings'
import { updateTheme, updateColorWeak, colorList, updateGrayMode, setDarkMode } from './settingConfig'
import { mixin, mixinDevice } from '@/utils/mixin'
import { mapMutations, mapState } from 'vuex'
import { DARK_MODE } from '@/store/mutation-types'

export default {
  components: {
    DetailList,
    SettingItem
  },
  mixins: [mixin, mixinDevice],
  data () {
    return {
      // visible: false,
      colorList,
      production: config.production,
      darkMode: this.$ls.get(DARK_MODE, false)
    }
  },
  watch: {},
  computed: {
    ...mapState({
      visible: state => state.app.showSettings
    })
  },
  created () {
    setDarkMode(this.$ls.get(DARK_MODE))
  },
  mounted () {
    updateTheme(this.primaryColor)
    if (this.colorWeak !== config.colorWeak) {
      updateColorWeak(this.colorWeak)
    }
    if (this.grayMode !== config.grayMode) {
      updateGrayMode(this.grayMode)
    }
  },
  methods: {
    ...mapMutations(['SET_SETTING_DRAWER']),
    onClose () {
      this.SET_SETTING_DRAWER(false)
    },
    hideSystemSetting () {
      this.SET_SETTING_DRAWER(false)
    },
    onColorWeak (checked) {
      this.$store.dispatch('ToggleWeak', checked)
      updateColorWeak(checked)
    },
    onGrayMode (checked) {
      this.$store.dispatch('ToggleGray', checked)
      updateGrayMode(checked)
    },
    onMultiTab (checked) {
      this.$store.dispatch('ToggleMultiTab', checked)
    },
    handleMenuTheme (theme) {
      this.$store.dispatch('ToggleTheme', theme)
    },
    doCopy () {
      // get current settings from mixin or this.$store.state.app, pay attention to the property name
      const text = `export default {
  primaryColor: '${this.primaryColor}', // primary color of ant design
  navTheme: '${this.navTheme}', // theme for nav menu
  layout: '${this.layoutMode}', // nav menu position: sidemenu or topmenu
  contentWidth: '${this.contentWidth}', // layout of content: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: ${this.fixedHeader}, // sticky header
  fixSiderbar: ${this.fixSiderbar}, // sticky siderbar
  autoHideHeader: ${this.autoHideHeader}, //  auto hide header
  colorWeak: ${this.colorWeak},
  grayMode: ${this.grayMode},
  multiTab: ${this.multiTab},
  production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true',
  // vue-ls options
  storageOptions: {
    namespace: 'pro__',
    name: 'ls',
    storage: 'local',
  }
}`
      this.$copyText(text)
        .then(message => {
          console.log('copy', message)
          this.$message.success('复制完毕')
        })
        .catch(err => {
          console.log('copy.err', err)
          this.$message.error('复制失败')
        })
    },
    handleLayout (mode) {
      this.$store.dispatch('ToggleLayoutMode', mode)
      // 因为顶部菜单不能固定左侧菜单栏，所以强制关闭
      this.handleFixSiderbar(false)
    },
    handleContentWidthChange (type) {
      this.$store.dispatch('ToggleContentWidth', type)
    },
    changeColor (color) {
      if (this.primaryColor !== color) {
        this.$store.dispatch('ToggleColor', color)
        updateTheme(color)
      }
    },
    handleFixedHeader (fixed) {
      this.$store.dispatch('ToggleFixedHeader', fixed)
    },
    handleFixedHeaderHidden (autoHidden) {
      this.$store.dispatch('ToggleFixedHeaderHidden', autoHidden)
    },
    handleFixSiderbar (fixed) {
      if (this.layoutMode === 'topmenu') {
        this.$store.dispatch('ToggleFixSiderbar', false)
        return
      }
      this.$store.dispatch('ToggleFixSiderbar', fixed)
    },
    // TODO:bug:目前设置完黑夜模式后再设置主题不管用了
    onDarkMode (checked) {
      this.$ls.set(DARK_MODE, checked)
      setDarkMode(checked)
    }
  }
}
</script>

<style lang="less" scoped>
.setting-drawer-index-content {
  .setting-drawer-index-blockChecbox {
    display: flex;

    .setting-drawer-index-item {
      margin-right: 16px;
      position: relative;
      border-radius: 4px;
      cursor: pointer;

      img {
        width: 48px;
      }

      .setting-drawer-index-selectIcon {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        padding-top: 15px;
        padding-left: 24px;
        height: 100%;
        color: #1890ff;
        font-size: 14px;
        font-weight: 700;
      }
    }
  }
  .setting-drawer-theme-color-colorBlock {
    width: 20px;
    height: 20px;
    border-radius: 2px;
    float: left;
    cursor: pointer;
    margin-right: 8px;
    padding-left: 0px;
    padding-right: 0px;
    text-align: center;
    color: #fff;
    font-weight: 700;

    i {
      font-size: 14px;
    }
  }
}

.setting-drawer-index-handle {
  position: absolute;
  top: 240px;
  background: #1890ff;
  width: 48px;
  height: 48px;
  right: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  pointer-events: auto;
  z-index: 1001;
  text-align: center;
  font-size: 16px;
  border-radius: 4px 0 0 4px;

  i {
    color: rgb(255, 255, 255);
    font-size: 20px;
  }
}
</style>
