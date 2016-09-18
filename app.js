// module
var data = {
  cats: [
  {
    name: 'poplinre',
    src: 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426',
    count: 0
  },
  {
    name: 'chewie',
    src: 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496',
    count: 0
  },
  {
    name: 'yellow and gray',
    src: 'https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454',
    count: 0
  },
  {
    name: 'whitle',
    src: 'https://c7.staticflickr.com/6/5213/5508784414_d2d84f9c92_b.jpg',
    count: 0
  },
  {
    name: 'black',
    src: 'https://c5.staticflickr.com/6/5141/5616147572_197d15f94d_b.jpg',
    count: 0
  }
  ],
  currentCat: 0
};

// Octopus
var octopus = {
  getCatNameList: function() {
                    return data.cats;
                  },
  getCatByName: function(catName) { 
                   var catNameList = this.getCatNameList();
                   for ( var i = 0; i < catNameList.length; i++) {
                     if ( catNameList[i].name === catName ) {
                       return i;
                     }
                   }
                 },
  getShowCat: function() {
                return data.cats[data.currentCat];
              },
  setCatId: function(catId) {
              data.currentCat = catId;
            },
  showCatByName: function(catName) {
                   this.setCatId( this.getCatByName(catName) ) ;
                   catShow.render();
                 },
  click: function() {
           data.cats[data.currentCat].count++;
           catShow.render();
         },
  init: function() {
          catNameList.init();
          catShow.init();
        }
};


// Cat Name List View
var catNameList = {
  init: function(){
          this.$catNameList = $('#cat-name-list');
          this.catNameTemplate = $('script[data-template="cat-name"]').html();
          this.$catNameList.on('click', '.cat-name', function(e){
            octopus.showCatByName(this.innerText);
          });
          this.render();
        },
  render: function(){
            var $catNameList = this.$catNameList;
            var catNameTemplate = this.catNameTemplate;

            $catNameList.html('');
            octopus.getCatNameList().forEach(function(cat){
              var thisTemplate = catNameTemplate.replace(/{{catName}}/g, cat.name);
              $catNameList.append(thisTemplate);
            });
          }
};

// Cat Show View
var catShow = {
  init: function() {
          octopus.setCatId(0); 
          $('#cat-show-img').on('click', function(e){
            octopus.click()
          });
          this.$catShowImg = $('#cat-show-img');
          this.$catShowName = $('#cat-show-name');
          this.$catShowClickNum = $('#cat-show-click-num');
          this.render();
        },
  render: function() {
            var cat = octopus.getShowCat();
            var $catShowImg = this.$catShowImg;
            var $catShowName = this.$catShowName;
            var $catShowClickNum = this.$catShowClickNum;

            $catShowImg.bind('load', function(){
              $catShowName.html(cat.name);
              $catShowClickNum.html('Clicked: ' + cat.count);
            });
            $catShowImg.attr('src', cat.src);
          }
};

octopus.init();
