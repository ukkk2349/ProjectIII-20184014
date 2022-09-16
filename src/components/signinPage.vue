<template>
<div class="box">
    <div class="user">
        Username : <input type="text" name="username" id="username">
    </div>
    <br>
    <div class="pass">
        Password  :  <input type="text" name="password" id="password">
    </div>
   <br>

    <button>Login</button>  
    <br>
    <a href="">You don't have accout, register here</a>
</div>
 

 
</template>

<script>
export default {
  name: 'login',

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box { 
   
  margin: auto;
  width: 50%;

  padding: 10px;
  position: relative;
  top : 200px;
  text-align:  center;
    
}

.user { 
    color: red;
    
}

.pass { 
    color: coral;
}

input[type=text],
input[type=email] {
  background: #F0F0F0;
  font-size: 15px;

 
}
</style>

