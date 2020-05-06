<template>
    <div class="group-notes">
        <Header/>
        <main class="container notes-main">
            <div class="row">
                <i class="material-icons left" @click="$router.push({ name: 'todo'})">arrow_back</i>
                <h5>{{groupName}} - Notes</h5>
                <div class="input-field col s12">
                    <textarea id="notes" class="materialize-textarea"></textarea>
                    <label for="notes">Notes</label>
                </div>
                <div class="notes-actions">
                    <a class="waves-effect waves-light btn-small"><i class="material-icons left">done</i>save</a>
                    <a class="waves-effect waves-light btn-small"><i class="material-icons left">close</i>cancel</a>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
import Header from './Header'
export default {
    name: 'notes',
    data (){
        return{
            groupName : this.$route.params.groupName,
        }
    },
    created(){
        console.log("component created");
    },
    mounted(){
        console.log("data mounted");
    },
    updated(){
        console.log("data updated");
    },
    destroyed(){
        console.log("component destroyed");
    },
    components:{
        Header
    }
}
</script>
<style>
i.material-icons{
    cursor: pointer;
}
.notes-main{
    padding: 1rem;
}
.notes-actions{
    float: right;
}
</style>