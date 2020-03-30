<template>
  <div>
    <h2>栅格系统</h2>
    https://www.iviewui.com/components/grid
    <div>
      <h3>example1</h3>
      <Row>
          <Col span="12" class="ivue-border">col-12</Col>
          <Col span="12" class="ivue-border">col-12</Col>
      </Row>
      <h3>example2</h3>
      <Row>
          <Col span="8" class="ivue-border">col-8</Col>
          <Col span="8" class="ivue-border">col-8</Col>
          <Col span="8" class="ivue-border">col-8</Col>
      </Row>
      <h3>example3</h3>
      <Row>
          <Col span="6" class="ivue-border">col-6</Col>
          <Col span="6" class="ivue-border">col-6</Col>
          <Col span="6" class="ivue-border">col-6</Col>
          <Col span="6" class="ivue-border">col-6</Col>
      </Row>
    </div>
    <h2>Layout 布局</h2>
    https://www.iviewui.com/components/layout
    <div>
      <h3>example1</h3>
      <Layout>
          <Sider hide-trigger>Sider</Sider>
          <Layout>
              <Header>Header</Header>
              <Content>Content</Content>
              <Footer>Footer</Footer>
          </Layout>
      </Layout>
      <h3>example2</h3>
      <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            Item 1
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            Item 4
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content :style="{padding: '0 50px'}">
                <Breadcrumb :style="{margin: '20px 0'}">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Components</BreadcrumbItem>
                    <BreadcrumbItem>Layout</BreadcrumbItem>
                </Breadcrumb>
                <Card>
                    <div style="min-height: 200px;">
                        Content
                    </div>
                </Card>
            </Content>
            <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
        </Layout>
      </div>
    </div>
    <h2>列表</h2>
    <div>
      <List item-layout="vertical">
          <ListItem v-for="item in data" :key="item.title">
              <ListItemMeta :avatar="item.avatar" :title="item.title" :description="item.description" />
              {{ item.content }}
              <template slot="action">
                  <li>
                      <Icon type="ios-star-outline" /> 123
                  </li>
                  <li>
                      <Icon type="ios-thumbs-up-outline" /> 234
                  </li>
                  <li>
                      <Icon type="ios-chatbubbles-outline" /> 345
                  </li>
              </template>
              <template slot="extra">
                  <img src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large" style="width: 280px">
              </template>
          </ListItem>
      </List>
    </div>
  
    <h2>Card</h2>
    <div>
      <Card style="width:350px">
          <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              Classic film
          </p>
          <a href="#" slot="extra" @click.prevent="changeLimit">
              <Icon type="ios-loop-strong"></Icon>
              Change
          </a>
          <ul>
              <li v-for="item,index in randomMovieList" v-bind:key="index">
                  <a :href="item.url" target="_blank">{{ item.name }}</a>
                  <span>
                      <Icon type="ios-star" v-for="n in 4" :key="n"></Icon><Icon type="ios-star" v-if="item.rate >= 9.5"></Icon><Icon type="ios-star-half" v-else></Icon>
                      {{ item.rate }}
                  </span>
              </li>
          </ul>
      </Card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'First',
  data () {
      return {
          data: [
              {
                  title: 'This is title 1',
                  description: 'This is description, this is description, this is description.',
                  avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                  content: 'This is the content, this is the content, this is the content, this is the content.'
              },
              {
                  title: 'This is title 2',
                  description: 'This is description, this is description, this is description.',
                  avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                  content: 'This is the content, this is the content, this is the content, this is the content.'
              },
              {
                  title: 'This is title 3',
                  description: 'This is description, this is description, this is description.',
                  avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                  content: 'This is the content, this is the content, this is the content, this is the content.'
              }
          ]
      }
  }
}
</script>
<style>
  .ivue-border{
    border:1px solid black;
    background: pink;
  }

</style>
