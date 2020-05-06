<template>
    <div>
        <div class="row">
            <div class="col s12">
            <ul class="tabs">
                <li class="tab col s3"><a class="active" @click="$emit('filter','ToDo')">ToDo</a></li>
                <li class="tab col s3"><a @click="$emit('filter','Done')">Done</a></li>
                <li class="tab col s3"><a @click="$emit('filter','All')">All</a></li>
                <li class="tab col s3"><a @click="$emit('filter','Deleted')">Deleted</a></li>
            </ul>
            </div>
            <!-- <div :id="dummyID" class="col s12">{{dummyID}}</div> -->
        </div>
    </div>
</template>
<script>
export default {
    name: 'item-bar',
    data () {
        return {
            // dummyID : '#ToDo',
        }
    }
}
</script>