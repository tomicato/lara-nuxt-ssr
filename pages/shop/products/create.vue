<template>
  <div class="mt-5 container" id="main">

    <div class="row create-block">

      <div class="col-3 text-center">
        <h5>Sidebar</h5>
        <hr/>
        <br/>
        <AdminLeftSideBar/>
        <hr/>
        <br/>
        <b-button to="/shop/products" variant="outline-success">Products List</b-button>
      </div>

      <div class="col-9 text-center mb-4">
        <h5>Create Product</h5>
        <hr/>
        <br/>
        <form class="text-left" enctype="multipart/form-data">
          <div class="form-group">
            <label>Product name*</label>
            <input type="text" v-model="form.name" class="form-control" placeholder="Input topic title"/>
            <small class="form-text text-danger" v-if="errors.name">{{ errors.name[0] }}</small>
          </div>
          <div class="form-group">
            <label>Description*</label>
            <textarea rows="5" v-model="form.description" class="form-control"></textarea>
            <small class="form-text text-danger" v-if="errors.description">{{ errors.description[0] }}</small>
          </div>
          <br/>
          <div class="row">
            <div class="form-group col-md-6">
              <label>Image*</label><br/>
              <input @change="handleSelectedFiles" name="photo" type="file" ref="fileUpload">
              <small class="form-text text-danger" v-if="errors.photo">{{ errors.photo[0] }}</small>
            </div>

            <div class="form-group col-md-6">
              <label>Rating</label>
              <input type="text" @change="notNull" placeholder="Введите дробное число - 1.0 - 5.0" v-model="form.rating"
                     class="form-control"/>
              <small class="form-text text-danger" v-if="errors.rating">{{ errors.rating[0] }}</small>
            </div>
          </div>
          <br/>

          <div class="row">

            <div class="form-group col-md-6">
              <label>Category ID*</label>
              <select class="form-control" v-model="form.category_id" @change="selectCategory(form.category_id)" >
                <option :value="item.id" :selected="form.category_id === item.id" v-for="(item, i) in categories"
                        :key="i" > {{ item.title }}
                </option>
              </select>
              <small class="form-text text-danger" v-if="errors.category_id">{{ errors.category_id[0] }}</small>
            </div>

            <div class="form-group col-md-6">
              <label>Sub_Category ID*</label>
              <select class="form-control" v-model="form.sub_category_id">
                <option :value="item.id" :selected="form.sub_category_id === item.id" v-for="(item, j) in sub[0]"
                        :key="j">
                  {{ item.title }}
                </option>
              </select>
              <small class="form-text text-danger" v-if="errors.sub_category_id">{{ errors.sub_category_id[0] }}</small>
            </div>

          </div>
          <br/>

          <div class="row">
            <div class="form-group col-md-4 d-flex justify-content-between align-items-center"
                 v-for="(item, i) in category_filters" :key="i"
                  v-if="item.title != 'price'">
              <label :for="item.name">{{ item.title + ' - ' + item.name }}</label>
              <input type="checkbox" :name="item.title" :id="item.name" :value="item.title + '-' +item.name" v-model="form.details"/>
            </div>
          </div><br/>

          <div class="row">
            <div class="form-group col-md-6">
              <label>Price*</label>
              <input type="number" min="1" v-model="form.price" class="form-control"/>
              <small class="form-text text-danger" v-if="errors.price">{{ errors.price[0] }}</small>
            </div>
            <div class="form-group col-md-6">
              <label>Old Price</label>
              <del><input type="number" min="1" v-model="form.old_price" class="form-control"/></del>
              <small class="form-text text-danger" v-if="errors.old_price">{{ errors.old_price[0] }}</small>
            </div>
          </div>

          <div class="row">
            <div class="form-group col-md-6">
              <label>In Stock*</label><br>
              <select v-model="form.on_stock" :class="`form-control ${form.on_stock === 0 ? 'red' : 'blue'} ` ">
                <option :value="0" :selected="form.on_stock === 0" class="red">not available</option>
                <option :value="1" :selected="form.on_stock === 1" class="blue">in stock</option>
              </select>

              <small class="form-text text-danger" v-if="errors.on_stock">{{ errors.on_stock[0] }}</small>
            </div>
            <div class="form-group col-md-6">
              <label>CKU*</label>
              <input type="text" placeholder="Добавьте артикул" v-model="form.cku" class="form-control"/>
              <small class="form-text text-danger" v-if="errors.cku">{{ errors.cku[0] }}</small>
            </div>
          </div>
                  <!-- <div class="form-group">
                      <label>Details</label>
                      <input  type="text" v-model="form.details" class="form-control"/>
                      <small class="form-text text-danger" v-if="errors.details">{{ errors.details[0] }}</small>
                    </div><br/>-->

          <button type="submit" @click.prevent="create" class="btn btn-outline-primary">Create Product</button>
        </form>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "create",
  middleware: ["isAdmin"],
  data() {
    return {
      categories: this.categories,
      sub_categories: this.sub_categories,
      sub: [],
      cat_title: '',
      category_filters: [],
      form: {
        name: '',
        description: '',
        photo: '',
        category_id: null,
        sub_category_id: null,
        price: null,
        details: [],
        old_price: null,
        cku: '',
        rating: null,
        on_stock: 0,
      }
    }
  },


  async asyncData(ctx) {
    let categories = ctx.store.getters["categories/categories"]
    let sub_cat = []
    for (let i = 0; i < categories.length; i++) {
      sub_cat.push(categories[i].childs)
    }
    return {
      categories: categories,
      sub_categories: sub_cat
    }
  },

  methods: {
    notNull() {
      if (this.form.rating <= 1.0) {
        return this.form.rating = '1.0'
      } else if (this.form.rating > 5.0) {
        return this.form.rating = '5.0'
      } else {
        return this.form.rating
      }

    },
    handleSelectedFiles() {
      this.form.photo = this.$refs.fileUpload.files[0]
    },
    async create() {

      let array = this.form.details;
      let obj = {}

      for(let i = 0; i < array.length; i++){
        let arr = array[i].split('-');
        obj[arr[0]] = arr[1];
      }
      console.log(obj);

      let formData = new FormData();
      formData.append('name', this.form.name);
      formData.append('description', this.form.description);
      formData.append('category_id', this.form.category_id);
      formData.append('sub_category_id', this.form.sub_category_id);
      formData.append('price', this.form.price);
      formData.append('old_price', this.form.old_price);
      formData.append('on_stock', this.form.on_stock);
      formData.append('cku', this.form.cku);
      formData.append('rating', this.form.rating);
      formData.append('details', JSON.stringify(obj));
      formData.append('photo', this.form.photo);

      try {
        await this.$axios.$post('/api/shop/product/create', formData)
        await this.$router.push('/shop/products');
      } catch (error) {
       //error.response.data.errors;
        console.log(error);
      }
    },

    selectCategory(cat_id) {
      this.cat_title = this.categories.find(item => item.id === cat_id).title.toLowerCase();
      console.log(this.cat_title);

      let cat_filters = this.$store.getters["" + this.cat_title + "Filter/storage"]
      this.category_filters = cat_filters;
      console.log(this.category_filters);
      let sub = [];
      for (let i = 0; i < this.sub_categories.length; i++) {
        sub.push(this.sub_categories[i].filter(item => item.category_id === cat_id));
      }
      this.sub = sub.filter(item => item.length > 0)
    },
  }
}
</script>

<style lang="scss" scoped>
#main {
  max-width: 1280px;
}

.create-block {
  margin-bottom: 3rem;
}

.red, .blue {
  font-style: italic;
}

.red {
  color: crimson;
}

.blue {
  color: #00a6ff;
}
</style>
