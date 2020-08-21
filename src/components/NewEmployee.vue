<template>
  <div id="new-employee">
      <h3>New Employee </h3>
      <div class="row">
        <form @submit.prevent="saveEmployee" class="col s12">
          <div class="row">
            <div class="input-field col s12">
               <input type="text" required v-model="employee_id" >
                <label>Employee ID#</label>
            </div>
          </div>
          <div class="row">
          <div class="input-field col s12">
              <input type="text" required v-model="name" >
              <label>Employee Name</label>
          </div>
        </div>
          <div class="row">
          <div class="input-field col s12">
              <input type="text" required v-model="dept" >
              <label>Department</label>
          </div>
        </div>
          <div class="row">
          <div class="input-field col s12">
              <input type="text" required v-model="position" >
              <label>Position</label>
          </div>
        </div>
         <router-link class="btn gery" to="/" >Cancel</router-link>
          <button type="submit" class="btn green">Create New Employee </button>
        </form>
      </div>
  </div>
</template>
<script>
import db from "./Firebaseinit"
export default {
  name:"new-employee",
  data(){
    return {
        employee_id:null,
        name:null,
        dept:null,
        position:null
    }
  },
  methods :{
    saveEmployee(){
        db.collection("Employees").add({
          employee_id:this.employee_id,
          name:this.name,
          dept:this.dept,
          position:this.position
        })
        .then(docRef=>{
          this.$router.push("/")
        })
        .catch(error=>console.log(err))
    }
  }
}
</script>
