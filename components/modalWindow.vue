<template>
  <div>
    <div id="modal_wrapper" ref="wrapper">
      <div class="popup">
        <div class="popup__header mt-3">
          <h5>{{ modalTitle }}</h5>
<!--          <span class="material-icons" @click="closePopup">close</span>-->
          <img src="~assets/images/close2.svg" style="width: 56px; cursor: pointer;" @click="closePopup">
        </div>
        <div class="popup__body">
          <slot></slot>
        </div>
        <div class="popup__footer mb-3">
          <button class="btn btn-outline-primary ml-auto" @click="addCartFromModal">{{ btnTitle }}</button>
<!--          <button class="btn btn-outline-danger" @click="closePopup">Close</button>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modalWindow",
  props: {
    modalTitle:{
      type: String,
    },
    btnTitle: {
      type: String,
    }
  },
  mounted() {
    this.$refs
    document.addEventListener('click', (e) => {
      e.target == this.$refs['wrapper'] ? this.closePopup() : null
    })
  },
  methods:{
    closePopup(){
      this.$emit('closePopupWindow')
    },
    addCartFromModal(){
      this.$emit('addFromModal')
    }
  }
}
</script>

<style lang="scss">
  #modal_wrapper{
    animation: bgchange 1s;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 15;
    background: rgba(0, 0, 0, .5);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    /*margin: -150% -100%;*/
    overflow: hidden;
  }
  .popup{
    animation: bgchange 1s;
    z-index: 13;
    padding: 16px;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: normal;
    justify-content: space-between;
    width: 60%;
    height: fit-content;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #ffffff;
    box-shadow: 0 0 17px 0 #e7e7e7;
    &__header, &__footer{
      display: flex;
      justify-content: space-between;
      align-items: center;
      span{
        cursor: pointer;
      }
      h5{
        font-weight: 300;
      }
      img{
        margin-right: 0!important;
      }
      button{
        padding: 3px 5px;
      }
    }
    &__body{
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      align-items: center;

    }
    @media screen and (max-width: 420px){
      &__body{
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  @media screen and (min-width: 1024px) {
    @media (orientation: landscape) {
      .popup {
        width: 65%;
      }
    }

    @media (orientation: portrait) {
      .popup {
        width: 95%;
      }
    }
  }

  @media screen and(max-width: 768px) {

    .popup{
      &__header h5{
        font-size: 1rem;
      }
      &__footer{
        button{
          padding: 1px 4px!important;
        }
      }
    }
    @media (orientation: landscape) {
      .popup {
        width: 50%;
      }
    }

    @media (orientation: portrait) {
      .popup {
        width: 85%;
      }
    }
  }

  @keyframes bgchange {
    100% {opacity: 1}
    0% { opacity: 0 }
  }
</style>
