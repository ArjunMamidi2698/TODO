<template>
    <div class="group-view container">
        <!--
            Header
                - edit group name
                - add notes
                - add priority
                - delete group
            List of tasks
        -->
        <main class="card">
            <div class="divider" :class="priorityColor"></div>
            <section class="group-header" :class="filterId == 'Deleted' ? 'disabled' : ''">
                <div v-if="showEditGroupField">
                    <input type="text" v-model="newGroupName" />
                    <i title="Save Task" class="material-icons green lighten-3" @click="$emit('changedGroupName',newGroupName);showEditGroupField=false">done</i>
                    <i title="Close" class="material-icons red lighten-3" @click="showEditGroupField=false">close</i>
                </div>
                <h5 v-else>{{newGroupName}}</h5>
                <div class="actions" v-show="!showEditGroupField">
                    <div class="input-field">
                        <select v-model="childPriority" name="priorityDropdown" id="">
                            <option value="4" selected>No Group Priority</option>
                            <option value="1">High</option>
                            <option value="2">Medium</option>
                            <option value="3">Low</option>
                        </select>
                    </div>
                    <i title="Edit Group Name" class="material-icons" @click="showEditGroupField=true">create</i>
                    <i title="Create Task" class="material-icons" @click="showAddTaskView=true;expandTable=true;">add</i>
                    <!-- <router-link :to="'/notes/:'+groupName" ><i title="Add Notes" class="material-icons">note</i></router-link> -->
                    <router-link :to="{ name: 'notes', params: { groupName: groupName }}" ><i title="Add Notes" class="material-icons">note</i></router-link>
                    <i title="Delete Group" class="material-icons" @click="$emit('delete')">delete</i>
                    <i :title="expandTable?'Collapse Group':'Expand Group'" class="material-icons" @click="expandTable = !expandTable">{{expandTable?'keyboard_arrow_up':'keyboard_arrow_down'}}</i>
                </div>
            </section>
            <section v-show="expandTable" class="tasks-table" :class="filterId == 'Deleted' ? 'disabled' : ''">
                <table class="striped">
                    <tbody class="pa-1">
                        <tr v-for="(task) in tasks" :key="task.id" v-show="filterId == 'ToDo' ? !task.done : (filterId == 'Done' ? task.done : true)">
                            <td>
                                <label>
                                    <input type="checkbox" class="filled-in" @change="doneTask(task)" :checked="task.done" />
                                    <span>{{task.task}}</span>
                                </label>
                            </td>
                            <td title="Delete Task">
                                <i class="material-icons red lighten-3" @click="deleteTask(task)">close</i>
                            </td>
                        </tr>
                        <tr v-show="showAddTaskView">
                            <td>
                                <input type="text" v-model="newTask" placeholder="Add Task" />
                            </td>
                            <td>
                                <i title="Save Task" class="material-icons green lighten-3" @click="addNewTask()">done</i>
                                <i title="Close" class="material-icons red lighten-3" @click="showAddTaskView=false">close</i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <div v-show="filterId == 'Deleted'" class="undo-operation">
                <i title="Undo Delete" class="material-icons" @click="$emit('undoDelete')">undo</i>
                <i title="Remove Group" class="material-icons" @click="$emit('removeGroup')">delete</i>
            </div>
        </main>
    </div>
</template>
<script>
export default {
    name: 'group',
    props :{
        groupName: {
            type: String,
            default:"Work" 
        },
        tasks: {
            type: Array,
            default: []
        },
        priority: {
            type: Number,
            default: 4
        },
        priorityColor: {
            type: String,
            default: null
        },
        filterId:{
            type: String,
            default: 'ToDo'
        }
    },
    data () {
        return {
            showEditGroupField: false,
            showAddTaskView: false,
            newTask: null,
            expandTable: false,
        }
    },
    watch:{
        newTask(){
            if(this.newTask){
                this.newTask = this.newTask.trimLeft();
            }
        },
    },
    computed:{
        childPriority:{
            get(){
                return this.priority;
            },
            set(value){
                this.$emit('changedPriority',Number(value));
            }
        },
        newGroupName:{
            get(){
                return this.groupName;
            },
            set(value){
                this.$emit('changedGroupName',value);
            }
        }
    },
    methods:{
        addNewTask(){
            var self= this;
            if(self.newTask){
                var taskParams= {
                    task : self.newTask,
                    done : false,
                    deleted : false
                }
                self.tasks.push(taskParams);
                self.showAddTaskView= false;
                self.newTask = null;
            }
            else{
                alert("can't create empty task")
            }
        },
        deleteTask(task){
            var self = this;
            var taskIndex = self.tasks.findIndex(x => x.task == task.task);
            self.tasks.splice(taskIndex,1);
            self.tasks[taskIndex]['deleted'] = true;
        },
        doneTask(task){
            var self = this;
            var taskIndex = self.tasks.findIndex(x => x.task == task.task);
            self.tasks[taskIndex]['done'] = !self.tasks[taskIndex]['done'];
        }
    }
}
</script>
<style scoped>
.divider{
    height: 4px;
}
/* .group-view > .card {
    max-height: 500px;
} */
.group-header{
    /* border-top: 4px solid green; */
    display: flex;
    padding: 1rem;
}
.group-header > h5{
    margin: 0;
}
.group-header > .actions{
    display: flex;
    position: absolute;
    right: 1rem;
}
.group-header > .actions > .input-field{
    margin-top: -9px;
}
.group-header > .actions > .input-field > select{
    display: block;
}
i.material-icons{
    cursor: pointer;
    margin-left: 5px;
}
.tasks-table > table > tbody > tr > td {
    padding: 1rem;
}
.tasks-table > table > tbody > tr > td > label > span {
    padding-right: 2rem;
}
.tasks-table > table > tbody > tr >td:last-child {
    position: absolute;
    right: 0;
}
.disabled{
    opacity: 0.5;
    pointer-events: none;
}
.undo-operation{
    position: relative;
    top:50%;
    left: 42%;
}
.undo-operation > i {
    font-size: 4rem;
}
</style>