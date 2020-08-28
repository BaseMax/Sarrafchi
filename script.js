const DEFAULT_TITLE="اخبار اقتصادی ایران و جهان | قیمت ارز | سکه و طلا | صرافچی";
// var shared={};
// const DEBUG=true;
const DEBUG=false;
// const SERVICE="/";
const SERVICE="https://api.sarrafchi.ir";
const services = {
  main: function() {
    return SERVICE+'/rate/';
  },
  blog: function(page) {
    return SERVICE+'/blog/?page='+page;
  },
  post: function(slug) {
    return SERVICE+'/blog/'+slug+'/';
  },
};

var currencyPrices=[];
const translates = {
  "نام": "Currency",
  "خرید": "Buy",
  "فروش": "Sell",
  "صرافچی": "Sarrafchi",
  "اخبار اقتصادی قیمت ارز, سکه و طلا": "Economic news Currency, coin and gold prices",
  "نرخ ارز ها و طلا در بازار آزاد ایران. کلیه قیمت ها به تومان است (1 تومان = 10 ریال)": "Exchange rates and gold in the Iranian open market. All prices are in Tomans (1 Tomans = 10 Rials)",
  "قیمت لحظه ای ارز ایران و جهان": "The current price of currencies in Iran Free Market",
};
const currencyTranslates = {
  "US Dollar": "دلار آمریکا",
  "Euro": "یورو",
  "British Pound": "پوند انگلیس",
  "Swiss Franc": "فرانک سوئیس",
  "Canadian Dollar": "دلار کانادا",
  "Australian Dollar": "دلار استرالیا",
  "Swedish Krona": "کرون سوئد",
  "Norwegian Krone": "کرون نروژ",
  "Russian Ruble": "روبل روسیه",
  "Thai Baht": "بات تایلند",
  "Singapore Dollar": "دلار سنگاپور",
  "Hong Kong Dollar": "دلار هنگ کنگ",
  "Azerbaijani Manat": "مانات آذربایجان",
  "Danish Krone": "کرون دانمارک",
  "UAE Dirham": "درهم امارات",
  "Turkish Lira": "لیر ترکیه",
  "Chinese Yuan": "یوان چین",
  "KSA Riyal": "ریال سعودی",
  "Indian Rupee": "روپیه هند",
  "Ringgit": "رینگیت",
  "Afghan Afghani": "افغانی افغانستان",
  "Kuwaiti Dinar": "دینار کویت",
  "Bahraini Dinar": "دینار بحرین",
  "Omani Rial": "ریال عمانی",
  "Qatari Riyal": "ریال قطر",
  "Azadi": "سکه بهار آزادی",
  "Emami": "سکه امامی",
  "½ Azadi": "نیم سکه",
  "¼ Azadi": "ربع سکه",
  "Gerami": "سکه گرمی",
};

const FooterBarComponent = { template: '#footerbar' }

const HomePage = {
  template: '#home-page',
  components: {
    footerbar: FooterBarComponent,
  },
  data: function() {
    return {
      lang: this.$route.params.lang ? this.$route.params.lang : 'fa',
      currencies: [],
    };
  },
  methods: {
    formatPrice(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    translate(name) {
      console.log("Current lang is: "+ this.lang);
      console.log(currencyTranslates);
      console.log(translates);
      if(currencyTranslates[name] && this.lang == "fa") {
        return currencyTranslates[name];
      }
      if(currencyTranslates[name] && this.lang == "en") {
        return name;
      }
      if(this.lang == "en") {
        return translates[name] ? translates[name] : name;
      }
      return name;
    },
  },
  mounted: function() {
    if(this.lang != "fa" && this.lang != "en") {
      this.$router.push('/');
      return;
    }
    document.querySelector("body").classList.add(this.lang);
    // console.log(this.$route.params);
    // console.log(currencyPrices);
    // console.log(currencyPrices.length);
    if(currencyPrices.length == 0) {
      // console.log("Downloading...");
      axios.get(services.main())
      .then(response => {
        // console.log(response.data.currencies);
        currencyPrices=response.data.currencies;
        // console.log(currencyPrices);
        this.currencies=currencyPrices;
      })
    }
    else {
      // console.log("Getting...");
      this.currencies=currencyPrices;
    }
  },
}

const NewsPage = {
  template: '#news-page',
  components: {
    footerbar: FooterBarComponent,
  },
  data: function() {
    return {
      page: 1,
      posts: [],
    };
  },
  mounted: function() {
    console.log(this.$route.query);
    this.page=this.$route.query["page"] ? parseInt(this.$route.query["page"]) : 1;
    document.querySelector("body").classList.add("fa");
    axios.get(services.blog(this.page))
    .then(response => {
      if(response.data.status == "success") {
        this.posts=response.data.posts;
      }
      else {
        this.$router.push('/');
      }
    })
  },
}

const SinglePage = {
  template: '#single-page',
  components: {
    footerbar: FooterBarComponent,
  },
  data: function() {
    return {
      post: [],
      title: undefined,
      // metaInfo: {
      //   title: '',
      // },
    };
  },
  // metaInfo() {
  //   return {
  //     title: this.title,
  //   };
  // },
  mounted: function() {
    document.querySelector("body").classList.add("fa");
    // console.log(this.$route.params);
    axios.get(services.post(this.$route.params.slug))
    .then(response => {
      if(response.data.status == "success") {
        this.post=response.data.post;
        this.title=this.post.title;
        document.title=this.title;
      }
      else {
        this.$router.push('/');
      }
      // this.metaInfo.title=this.title;
      // console.log(this.post);
    })
  },
}

const NotFoundComponent = {
  template: '#error-page',
  components: {
    footerbar: FooterBarComponent,
  },
  data: function() {
    return {
    };
  },
  mounted: function() {
    document.querySelector("body").classList.add("fa");
    this.$router.push('/');
  },
}
const routes = [
  { path: '/news', component: NewsPage, meta: {
      title: 'اخبار اقتصادی قیمت ارز, سکه و طلا',
    }
  },
  { path: '/:lang?', component: HomePage, meta: {
      title: 'قیمت لحظه ای ارز, سکه و طلا',
    }
  },
  { path: '/news/:slug', component: SinglePage },
  { path: '/tag/:slug', component: SinglePage },
  { path: '*', component: NotFoundComponent, meta: {
        title: 'خطا: یافت نشد!',
    }
  }
]
const router = new VueRouter({
  mode: 'history',
  routes: routes,
})

router.afterEach((to, from) => {
    Vue.nextTick(() => {
        document.title = to.title || to.meta.title || DEFAULT_TITLE;
    });
});

const app = new Vue({
  el: '#app',
  router: router,
  components: {
    footerbar: FooterBarComponent,
  },
  data: {
  },
  mounted: function() {
    // console.log(this.$router.currentRoute);
  },
});
