/*
*
* Configuration for Vue App
*
*/

// activate vue devtools (Google Chrome)
Vue.config.devtools = true
// use router system for route
Vue.use(VueRouter)
// use resource for rest API
Vue.use(VueResource)

// Base URL

var BASE_URL = "http://resepku.eezhal92.com"


/*
*
* Components Vue
*
*/

var HomePage = Vue.extend ({
  template : '#homepage-tpl'
})

var Features = Vue.extend ({
  template : '#features-tpl'
})

var Download = Vue.extend ({
  template : '#download-tpl'
})

var ArticleList = Vue.extend ({
  template : '#articles-tpl',
  props : ['judul', 'terbit']
})

var ArticleDetail = Vue.extend ({
  template : '#article-tpl',
  props : ['id'],
  data: function () {
    return {
      articles : null
    }
  },
  ready : function () {
    var id = this.$route.params.id
    this.fetchArticles(id)
  },
  methods : {
    fetchArticles: function (id) {
      this.$http.get(BASE_URL + '/api/v1/recipes', {
        params: {
          id:id
        }
      }).then(function (res) {
        this.articles = res.data.data
      })
    }
  }
})

var Blog = Vue.extend ({
  template : '#blog-tpl',
  data : function () {
    return {
      articles : null
    }
  },
  ready : function () {
    this.fetchArticles()
  },
  methods : {
    fetchArticles : function () {
      this.$http.get(BASE_URL + '/api/v1/recipes').then(function (res) {
        this.articles = res.data.data

        console.log(res.data.data)
      });
    }
  },
  components : {
    articlelist : ArticleList
  }
})

// parent component
var App = Vue.extend({
  data: function () {
    return {
      orang: "junior"
    }
  }
})

/*
*
* Router Vue
*
*/

// declarate vue route
var router = new VueRouter()
// config router
router.map({
  '/': {
    component: HomePage
  },
  '/features': {
    component: Features
  },
  '/download': {
    component: Download
  },
  '/blog': {
    component: Blog
  },
  '/article/:id': {
    component: ArticleDetail
  }
})
// start app from this
router.start(App, '#app')
