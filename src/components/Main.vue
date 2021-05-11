<template>
<div class="main">
    <h1>Freie Badi Plätze</h1>
    <b-container>
        <b-row class="justify-content-center">
            <template v-for="badi in badiList">
                <b-col cols="6" sm="4" md="4" lg="3" :key="badi.uid"> 
                    <b-card
                        :title=badi.name
                        style="max-width: 20rem;"
                        class="mb-2">
                        <b-card-text>
                            <p>Freie Plätze: {{freespaces(badi.freespace, badi.maxspace)}}/{{badi.maxspace}}</p>
                            <b-progress :max="100" height="1rem">
                                <b-progress-bar :value="progressAvailable(badi.freespace, badi.maxspace)" variant="success"></b-progress-bar>
                                <b-progress-bar :value="progressOccupied(badi.freespace, badi.maxspace)" variant="danger"></b-progress-bar>
                            </b-progress>
                        </b-card-text>
                    </b-card>
                </b-col>
            </template>
        </b-row>
        <p>Made with love and boredom during waiting for xeni by stefan</p>
    </b-container>
</div>
</template>

<script>

export default {
    name: 'Main',
    data: function () {
        return {
            badiList: []
        }
    },
    methods: {
        freespaces(space, max){
            if(space < 0){
                return 0;
            } else if(space > max) {
                return max;
            } else {
                return space
            }
        },
        progressAvailable(free, max){
            if(max == 0 || free == 0){
                return 0
            } else {
                return free/max *100
            }
        },
        progressOccupied(free, max){
            if(max == 0 || free == 0){
                return 100
            } else {
                return (max-free)/max *100
            }
        }
    },
    created: function(){ 
        function connect() {
            return new Promise(function(resolve, reject) {
                var server = new WebSocket("wss://badi-public.crowdmonitor.ch:9591/api");
                server.onopen = function() {
                    server.send(" ")
                    resolve(server);
                };
                server.onerror = function(err) {
                    reject(err);
                };

            });
        }
        connect().then(function(server){
            server.onmessage = function(msg){
                this.badiList = JSON.parse(msg.data).filter(s => s.uid.includes('SSD'));
            }.bind(this)
        }.bind(this))
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
