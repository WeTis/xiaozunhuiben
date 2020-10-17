Component({
  properties: {
    // hezuohuobanxianxing | bangzhuzhongxin | kefu1 | zhaomu | bianzu16 | ziyuan | wodexinxi | gouwucheman | shangpingouwudai2 | icon | 2 | 4 | shangpin | money | dianzan | anquanzhuye | jihuo | shu | icon-test | kefu | dianhua | daijiesuan | jia | tishi1 | tishi2 | star-full | Group- | sousuo1 | xuanze | selection | cancel | close | tishi | xianshi_xuanze | gengduojiantou | shujia-xuanzhong | quanbudingdan | daifukuan | daifahuo | cangkujiesuan | daipingjia | daiguihuan | daohuotixing | daishouhuo | mianfeiqujian | hehuotuiguang | dingdanwancheng | peiban-weixuanzhong | peiban-xuanzhong | shouhuodizhi | shouhuotiyan | shouyegengduojiantou | shouyebei-weixuanzhong | shouye-xuanzhong | wode-weixuanzhong | wode-xuanzhong | tuikuan | wodeqianbao | sousuo | shujia-weixuanzhong | yuyueguihuan | xuanzeshangpin | xinyuanshudan | zhifuzuyajin | yuyuekuaidi | wode-xuanzhong-copy
    name: {
      type: String,
    },
    // string | string[]
    color: {
      type: null,
      observer: function(color) {
        this.setData({
          colors: this.fixColor(),
          isStr: typeof color === 'string',
        });
      }
    },
    size: {
      type: Number,
      value: 18,
      observer: function(size) {
        this.setData({
          svgSize: size,
        });
      },
    },
  },
  data: {
    colors: '',
    svgSize: 18,
    quot: '"',
    isStr: true,
  },
  methods: {
    fixColor: function() {
      var color = this.data.color;
      var hex2rgb = this.hex2rgb;

      if (typeof color === 'string') {
        return color.indexOf('#') === 0 ? hex2rgb(color) : color;
      }

      return color.map(function (item) {
        return item.indexOf('#') === 0 ? hex2rgb(item) : item;
      });
    },
    hex2rgb: function(hex) {
      var rgb = [];

      hex = hex.substr(1);

      if (hex.length === 3) {
        hex = hex.replace(/(.)/g, '$1$1');
      }

      hex.replace(/../g, function(color) {
        rgb.push(parseInt(color, 0x10));
        return color;
      });

      return 'rgb(' + rgb.join(',') + ')';
    }
  }
});
