<template>
  <div id="view-employee">
     <ul class="collection with-header">
       <li class="collection-header">
         <h4>{{name}}</h4>
       </li>
       <li class="collection-item">Employee ID#:{{employee_id}}</li>
       <li class="collection-item">Department :{{dept}}</li>
       <li class="collection-item">Position :{{position}}</li>
     </ul>
    <router-link class="btn gery" to="/" >Back</router-link>
    <button @click="deleteEmployee" to="/" class="btn red">Delete</button>

    <div class="fixed-action-btn">
      <router-link v-bind:to="{name:'edit-employee',params:{employee_id:employee_id}}" class="btn-floating btn-large red">
        <div class="fa fa-pencil"></div>
      </router-link>
    </div>

  </div>
</template>
<script>
import db from './Firebaseinit'
export default {
  name:"view-employee",
  data(){
    return {
        employee_id:null,
        name:null,
        dept:null,
        position:null
    }
  },
  beforeRouteEnter(to,from,next){
      db.collection("Employees").where("employee_id",'==',to.params.employee_id)
      .get().then(querySnapshot=>{
        querySnapshot.forEach(doc=>{
          next(vm=>{
            vm.employee_id=doc.data().employee_id
            vm.name=doc.data().name
            vm.dept=doc.data().dept
            vm.position=doc.data().position

          })
        })
      });
  },
  watch:{
    '$route':'fetchData'
  },
  methods:{
    fetchData(){
      db.collection("Employees").where("employee_id","==",this.$route.params.employee_id)
      .get().then(querySnapshot=>{
        querySnapshot.forEach(doc=>{
            this.employee_id=doc.data().employee_id
            this.name=doc.data().name
            this.dept=doc.data().dept
            this.position=doc.data().position
        })
      })
    },
    deleteEmployee(){
      if(confirm("Are You Sure")){
        db.collection("Employees").where("employee_id","==",this.$route.params.employee_id)
        .get().then(querySnapshot=>{
          querySnapshot.forEach(doc=>{
              doc.ref.delete()
              this.$router.push("/")
          })
        })
      }
    }
  }
}
</script>
