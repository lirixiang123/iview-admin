<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <Alert type="error" v-show="login_error">邮箱或密码错误</Alert>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  data: function () {
    return {
      'login_error': false
    }
  },
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        console.log('success!')
        this.login_error = false
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          })
        })
      }).catch(reason => {
        // 当执行失败时的处理
        console.log('fail')
        this.login_error = true
      })
    }
  }
}
</script>

<style>

</style>
