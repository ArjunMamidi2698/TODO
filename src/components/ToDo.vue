<template>
    <div class="todo">
        <!-- Header bar -->
        <Header/>
        <!--END - Header bar -->
        <!-- ToDo main Application -->
        <main class="container">
            <!-- 
                we need following items:
                    - Search bar for finding tasks -> implemented here
                    - Add Button to add a new group -> implemented here
                    - Group which is some collection of tasks with checkbox and delete option->component required
                        - list of tasks with checkbox and delete option
                            - sorting tasks
                            - notes for each task
                            - priority for each task
                        - add task button in every group
                        - priority for each group
                        - notes/description about group
                    - Show filtering options
                        - show Done task's list
                        - show deleted task's list
                        - show all task's list
                        - show unfinished task's list
            -->
            <ItemsBar @filter="filterId = $event;"></ItemsBar>
            
        </main>
        <div :id="filterId" class="col s12" v-for="(groupInfo) in orderedGroups" :key="groupInfo.id">
            <Group
                v-if="filterId == 'Deleted' ? groupInfo.deleted : !groupInfo.deleted"
                :filterId="filterId"
                :groupName="groupInfo.name"
                :tasks="groupInfo.tasks"
                :priority="Number(groupInfo.priority)"
                @delete="groupInfo.deleted = true;"
                @undoDelete="groupInfo.deleted = false"
                @removeGroup="checkForConfirmation(groupInfo.name);"
                @changedPriority="groupInfo.priority = $event;"
                :priorityColor="getPriorityColor(groupInfo.priority)"
                @changedGroupName="groupInfo.name = $event;"
            />
        </div>
        <!-- ToDo main Application -->
        <section class="add-group-btn" :class="filterId == 'Deleted' ? 'disabled' : ''">
            <div class="fixed-action-btn">
                <button class="btn-floating btn-large" @click="addGroup()">
                    <i class="material-icons">add</i>
                </button>
            </div>
        </section>
    </div>
</template>
<script>
import Header from './Header'
import Group from './Group'
import ItemsBar from './ItemsBar'
export default {
    name: 'todo',
    data () {
        return {
            groups: [
                {
                    name : "Office",
                    tasks : [
                        {
                            task : 'UIG Bug fixes',
                            done : false,
                            deleted : false
                        },
                        {
                            task : 'LMVM design',
                            done : false,
                            deleted : false
                        },
                        {
                            task : 'BDv2 issues',
                            done : false,
                            deleted : false
                        },
                        {
                            task : 'OSINT setup',
                            done : false,
                            deleted : false
                        },
                        {
                            task : 'code cleanup in UIG',
                            done : false,
                            deleted : false
                        },
                        {
                            task : 'learn vuex',
                            done : false,
                            deleted : false
                        },
                        {
                            task : 'ToDo app for session',
                            done : false,
                            deleted : false
                        },
                        {
                            task : 'Prepare doc for session',
                            done : false,
                            deleted : false
                        },
                        {
                            task : 'Responsive issues in UIG',
                            done : false,
                            deleted : false
                        },
                    ],
                    priority : 1,
                    deleted : false
                },
                {
                    name : "Home",
                    tasks : [
                        {
                            task : 'Present a Mobile for Mother',
                            done : false,
                            deleted : false
                        },
                        {
                            task : 'Buy a TV for Home',
                            done : false,
                            deleted : false
                        },
                        {
                            task : 'Present a dress for Sister Birthday',
                            done : false,
                            deleted : false
                        },
                    ],
                    priority : 2,
                    deleted : false
                },
                {
                    name : "Gym",
                    tasks : [
                        {
                            task : 'Plan workout to achieve goal',
                            done : false,
                            deleted : false
                        },
                        {
                            task : 'Buy Gloves',
                            done : false,
                            deleted : false
                        },
                        {
                            task : 'Buy a protien shake',
                            done : false,
                            deleted : false
                        },
                    ],
                    priority : 2,
                    deleted : false
                },
                {
                    name : "PG",
                    tasks : [
                        {
                            task : 'Update expenses in excel sheet',
                            done : false,
                            deleted : false
                        },
                        {
                            task : 'Make sure wifi works properly',
                            done : false,
                            deleted : false
                        },
                        {
                            task : 'schedule cab in morning',
                            done : false,
                            deleted : false
                        },
                    ],
                    priority : 3,
                    deleted : false
                },
            ],
            groupName: "Group Name",
            filterId : "ToDo"
        }
    },
    components: {
        Header,
        Group,
        ItemsBar
    },
    computed:{
        orderedGroups(){
            return this.groups.sort(function(a, b){
                return a.priority-b.priority
            })
        },
    },
    methods:{
        addGroup(){
            var self = this;
            var groupParams = {
                name: self.groupName,
                tasks: [],
                priority: 4,
                deleted : false
            }
            self.groups.push(groupParams);
        },
        getPriorityColor(value){
            if(value == 1){
                return 'red';
            }
            else if(value == 2){
                return 'orange';
            }
            else if(value == 3){
                return 'green';
            }
            else{
                return null;
            }
        },
        checkForConfirmation(name){
            var self = this;
            confirm('This action cannot be undone')?self.orderedGroups.splice(self.orderedGroups.findIndex(x => x.name === name),1):'';
        }
    }
}
</script>
<style scoped>
/* .search-bar{
    display: flex;
    padding: 1rem 0;
} */
.todo > .add-group-btn > .input-field > .filterDropdown{
    display: block !important;
}
.add-group-btn{
    display: flex;
    padding: 1rem 0;
}
.disabled{
    opacity: 0.5;
    pointer-events: none;
}
</style>