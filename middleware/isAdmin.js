export default function ({ store, redirect }){

  if (store.getters["admin"] != '1') {
    return redirect("/login")
  }
}
