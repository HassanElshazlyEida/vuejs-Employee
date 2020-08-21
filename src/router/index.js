import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import NewEmployee from '@/components/NewEmployee';
import ViewEmployee from '@/components/ViewEmployee';
import EditEmployee from '@/components/EditEmployee';
import Login from '@/components/Login';
import Register from '@/components/Register';
import firebase from "firebase";
Vue.use(Router);


// Meta like constructor locally after moving to specific route
let  router= new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        requiresGuest:true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta:{
        requiresGuest:true
      }
    },
    {
      path: '/new',
      name: 'new-employee',
      component: NewEmployee,
      meta:{
        requiresAuth:true
      }
    },

    {
      path: '/edit/:employee_id',
      name: 'edit-employee',
      component: EditEmployee,
      meta:{
        requiresAuth:true
      }
    },

    {
      path: '/:employee_id',
      name: 'view-employee',
      component: ViewEmployee,
      meta:{
        requiresAuth:true
      }
    },


  ]
});
//Middleware before moving to route
router.beforeEach((to,from,next)=>{
  //check for requiredAuth guard
    if (to.matched.some(record=>record.meta.requiresAuth)){
      //check if not logged in
      if (!firebase.auth().currentUser){
        next({
          path:"/login",
          query:{
            redirect:to.fullPath
          }
        });
      }else {
        next();//next router
      }
    }else if (to.matched.some(record=>record.meta.requiresGuest)){
        if (firebase.auth().currentUser){
          next({
            path:"/",
            query:{
              redirect:to.fullPath
            }
          });
        }else {
          next();//next router
        }
    }
});

export default router;
