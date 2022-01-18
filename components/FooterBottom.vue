<template>
  <div>
    <div id="footer-bottom" class="d-flex justify-content-around w-100 mt-5"
         style="border-top: 1px solid rgba(0, 0, 0, 0.125);">

      <div class="footer-block">
        <div class="footer-col-left py-3">
          <div><a href="#">О компании</a></div>
          <div><a href="#">Новости</a></div>
          <div><a href="#">Отзывы</a></div>
          <div><a href="#">Реквизиты</a></div>
          <div><a href="#">Контакты</a></div>
        </div>
      </div>

      <div class="footer-block">
        <div class="footer-col-center py-3">
          <div><a href="#">О компании</a></div>
          <div><a href="#">Новости</a></div>
          <div><a href="#">Отзывы</a></div>
          <div><a href="#">Реквизиты</a></div>
          <div><a href="#">Контакты</a></div>
        </div>
      </div>

      <div class="footer-block">
        <div class="footer-col-right py-3">
          <div><a href="#">О компании</a></div>
          <div><a href="#">Новости</a></div>
          <div><a href="#">Отзывы</a></div>
          <div><a href="#">Реквизиты</a></div>
          <div><a href="#">Контакты</a></div>
        </div>
      </div>
    </div>
    <div class="footer-meta ">
      <div><hr/>
        <div class="text-left">
          2021 Created By
        </div>
      </div>
      <div><hr/>
        <div class="text-left">
          @ComHelps
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterBottom"
}
</script>

<style lang="scss" scoped>
.footer-col-left, .footer-col-center, .footer-col-right {
  list-style-type: none;

  div {
    padding: .5rem;
    a {
      text-decoration: none;
      color: #6c757d !important;
    }
  }
}
.footer-col-right{
  text-align: right;
}
.footer-col-center{
  text-align: center;
}
.footer-meta {
  div {
    width: 30%;
    .text-left, .text-right{
      text-align: center !important;
      width: 100%;
      padding-bottom: 1rem;
    }
  }

  /*border-top: 1px solid rgba(0, 0, 0, 0.125);*/
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 70px;
}

#footer-bottom {
  height: 300px;


  .footer-block {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 1.5rem 0;
  }

  @media screen and (min-width: 300px) and (max-width: 400px) {
    .footer-block {
      font-size: 14px;
    }
  }

  @media screen and (min-width: 600px) and (max-width: 768px) {
    height: 200px;
  }

  @media screen and (min-width: 400px) and (max-width: 599px) {
    height: 200px;
    .footer-block {
      font-size: 14px;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

</style>

